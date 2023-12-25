---
layout: post
title: "How to run JUnit tests in parallel with Virtual Threads."
date: 2023-12-25 15:00:00
description: Using Virtual Threads can deliver more utilization on I/O bound tasks.
tags: software-testing
categories: software-engineering
featured: false
giscus_comments: false
toc:
  beginning: true
  sidebar: left
---

## Context

I want to run some Java JUnit tests in parallel while retaining one-time static setup. Specifically,
* I have an integration test class that spins up a database and performs some tests
* The test's `@BeforeClass void spinupDb()` spins up a database. I want this to run only once for the entire test class
* I want the test cases to run in parallel
* Run under Bazel and JUnit4

Contrast with the standard `JUnit4` Runner which executes all the tests serially in the same thread:
* The thread Executes the static `@BeforeClass void spinupDb()`
* Thereafter, the thread runs each test in serial

The primary motivation to consider parallel runs is to quicken the test feedback cycle.

---

## Options & Decision

Suppose I have 20 test cases and one db spin up (in a one-time, static, setup method) in my test class.

The primary options are:
* Do nothing and pay for serial execution
  * Time to completion = Db spin up time + time to complete 20 tests
* Use [Bazel's test sharding](https://bazel.build/reference/test-encyclopedia#test-sharding). With a `shard_count=5`,
  * It splits 20 test cases into 5 shards of 4 each (give or take one or two depending on randomization)
  * Each test shard will spin up the database and then run each of its 4 tests in serial
  * Time to completion = Db spin up time + time to complete 4 tests
* Use JUnit's experimental [Parallel Computer](https://github.com/junit-team/junit4/blob/main/src/main/java/org/junit/experimental/ParallelComputer.java). This meets the spec except that JUnit doesn't expose a runner like `ParallelRunner`.
  * Time to completion = Db spin up time + time to complete `20/T` tests where `T` is the number of parallel threads
* Roll my own, inspired by `Parallel Computer`
  * And take the opportunity to run using Virtual Threads !
  * Time to completion = Db spin up time + time to complete 1 test

I chose to roll a new parallel Runner because it meets the spec and I can also use Virtual Threads.

---

## Why Virtual Threads?

Java Virtual Threads are many things. Perhaps the most well known is their ability to deliver straight-line programs (no Reactive Java please!). Perhaps less well known is its utilization benefits: you can get more out of your servers. Why so? It goes to Little's law; see [Ron Pressler's explanation](https://www.youtube.com/watch?v=YQ6EpIk7KgY).

Platform Threads (i.e. traditional Java threads) are heavy
* They use significant memory 
* Context switching across them is expensive
* So, there's an upper bound on number of concurrent threads per core
* As you approach this bound, the system runs out of memory and/or switching costs dominate the actual useful on-cpu work

Virtual Threads are light
* They have small memory footprint (IIRC, a few KB vs a few MB for Platform threads)
* Switching is quite cheap (since it is done by the JVM not the OS)
* So, the upper bound on number of concurrent threads is a LOT higher; perhaps 100-1000x higher

In some situations, Virtual Threads can support more load per core
* Suppose that you have a workload where each request (runs in a single thread), waits on IO for 199 units and does 1 unit of work
* In the steady state, assuming zero switching costs and perfect alignment, a core needs to queue 200 threads
  * Each of the 200 threads is blocked for 199 units, does 1 unit of work and repeats the cycle
* Suppose the core can support a max of 100 Platform Threads and 10,000 Virtual Threads
* To obtain a queue size of 200, you'll need two cores running Platform Threads vs 1 core running Virtual Threads
* <span style="color:green; font-weight:bold;">In other words, you need fewer servers using Virtual Threads to support the same workload</span>

If you have 10 testing boxes running integration tests, it's plausible you can cut down on a couple using Virtual Threads because
* Integration tests with databases could have similar characteristics as the example above
* Each test waits on database and consumes relatively little CPU (though not as extreme as 1:199)
* The test's database consumes CPU but it reads from disk for queries/reads/writes
* If you run database from memory (instead of disk), thereby IO no longer being bottleneck, memory could become the new bottleneck

{:.block-warning}
> Bottomline: Virtual Threads are worth a try for integration tests.

---

## Code

This is how the test looks. Note the following:
* A new Runner, `ParallelTestMethodsRunner`
* The test configuration `ParallelTestMethodsConfig` which supports two options
  * Run using Platform Threads (for CPU bound tests)
  * Run using Virtual Threads (for IO bound tests)

```java
@RunWith(ParallelTestMethodsRunner.class) /*The Runner*/
// @ParallelTestMethodsConfig(platformThreads = 10) // Option 1: Use 10 Platform Threads
@ParallelTestMethodsConfig(useVirtualThreads = true) // Option 2: Use Virtual Threads
public class MyDbTest {

  // Spins up the database; shared by each test case
  @ClassRule
  public static final DbTestCase dbTestCase = DbTestCase.postgres_15_3();

  @Test public void test_1() {}
  @Test public void test_2() {}
  // ...
  @Test public void test_20() {}
}
```

---

The Runner is fairly trivial to implement based on JUnit's `Parallel Computer`.


```java
/**
 * Runs test methods in parallel; they all share the same static setup.
 *
 * <p>It is VERY tricky to have parallel tests working because they will run into resource issues.
 * For example, you can quickly run out of database connections if you have 100 tests in parallel
 * and the db has a 100 connection limit. So, in that sense, more coordination is required to have
 * tests run in parallel.
 *
 * <p>Running tests in parallel does have one great advantage: it cuts down iteration time. So, it
 * is a balance and caution should be exercised in choosing this method. Test sharding in Bazel is
 * also a viable alternative except that it uses extra CPU since it repeats the test setup for each
 * shard. So, if you are running on a local workstation, it is perhaps better to iterate using this
 * runner than using Bazel shards.
 *
 * <p>Configuration must be specified via {@link ParallelTestMethodsConfig} annotation on the test
 * class.
 */
public class ParallelTestMethodsRunner extends BlockJUnit4ClassRunner {

  public ParallelTestMethodsRunner(Class<?> testClass) throws InitializationError {
    super(testClass);
    ParallelTestMethodsConfig config =
        Preconditions.checkNotNull(
            testClass.getAnnotation(ParallelTestMethodsConfig.class),
            "%s requires a config annotation of type: %s",
            ParallelTestMethodsRunner.class.getSimpleName(),
            ParallelTestMethodsConfig.class.getSimpleName());
    setScheduler(new Scheduler(config));
  }

  /**
   * Configuration for {@link ParallelTestMethodsRunner},
   */
  @Target(ElementType.TYPE)
  @Retention(RetentionPolicy.RUNTIME)
  public @interface ParallelTestMethodsConfig {

    /**
     * The number of threads that methods will be parallelized into. A threadpool Executor will be
     * used to multiplex all the test methods. This value determines the size of the threadpool.
     *
     * <p>A value less than 1 specifies an unbounded threadpool.
     */
    int platformThreads() default 5;

    /**
     * Whether to use virtual threads. If set, a {@link Executors#newVirtualThreadPerTaskExecutor()}
     * will be used to run the test methods. {@link ParallelTestMethodsConfig#platformThreads()} is
     * not meaningful when this is true.
     */
    boolean useVirtualThreads() default false;
  }

  private static class Scheduler implements RunnerScheduler {

    private final ExecutorService service;

    Scheduler(ParallelTestMethodsConfig config) {
      service =
          config.useVirtualThreads()
              ? Executors.newVirtualThreadPerTaskExecutor()
              : (config.platformThreads() < 1
                     ? Executors.newCachedThreadPool()
                     : Executors.newFixedThreadPool(config.platformThreads()));
    }

    @Override
    public void finished() {
      try {
        service.shutdown();
        service.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }
    }

    @Override
    public void schedule(Runnable runnable) {
      service.submit(runnable);
    }
  }
}

```
