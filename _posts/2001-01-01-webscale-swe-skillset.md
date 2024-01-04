---
layout: post
title: The Web-scale Software Engineer Skillset
date: 2023-11-19 15:00:00
description: "Many skillsets required. Some only learnable from practice."
tags: software-abiyz
categories: software-engineering
featured: true
giscus_comments: false
published: true
toc:
  beginning: true
  sidebar: left
mermaid: true
extra_css: blogposts

---

{:.block-danger}
> This is a very early draft, incomplete and Work-in-progress. Read at your own risk!

# What is this about?

Colloquially, a **WSE** (Web-scale Software Engineer) is a SWE (Software Engineer) with the skills to work end to end on a large-scale web application. But what topics skills does a WSE need to master or at least be familiar with? In this post, I'll outline various skills that a WSE may call upon.

## Goal

If you are a early-career WSE, this post is meant for you. My goal is to accelerate your journey towards becoming a strong WSE. When I say `you` in this post, it refers to you, the early-career WSE.

 For everyone else including expert WSEs or SWEs from other walks, I hope there's still something of interest for you.

## Format

For each topic, I'll provide a brief introduction, note some challenges, share my personal observations in dealing with the topic, maybe add some commentary and list some jump-off points for further research.


## !! Caution !!

This post covers a large set of topics, but don't let it intimidate you. Some things to bear in mind:
* The goal for a WSE first and foremost is to solve customer problems. You may need < 10% of these skills or > 90% depending on the actual scenario
* Likely, you'll learn best by actually doing. So, it is helpful if you are practising some of these in your day job
* Learning these topics takes significant, conscious effort. Expertise is only obtained by thinking
* Have realistic expectations: If you have a day job & family responsibilities, mastering a reasonable portion of these topics can easily take more than a decade

## Caveats

I've taken reasonable precautions to only say/link-to thoughts/resources that I genuinely believe in. However, this post represents my experience **and my biases**. As such, you'll likely find something to disagree with or even something you strongly agree with. I welcome engaging me in (civil) discussion. See [about](/) for how to reach me.

# Code

As a WSE
* you'll write a ton of code; you should have a reasonable idea of how to write & structure code **that ages better**
* you'll deal with many frameworks which can look convoluted and/or daunting; it helps to have a framework to think/reason about them to quickly come upto speed
* you'll firefight in production, introduce bugs, fix bugs unrelated to your work, write tests and so on

In this section, I'll introduce these aspects and some of the challenges you'll face. To be a master WSE requires expertise in the above topics. Each SWE will develop their own method over time.

## Structure

{:.block-warning}
> Structure your code coherently.

Once your codebase reaches a certain size in terms of files, lines & people working on it, it becomes unweildy to analyze, understand, improve and thus product velocity slows down. Maintaining a healthy codebase is an extremely important WSE skill. But, *what is a healthy codebase*? Software Engg has many undefined terms such as *healthy codebase*. To my knowledge, there is no universally accepted definition or even well known candidate definitions. So, everyone reaches their own conclusions over time. However, anecdotally there appears to be a shared kernel across many peole's intuitive definitions that I share below.

Aim for the following standard wrt your code
* Given knowledge of what the code does, unfamiliar SWEs should be able to understand HOW it does it
* Given NO apriori knowledge of what the code does, SWEs should have at least say 50% chance of understanding WHAT the code is doing
* Unfamiliar SWEs should be able to guess what feature is implemented where in the codebase
* Code should age well. That is, as more features are built it shouldn't be necessary to do stop-the-world codebase refactors

This is a pretty high bar and only a small proportion of SWEs will ever reach it. An intermediate milestone is: If you revisit say, a 30K+ line codebase you authored after being away for an year, you should be able to understand every bit of it.

Even the intermediate milestone is a pretty high bar and will require repeatable, simple, explainable code structure and patterns.

<div markdown="1" class="boxyList">
Resources

Definitive resources are hard to find because this is an often overlooked topic. In my practice,
* I use the [ABIYZ pattern](/blog/2023/abiyz-intro) for structuring code where possible
* Experience taught me some particularly [bad patterns of code aging](/blog/2023/software-changes-and-aging/)
* If you use [Bazel](https://bazel.build) as the build tool, `package_groups` and `visibilty` offer additional options for maintaining a more semantic code structure
* Unless working on a strongly latency sensitive concern, I use [TODO: immutability/functional style code](TODO)
</div>

## Frameworks

{:.block-warning}
>Understand frameworks thoroughly.

A modern web scale application likely uses several frameworks. Examples include backend frameworks (REST APIs, Authentication etc.), frontend frameworks (Angular, React etc.). Each of those frameworks tends to do a few things very well (its **design center**) and other things not so well. Ideally, you should stick to its design-center, understand it thoroughly and be able to explain it to others.

<div markdown="1" class="boxyList">
Resources

I am reluctant to list many frameworks because learning specific ones is not the thrust of this particular section. Instead, it is about understanding any framework you may encounter better. I am also not aware of any definitive resources on `how to understand frameworks better`.

<br/>

In my practice, I find the [ABIYZ pattern for understanding frameworks](/blog/2023/abiyz-intro#example-4) useful. Beyond that, I find it helpful to be aware of a large number of ideas from various walks of Computer Science and Engineering - very few ideas are brand new and every new fangled framework has several overlapping ideas from bygone eras.
</div>

## Programming Language

{:.block-warning}
> Become an expert at at least one language and stay up-to-date.

Language expertise pays for itself through better code, lesser bugs and overall more fun.

## Building

{:.block-warning}
> Aim for deterministic builds.

If you work on large projects, Building the code to produce deployable artifacts can itself be a non-deterministic process. Non-determinsm is occasionally a potent enemy and can extract a significant time tax. That said, significant investment in build tooling is only necessary & justified for large scale efforts.

In addition to reproducible builds, build systems are differentiated by speed of the build and their ability to change-detect the tests required to run. In the case of some tools like Maven in Java land, builds can be monolithic; that is, the entire project has to be built in order to run a few tests. In such situations, iteration time for `code-compile-test` can creep up to unacceptable levels. At that point, as a WSE, you may be compelled to peer into the build system and improve iteration cycle!.

<div markdown="1" class="boxyList">
Resources
* [Bazel](https://bazel.build/) is a highly principled build tool for performing builds at scale with determinism. Diving into its design is a worthwhile activity
* [Pants2](https://www.pantsbuild.org/) and [Buck2](https://github.com/facebook/buck2) are inspired by Bazel
* Go and Rust have their own package managers
* Java has a defacto package manager in Maven
</div>

## Testing

{:.block-warning}
> Write high quality tests and use continuous testing.

As a WSE, you'll read, write & release a ton of code. You'll need high quality automated, pre-commit tests to maintain long-term velocity - i.e. ability to add features quickly without breaking existing features. But, what constitutes high quality tests? This is another of those questions that throws practitioners into flame wars. However, there are some thumb rules that I've found valuable in my practice.

To my knowledge, Software testing still lacks an **objective definition of a Good Test**. That is, a definition which classifies every test as *Good* or *Bad*. In practice, that means any definition that classifies say 80% of the tests with 90% agreement among the human raters. In other words, if we give the definition to 100 SWEs (*human raters*) and ask them to rate a 1000 tests as *Good* or *Bad* based on the definition, more than 800 of the tests will have 90 or more human raters classifying one way.

Such a definition is critical because it provides clear guidance for every SWE on the team on what tests are acceptable and what are not. It preempts unproductive debates. It is the equivalent of a language-prescribed source formatter (like Golang's built-in formatter) which preempts formatting debates (2 spaces as indent? 4? etc.) even if it isn't to the liking of everyone in any particular situation.

Nevertheless, you will have to write practically good tests (i.e. ones with a high ratio of value to burden) in order to maintain long-term velocity.

<div markdown="1" class="boxyList">
Resources

To my knowledge, there aren't any definitive resources on an objective definition of a *Good Test*. Nevertheless, there are some important ideas:
* [Modern best practices for Java Tests](https://phauer.com/2019/modern-best-practices-testing-java/) has excellent advice on practical testing
* [Property based testing](https://increment.com/testing/in-praise-of-property-based-testing/) is a set of ideas that focuses on the actual contract with minimal distractions

In my practice,
* I adopt the definition of *Good Test* from [TODO: Objectively Good Tests](TODO) and utilize the practical techniques there-in
* I attempt to use [homomorphic](/blog/2023/testing-calculator-homomorphism/) code structure in order to segment the tests while maintaining 100% coverage
</div>


## Error Handling

{:.block-warning}
> Treat Error paths and outcomes as first class citizens. Error message should tell you what's wrong most of the time.

A good thumbrule is that error messages should explain what is wrong and attach context variables that led to the error. That is, using a debugger should not be required in most cases. Useful error contexts would include variables across many stack frames (especially the stack frames which are in the middle of a loop) and the stack trace itself.  Attaching sufficient context is much harder than one thinks. In languages such as Java/C#, exceptions can also be a double edged sword.

<div markdown="1" class="boxyList">
Resources

This is yet another of relative controversy with no clear consensus. In a way, Error Handling is also in a similar boat to Testing in that there is no accepted objective definition of *Good Error Handling*. Still there are some important thoughts that can help the practical burden.
* Midori's [The Error Model](https://joeduffyblog.com/2016/02/07/the-error-model/) is perhaps a one-stop read into the history of error handling in programming languages and the relative pros/cons of the various approaches
* [Error handling Hygiene](https://stackify.com/best-practices-exceptions-java/) has some standard best practices focused on Java, but it does not define what *Good Error Handling* is
* In my practice, I aim for [TODO: practical error handling in Java](TODO) practices.
</div>

## Style: Functional vs Imperative

{:.block-warning}
>Use a functional style of coding unless you have strong reasons not to (for example, extreme performance requirements).

At first, for SWEs used to imperative programming, this style may be a bit unusual, but if my experience is any guide, functional code tends to be *much* less buggy and composes far better. There is additional expense in the form of upfront time to write the code, but amortized over a lifetime (in reduced maintenance/readability costs for e.g.), the benefits appear strongly skewed towards immutability.

It could be confirmation bias on my end, but Software engineering appears to be moving in the direction of preferring functional coding style characterized by most objects being immutable (among other things) and first class functions (lambdas). The design of several successful libraries (Java Streams, Google Guava) reflect this preference and several languages are evolving in this direction (Rust and Java with pattern matching for example, C++ with lambdas).

Note that I am not recommending slavishly adhering to functional style, merely that functional seems a better default choice than imperative.

<div markdown="1" class="boxyList">
Resources
* [Functional vs Imperative Programming](https://learn.microsoft.com/en-us/dotnet/standard/linq/functional-vs-imperative-programming)
* [Okasaki's Purely Functional Datastructures](https://www.cs.cmu.edu/~rwh/students/okasaki.pdf) is a classic read
* Phil Bagwell's [Fast And Space Efficient Trie Searches](https://idea.popcount.org/2012-07-25-introduction-to-hamt/triesearches.pdf) inspires Clojure's high performance functional datastructures. A couple of related talks
* Mohit Thatte's talk: [Deep Dive into Clojure's Data Structures](https://youtu.be/7BFF50BHPPo)
* Phil Bagwell's talk: [Striving to Make Things Simple And Fast](https://youtu.be/K2NYwP90bNs)
* [Efficient Immutable Collections PhD thesis](https://michael.steindorfer.name/publications/phd-thesis-efficient-immutable-collections.pdf) and a [corresponding talk](https://www.youtube.com/watch?v=pUXeNAeyY34) claims datastructure performance improvements

In my practice
* I rely on ideas from [TODO: How I reduce mutability](/TODO)

</div>

## Releasing

{:.block-warning}
> Aim for the ability to release often, preferably 4 times a week, within reason. Not every product needs or even wants (for e.g. financial exchange software) this frequency of releases.

As a WSE, you'll release a lot of features over time. Having a predictable and fast release schedule allows for quick feedback and removal of transient compatibility-related glue. So, you'll need to stay disciplined with continuous releases. Ideally, your releases are fully automated on a predictable schedule with the ability to even consider daily releases. While it may seem courageous to be releasing everyday, remember that lower frequency releases tend to result in significant amount of cherry picking, compatibility issues and overall lower quality releases.


<div markdown="1" class="boxyList">
Resources
* [Github Actions](https://docs.github.com/en/actions)
</div>

# Backend Systems

As a WSE, you'll need to interface with many backend systems. For example, you may need to work with a distributed database (potentially inconsistently replicated), a pub-sub message queue, asynchronous data syncs among others. Many concerns emerge from this.

## Design Center

{:.block-warning}
>Understand the **Design Center** of backend Systems.

Each backend system has its own `design center`, that is, a purpose where it is a perfect fit. You have to understand the mental models of each of these systems and factor them into your design. In addition, you'll need to understand iterative design. It is not feasible to deliver all the pieces of a design upfront. So, you'll need to monitor some metrics that you know will not be at-target at launch but can be improved over time. The initial design should perhaps favor time to market **without** closing doors on features that didn't make the launch cutoff.

Some standard system types whose Design Centers you should know about:
* Scalable Key Value stores: Bigtable, DynamoDb etc.
* In-memory stores: Redis, MemoryDb etc
* Big file sytems: Ceph, S3, Google Colossus etc
* Map-reduce: Cloud Dataflow
* Real-time processing: Kafka
* Vertical relational databases: Oracle, Postgresql etc
* Distributed relational databases: Spanner, Cockroachdb, Yugabytedb etc.
* Pubsub

## Design Simplicity

{:.block-warning}
> Keep it simple: Bound design complexity. Simplicity is HARD.

One of the most common temptations is to explode the number of tools used. While there are merits to this - `one tool, one purpose` is appealing - complexity increases super-linearly in the number of distinct concepts (or tools) used in an architecture. There's a natural tension between using different tools and using the same tool beyond its design center. For example, one can simulate a simple pub-sub using database tables and some Sql. When to use this vs a real pub-sub system is a judgment call that has to be honed with experience and informed by the circumstances of the current situation. If you have a growing team, adding new concepts doesn't scale well and you'll likely end up with hotspots: a few SWEs who know about all the concepts and everybody else is constantly going to them for information/advice. This dynamic tends to break under its own weight.

Overall, it is important to not overdo systems/tools usage. This judgment takes time and experience.

## Vertical Relational Databases

{:.block-warning}
> Understand every aspect of Relational Databases thoroughly.

One might feel that Vertical RDBMs are legacy and don't apply to WSEs. But, that's far from the truth. Many enterprise systems of large scale run on top of Vertical RDBMSs. Their importance really couldn't be overstated.

Databases are a **vast** topic and understanding it means forming a mental model by which one can utilize them effectively: for e.g. efficient querying, avoiding inconsistencies, using transactions etc. Vertical databases (like Oracle, PostgreSQL) are still the most common form of database (often with flavors of some replication/sharding).

Here are some (non-exhaustive) topics to understand in depth, in no particular order:
* Indexes & Querying: how a database uses Indexes to query effectively
* Schema design: Access pattern friendly design, Relational vs Key-value specific design
* Transactions: Optimistic & Pessimistic transactions
* Replication: Does the db support replication? If so, what kind of consistency does it offer?
* Sharding: Does the db support sharding? If so, how is it managed (auto vs manual)?
* Snapshots: How do you get a point-in-time snapshot of the database for offline processing ?

<div markdown="1" class="boxyList">
Resources
* [F1 Distributed Query Execution Paper](https://research.google/pubs/f1-a-distributed-sql-database-that-scales/) is a useful primer into how SQL execution works. Even though this is in the distributed setting, vertical dbs work reasonably similarly
* [Database Systems: The Complete Book](http://infolab.stanford.edu/~ullman/dscb.html). For gaining mastery of databases, it is helpful to complement practical experience with a textbook
* [Postgres](https://www.postgresql.org/)
</div>

## Distributed Relational Databases

{:.block-warning}
> Develop a mental model for Consistency and appreciate the different bottlenecks (compared to Vertical RDBs) in reads, writes & queries due to their distributed nature.

All the same concerns as Vertical Databases apply, but Distributed Databases (e.g. CockroachDb, Spanner) are noticeably different. For example, consistency models, distributed sql execution, automatic sharding, tracing sql execution etc. make for a different experience using them compared to regular vertical databases.

Their APIs are also different. For example, Spanner due to its external consistency offers a more high fidelity API (one that reflects the distributed nature of it) than a vertical database which also happens to be sharded/replicated.

Distributed Relational Databases are here and they have a reasonable chance of becoming the databases of choice in the future, even potentially nudging out Key-Value stores of most kinds. So, mastering them can be a significant advantage.

<div markdown="1" class="boxyList">
Resources
* [Raft Paper](https://raft.github.io/raft.pdf) is a must read for a gentle introduction to Consensus and State Machine Replication
* [Spanner](https://cloud.google.com/spanner)
* [Spanner external consistency](https://cloud.google.com/spanner/docs/true-time-external-consistency)
* [Cockroach DB's consistency model](https://www.cockroachlabs.com/blog/consistency-model/) is a great read into important concerns like Linearizability
* [Db Consistency & Isolation Terminology](https://www.cockroachlabs.com/blog/db-consistency-isolation-terminology/)
* [Jepsen Consistency Models](https://jepsen.io/consistency). Clickable map of various terms.
* [Raft leader leases for low latency reads](https://www.yugabyte.com/blog/low-latency-reads-in-geo-distributed-sql-with-raft-leader-leases/)
* [Hybrid clocks 1](https://www.youtube.com/watch?v=YqNGbvFHoKM) and [Hybrid Clocks 2](https://www.yugabyte.com/blog/evolving-clock-sync-for-distributed-databases/) when atomic clocks like Spanner TrueTime are not available
* [Herlihy and Wing's Linearizability paper](http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)
* [FaunaDb's commit protocol explained](https://fauna.com/blog/consistency-without-clocks-faunadb-transaction-protocol)
* [F1 Distributed Query Execution Paper](https://research.google/pubs/f1-a-distributed-sql-database-that-scales/) is a useful primer into how SQL execution works. Even though this is in the distributed setting, vertical dbs work reasonably similarly
</div>

## Non-relational Distributed Databases (NoSQL)

{:.block-warning}
> Have them in your toolkit and thoroughly understand the trade-offs they present.

As a WSE, you should understand the trade-offs they present: they provide scale by restricting themselves to limited transaction semantics (say only a single key can be atomically updated) and limited SQL query support (which explains NoSql). These limitations can surprise down the line and will present difficult design decisions upfront; for example, often these dbs don't often support transactions across multiple tables; so, schema design can require some denormalization which can cause long-term tech debt. In addition, some kinds of queries either will not be supported or will be slow and this too can be surprising. In other words, if you are early on in your application, it is possible that these stores are not flexible enough to accommodate new access patterns, but for a mature use case one can design reasonable schemas.

In many ways, they are being usurped by Distributed Relational Databases which are now capable of offering similar scale alongside transactional semantics as well as efficient SQL, but possibly at a higher price point.

<div markdown="1" class="boxyList">
Resources
* [NoSQL Design Primer](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html)
* [ScyllaDb's per-core design](https://www.scylladb.com/product/technology/shard-per-core-architecture)
</div>

## In-memory Databases

{:.block-warning}
> Be aware of them; uncommon, but some domains require them.

Specifically, in the case of real-time writes and reads - for example, real time ad bidding - in memory stores with durable persistence are valuable. The main trade-off is limited scalability since the entire dataset is in memory all the time. So, typical architectures may use them for ephemeral data with some backup to another traditional high-capacity database/warehouse.

<div markdown="1" class="boxyList">
Resources
* [Amazon MemoryDb](https://aws.amazon.com/memorydb/), which is a sharded, persistent offering on top of Redis
* [VoltDb](https://www.voltactivedata.com/)
</div>

## Data Warehouses & Lakehouses

{:.block-warning}
> Essential for insights. SQL is your friend.

Data warehouses are typically append-only flexibly structured data. They contain both business data (how many clicks did a particular Ad receive) and application telemetry (how long did a user spend on a form on the webpage). Business metrics, User experience metrics etc are powered by such warehouses.

<div markdown="1" class="boxyList">
Resources
* [Databricks Lakehouse](https://www.databricks.com/product/data-lakehouse)
* [Google BigQuery](https://cloud.google.com/bigquery?hl=en)
* [Columnar Storage format](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/36632.pdf) from original Google Dremel paper and a [more accessible explanation](https://blog.twitter.com/engineering/en_us/a/2013/dremel-made-simple-with-parquet)
</div>

## Object storage

{:.block-warning}
> Object storage ~ Giant filesystems. Understand their performance characteristics.

As a WSE, you will mostly interact with various kinds of high-level data storage systems like databases & warehouses, but occasionally, you'll need a lower level file storage. For example, you want to put a ton of files somewhere, highly available. Object storage is the preferred approach for such use cases. Their design center is around overwrite-few, update-few, read-many-sequentially data.

<div markdown="1" class="boxyList">
Resources
* [Amazon S3](https://aws.amazon.com/s3/)
* [Google Cloud Storage](https://cloud.google.com/storage?hl=en)
* [Google File System original paper](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)
* [Ceph](https://ceph.io/en/) for self hosting
</div>

# Performance

Understand the various aspects of performance and have the skills to optimize for them.

There are many aspects to performance: throughput, latency & economics to name a few. Different skills are required to optimize along these different aspects. Depending upon the nature and maturity of your product and your company's resources, you may be called upon to optimize on any of these different dimensions.

## Hardware

{:.block-warning}
> Know it and make better performance choices.

Even if it is unlikely that a WSE will ever interface directly with hardware, there'll be times that performance matters above all. In such scenarios, it is crucial to understand how hardware works and to write code that is sympathetic to it. In general, you'll be interfacing with high performance libraries rather than writing low level code, but it it still cruical in order to utilize these libraries well.

In no particular order, it is important to understand:
* Relative speeds of processor and memory. Latency today is usually determined by cache misses (i.e. processors waiting for memory).
* Processor cache hierarchies
* Cache coherence protocols (MESI, MOESI)
* CISC instruction execution using internal RISC uops
* Fetch/decode/execute/retire cycle
* Speculative and out-of-order execution
* Effects of branches on execution
* Branch prediction
* Atomic instructions in processors
* Batching for amortization
* Individual instruction latencies
* Using processor specific tuning libraries (e.g. Intel VTune, AMD UProf)

<div markdown="1" class="boxyList">
Resources
* [Cliff Click's Crash Course in Modern Hardware](https://youtu.be/5ZOuCuGrw48)
* [Intel's presentation on Modern CPU Architectures](https://www.youtube.com/playlist?list=PL8t1FdN2Tj3ZVAzTY-FvsS0qy-mEfRdoj). Great overview of how processors execute instructions.
* [Instruction Latencies of processors](https://www.agner.org/optimize/instruction_tables.pdf)
</div>

## Multithreading

{:.block-warning}
> Master it. Essential in the modern multi-core era.

As a WSE, you have to be familiar concurrency and parallelism. Even though it is unlikely you'll need to write your own primitives, a reasonable under-the-hood understanding is essential for both correct and performant code.

In today's era of shared memory multicore systems, concurrency and parallelism are front and center. Better performance leads to both happier users and better resource footprint (helps bottomline!)

### Concurrency

{:.block-warning}
> Know the constructs, limitations and concerns

Concurrency is about competing for resources as opposed to Parallelism which is about cooperation towards a particular task. Concurrency shows up in many contexts - queues, database transactions to name a couple.

As a WSE, it is unlikely you'd write your own concurrent datastructures. However, you'll very likely use them. It pays to understand concurrency concerns in choosing the right ones for your own application (apart from actually benchmarking performance of course). For example, as an exercise, deep-dive and understand a single producer single consumer high performance queue. It will introduce you to some important hardware details (also see resources in [Hardware](Hardware) section).

<div markdown="1" class="boxyList">
Resources
* [LMAX disruptor queue](https://lmax-exchange.github.io/disruptor/)
* [Martin Thompson: Adventures on concurrent programming in Java](https://www.youtube.com/watch?v=929OrIvbW18)
* [Martin Thompson: Mythbusting Modern Hardware to Gain Mechanical Sympathy](https://www.youtube.com/watch?v=MC1EKLQ2Wmg)
* [Martin Thompson: Mechanical Sympathy blog](https://mechanical-sympathy.blogspot.com/)
</div>

### Parallelism 

{:.block-warning}
Think parallel when appropriate; the benefits can be large.

Parallelism is about exploiting cooperation among resources towards a particular task. Like with concurrency, getting top performance requires an understanding of hardware. For example, exploiting the single writer principle (each cache-line should be written only from one core) and exploiting the fact that a modern processor has many ALUs so it can do multiple add/multiplies simultaneously; i.e. each core itself has inbuilt parallelism and high performance code needs to exploit it.

As a WSE, it is unlikely you will ever write a parallelism framework (like Java's ForkJoin, or Go's GoRoutines). Still, it is useful to understand the overheads and hardware-empathetic patterns in using parallelism.

<div markdown="1" class="boxyList">
Resources
* [Guy Steele's How to think of Parallel Programming Not](https://youtu.be/dPK6t7echuA)
* [Rob pike: Concurrency is not Parallelism](https://youtu.be/oV9rvDllKEg)
* [Tony Hoare's Communicating Sequential Processes paper](https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf). Basis for Go routines.
* [Ron Pressler on Java Virtual Threads](https://youtu.be/YQ6EpIk7KgY)
* [Java Virtual Threads used like GoRoutines in the Game of Life](https://youtu.be/n8uGsc4y6W4)
</div>

### Memory Models

{:.block-warning}
> Develop a mental model. Necessary for writing correct multi-threaded code.

Writing *correct* concurrent code is hard. A non-trivial reason for its hardness comes from the non-intuitive behaviors of shared memory accessed from mutliple hardware threads (typically one or two hardware threads per core). A memory model specifies acceptable behaviors. Even after understanding a memory model, proving a piece of concurrent code as correct is non-trivial. Even though memory models originated as a hardware concern, they've worked their way up to high level programming languages like Java and C++ in multithreaded contexts. They determine semantics when multiple language threads communicate via shared memory.

As a example, consider this. If core1 performs a series of writes (`A` and `B` are variables here): `A = 0; B = 0; A = 10; B = 20;` and core #2 performs `read B; read A;`, can it read `B==20 and A==0` ? This is the kind of question that is answered by memory models. One might think that it is a non-sensical possibility to obtain `B==20 and A==0`, but it is definitely possible under weak memory models. The x86/x64 architectures have what is called a Total-store-ordering (TSO) model where this will not happen but other oddities do. Higher level languages (like Java) have to provide a common way to write meaningful (i.e. predictable semantics) multi-threaded code across architectures.

Knowing that your code runs on an x86/64 machine, you can exploit its TSO model to gain more performance. For example, you wouldn't need to add a memory fence after a volatile write (we don't need the details here).

<div markdown="1" class="boxyList">
Resources
* [Primer on Memory Consistency and Cache coherence](https://pages.cs.wisc.edu/~markhill/papers/primer2020_2nd_edition.pdf). Terrific book to form a good mental model
* [Memory models overview & RISC V](https://youtu.be/QkbWgCSAEoo)
* [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.htmljls-17.4)
* [TODO: Mental models for Memory Models & Consistency](TODO)
</div>

## Latency

{:.block-warning}
> Worth digging into at least once, preferably earlier in your career.

Latency engineering is a different ball game compared to throughput engineering. It is unlikely for WSEs to look at cycle count. In some specific industries like High-Frequency-Trading, latencies matter tremendously. There, you'll have to go deep and optimize for even seemingly minor gains. For example, you'll pay attention to page faults, TLB cache misses, tune page sizes (huge pages?) etc.

<div markdown="1" class="boxyList">
Resources
* [Algorithms for Modern Hardware](https://en.algorithmica.org/hpc/) shows practical issues
* [Matt Kulukundis' talk on improving Hash Table performance at Google](https://youtu.be/ncHmEUmJZf4)
* [Linux Perf](https://www.brendangregg.com/perf.html)
* [Java Async Profiler](https://github.com/async-profiler/async-profiler). The [videos](https://www.youtube.com/playlist?list=PLNCLTEx3B8h4Yo_WvKWdLvI9mj1XpTKBr) are even better
</div>

## Misc topics

{:.block-warning}
> There is no end of topics on a need-to-learn basis.

There are several other topics in the general area of performance that we didn't cover earlier. The more one's coverage extends, the easier it is to grok newer topics. For example, there are remarkable similarities between optimistic transactions in a database and lock-free compare-and-swap based shared memory concurrent datastructures. While a deeper understanding is not necessary for a WSE, it is potentially helpful to know ancilliary topics.

<div markdown="1" class="boxyList">
Resources
* [Lock free queue](https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf)
* [SPDK](https://spdk.io/) is for high-performance storage using user-space polled NVME driver
* [NVME](https://nvmexpress.org/) a protocol optimized for SSD
* [DPDK](https://www.dpdk.org/)  for high performance network packet processing
* [Zero copy Networking](https://en.wikipedia.org/wiki/Zero-copy)
</div>

# APIs

APIs really are a vast topic and I will only be scatching the surface here. APIs come in  many forms: internal library APIs consumed by your application code and external APIs consumed by a browser or external clients. While some considerations are different between internal and external APIs, a vast majority of principles apply to them both.

As a WSE, API design and maintenance will be a big portion of your job. It is a vast topic with many aspects to it. Some of them, in no particular order:
* Design: Good API design is HARD. For example, API methods should compose well, should support older clients performing read-modify-write operations and be consistently guessable for end-users. 
  * An example of composition is the ability to express `create this object A; then create its child object B; then create its child C. If any fail, don't change anything`. A bunch of APIs will simply expose individual API methods, one for each of the three operations above, but will not expose an operation to do them atomically. Thus, clients end up with the burden of rollbacks of `A` if they encounter failures in creating the child or the grandchild.
* Compatibility: API changes are inevitable. Servers and Client binaries differ in their versions but should still work with ambiguity. This can be quite tricky - if an older client doesn't specify a newly introduced field, should the server treat it as 1. client doesn't know about this field or 2. Client knows about this field and wants to clear it? Some other changes like database schema changes (say a single string column is being moved into a pair of ints) need compatibility with application code and it can be both tedious and also surprisingly difficult to do well manually (needs tooling). It can be between external clients and an API you expose (hard to change because of backwards compatibility guarantees) or between your database and application and so on
* Implementation: In general, you'll have to support multiple API versions from your implementation codebase. This requires a fair amount of thought and discipline. External clients tend to stick to their current API versions - they need to invest resources to migrate between API versions and very often only a small percentage of such clients will even have any benefit from upgrading API versions (they won't take advantage of the new features); so, there's resistance towards them. So, all these outstanding versions can add tech debt to your codebase.

APIs are one of those things which require learning in the field.

## Composable design
## Versioning & Compatibility
## Supporting Multiple versions from one codebase
## Predictability
## Programming Languages

# Communication

## Layered protocols: Understand the important ideas

More than the details, it is important to understand the ideas behind the layered architecture of TCP/IP and similar protocols. Ultimately, TCP is another distributed computation problem - both sender and receiver agree on the order and number of bytes. 

The details do matter to some degree; for example, you should be familiar with headers vs payload

## TCP/IP

{:.block-warning}
> Understand the basic contract and contrast with UDP.

## HTTP: The workhorse

App level protocol. HTTP 1 vs 2 vs 3.

## gRPC: RPC framework
gRPC is a prime example.

<div markdown="1" class="boxyList">
Resources: 
gRPC notions video
gRPC-web for browser/app clients
Others like Thrift
</div>

## Networking

Need to understand basics of Networks, starting from Ethernet to subnets, WWW, DNS, routing. Useful for understanding docker networks, or setting up VPNs etc.

Also need to understand notions of connections, streams v

<div markdown="1" class="boxyList">
Resources: 
Internet Routing.
Docker networking
</div>


# Production

## Containers

Docker is the de-facto standard. Need to understand c-groups

<div markdown="1" class="boxyList">
Resources: docker presentation on namespaces
</div>

## Load balancing

L4 load balancing vs L7 load balancing.

Resources: Matt Klein article

## Failure patterns
Understand how failures are 

Resources: google sre book

## Monitoring
Real-time debugging.

Resources: See prometheus/grafana

## Telemetry

First class citizen for debugging and improving the user experience.

## Kubernetes

adfas

Resources: Specify the spec and K8s makes it possible.

## Service mesh

Envoy

## Deployment Servers
TLS termination; servers

# Security

## Basics
Notions of integrity, privacy, perfect forward secrecy.

## Authentication
Cookies,

## Authorization
Resources, Principals, Roles = bunch of Actions

## Credential exchange

## Common attacks
### XSRF attacks

### XSS attacks

### SQL Injection attacks

Resource: SQL Injection computerphile

### Buffer overrun exploit

Resource: Buffer overrun computerphile

## Browser security models

# Client side
## Browser UX
## IOS/Android App UX
## Frameworks
React, Angular, Flutter etc.
## Styling/Animations
CSS etc

# Developer Tools
IDE, Chrome tools, Linux perf, Java GC tools, VI/Emacs, TMUX/Screen, SSH, Linux administration tools, bash scripting, python scripting

# Your Roles

As a WSE, you'll have to play many roles. You'll interact with many stakeholders, provide leadership and expand your influence. The following is meant to provide a sneak peek into these aspects.

## Personnel Interactions

As a WSE, it is **critically important** to be able to interact with a wide variety of roles. It is important to maintain a strong working relationship across the entire spectrum of roles. The following is a non-exhaustive list of such roles you'll interact with.

### Junior SWEs

You'll need to mentor and guide junior SWEs. Sharing knowledge and practical tips in an intellectually honest manner will improve your own technical depth.

### Peer SWEs

It is likely you'll have many peer SWEs; peer defined typically by level. Do not feel threatened or competitive towards peer SWEs. You'll no doubt encounter some competitive ones but in a growing companies, the pie is growing and collaboration - not competition - is what gets you further. So, focus on collaboration and moving the product/company forward.

### Senior SWEs

With Senior SWEs, your interactions should be different compared to peers/juniors. Working with good senior SWEs early on in your career can be a massive accelerant to your technical as well as career progress. Senior SWEs with a vision tend to have projects in mind and will be on the lookout for hungry SWEs like yourself. It is useful to interact with them with the aim to pick up some of those project ideas and run with them.

Interacting with senior SWEs can be intimidating not least because you can feel like you are being judged - after all, senior SWEs have a large say in evaluating your performance. However, the sooner you get over that fear and the sooner your trust yourself to learn quickly, the better off you'll be. There'll be stumbling blocks and there'll be occasions where you'll look foolish, but most senior SWEs can recognize them for what they are (mere stepping stones) - after all, they themselves probably had many such experiences.

Bottom line: be honest about your limitations and ask senior SWEs about upcoming projects. When you take a project, make sure you get it done. Ask for help if you are stuck. Expect to look foolish time to time. Just focus on getting things done rather than worry about whether you are being judged - ultimately getting things done is both more important and what gets your work judged favorably.

### Engineering Managers

With EMs, the canvas is yours. Typical conversations will include what's coming down the pike for the product, what's front and center of your mind and career conversations among others. It is possible that you have a bad faith EM, but those are rare in my experience. The bad ones will simply don't care enough rather than actively sabotage. The good ones will care about your growth and helping you reach your potential. With the good ones, it is helpful to be reasonably open about what you want and how you can help solve some of the more important challenges facing the product.

### Product Managers

With PMs, the focus of your conversations will be on product and customer requirements. You'll have to speak a different language - the realm of customer needs/wants. It will be a significantly different skillset from technical expertise.

### Customers

Sometimes WSEs will interface with customers directly to learn their pain points. If you do get the chance, lean in and really understand how customers use the product. If you don't get given the chance, ask for it. Listening to customers first hand will connect the dots between your technical work and customer value. More importantly, it helps you get a sense of relative priorities of customers. For example, should you spend time towards reducing the latency of your service or towards providing a more understandable error message when something goes wrong? Understanding the customer perspective helps you better make micro decisions like this one.

### Difficult colleagues

It is likely you'll have some colleagues who can be characterized as 'difficult'. Have a strategy to collaborate effectively with them despite the difficulties.

## Job Responsibilities

### Design Doc reviews

TODO

### Code reviews

TODO

### Oncall Production support

TODO

### Code that you own

TODO

## Leadership

Leadership is one of those things that you can recognize when you see but not necessarily define it. It has many strings and so a simple working definition is likely to be simplistic. In this section, I'll draw attention to some of its important aspects that a WSE can reasonably exhibit.

### Integrity & Values

Choose Integrity. Really. Always.

This should be obvious. We teach our children to not lie, not steal, not be rude and so on. The same applies to us as adults in the workplace.

### Articulating Thoughts

One of the more under-appreciated skills is the ability to articulate thoughts to the point. This will be very important both when communicating to a large audience and to a busy audience. In the former, you can't clarify the questions from everyone and in the latter, they don't have time to ask all the important questions. So, the onus will be on you to be crisp and clear.

In my practice, I've found it useful to consider writing down and editing my thoughts until they are crisp. I find it useful to think of the document as a database with the readers' questions as queries against it. The sooner readers can find answers to their questions, the more they'll be incentivized to read/understand/comment on the document and for it eventually develop wings.

### Making technical choices

As you grow more senior, you'll have the responsibility for making technical choices. This can involve something small like "which particular backend system do we use?" to something larger like "what engineering practices should we adopt for lower total-cost-of-ownership?" to even larger, multi-faceted questions like "which of these technical choices will help us solve more important customer problems over the longer run?".

Technical choices have an outsized impact over a few-year span. While everyone can have an opinion on which option to choose, truly nuanced decision making is very hard and the very least requires significant intelligent guessing over the pros/cons of the choices. Judgment calls are often rooted in subconscious experience and the ability to articulate those thoughts is one of the requirements for expanding your influence broadly.

### Being an example

Aim to be that person whom others will ask "In this situation, what would X do?". This is a very high bar, but it is something that will naturally happen if you set yourself some principles that you articulate to your colleagues and follow them.

### Growing others around you

A big part of leadership is to think of the product for the long-term. Good SWEs are hard to find and cultivating a deep talent pool is an important long-term competitive advantage. Providing technical advice in the form of code reviews or design feedback or even informal chats can and does add up over time.
