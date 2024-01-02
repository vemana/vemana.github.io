---
layout: post
title: 'Hardware Memory Models: 10 Minute Mental Model'
date: 2023-12-25 15:00:00
description:
tags: software-concurrency
categories: software-engineering 10-minute-mental-models
featured: false
published: true
giscus_comments: false
extra_js: 10mmm-memory-model
extra_css: 10mmm-memory-model
toc:
  beginning: true
_styles: |
  span.danger {color: red; font-weight: bold;} 
  span.good {color: green; font-weight: bold;} 
  .monospace td {font-family: monospace, monospace;}
  div.bootstrap-table.bootstrap4 {margin-bottom: 20px;}
---

{:.block-tip}
> [Learn more](/blog/2023/10mmm) about the 10 Minute Mental Model series

{:.block-danger}
> Concurrency is hard. Memory models are hard. There are probably only a handful of people on Earth who have an acceptably small error rate when dealing with concurrency. I am not one of them. So, the odds are that there are mistakes in this mental model (even though I don't know of any).

### Canonical Example
Alex is writing a single producer single consumer [Synchronous Queue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/SynchronousQueue.html) (i.e. blocking queue with max size 1) with
* Two cores in the processor
* Two threads, one producer and one consumer, running on separate cores
* Shared memory system (i.e. programs write load/store to memory as opposed to async networks ala distributed systems)

... where the **Producer** and **Consumer** loop like so (slot = EMPTY initially, counter = 0 initially)

{: .monospace}
Producer(in a loop) | Consumer(in a loop)
--- | ----
x = ++counter;<br>slot=FULL;<br>while(slot == FULL) {} | while(slot == EMPTY) {} <br> print(x); <br> slot = EMPTY;

**Expected** | **Reality**
--- | ---
If the producer produces 1, 2 in order, consumer **always** prints 1, 2 in order. | <span class="danger">On some processors, this prints 1, 1 occasionally</span>!

### Failed 'Proof' of correctness of the Queue

Alex goes one step further and rigorously 'proves' that <u>all possible interleavings of instructions from the two threads</u> results in the consumer printing 1, 2 in that order. In fact, the **Expected Interleaving** is quite convincing.

<multi-threaded-program title="Expected Interleaving of Events. Time flows top to bottom.">
    <script type="application/json" id="stuff">
    {
        "threadData": {
            "1": {
                    "name": "Producer",
                    "backgroundColor": "purple"
            },
            "2": {
                    "name": "Consumer",
                    "backgroundColor": "yellow"
            }
        },
        "iList": [
            {
                "thread": "1",
                "instr": "writes x=1"
            },
            {
                "thread": "1",
                "instr": "signals slot and awaits its emptying"
            },
            {
                "thread": "2",
                "instr": "discovers slot is filled"
            },
            {
                "thread": "2",
                "instr": "prints 1",
                "classes": ["green"]
            },
            {
                "thread": "2",
                "instr": "signals slot and awaits its filling"
            },
            {
                "thread": "1",
                "instr": "discovers slot is empty"
            },
            {
                "thread": "1",
                "instr": "writes x=2"
            },
            {
                "thread": "1",
                "instr": "signals slot and awaits its emptying"
            },
            {
                "thread": "2",
                "instr": "discovers slot is filled"
            },
            {
                "thread": "2",
                "instr": "prints 2",
                "classes": ["green"]
            },
            {
                "thread": "2",
                "instr": "... continues ..."
            },
            {
                "thread": "1",
                "instr": "... continues ..."
            }
        ]
    }
    </script>
</multi-threaded-program>

### The Problem

You see, Alex considered all possible interleavings <u>under the assumption</u> that instructions in each core <u>execute in order</u>. But that ain't so! <span class="danger">Some processors swap instructions which results in additional interleavings that also need to be analyzed for correctness.</span>

<multi-threaded-program title="Why 1, 1 is printed.">
    <script type="application/json" id="stuff">
    {
        "threadData": {
            "1": {
                    "name": "Producer",
                    "backgroundColor": "purple"
            },
            "2": {
                    "name": "Consumer",
                    "backgroundColor": "yellow"
            }
        },
        "iList": [
            {
                "thread": "1",
                "instr": "writes x=1"
            },
            {
                "thread": "1",
                "instr": "signals slot and awaits its emptying"
            },
            {
                "thread": "2",
                "instr": "discovers slot is filled"
            },
            {
                "thread": "2",
                "instr": "prints 1",
                "classes": ["green"]
            },
            {
                "thread": "2",
                "instr": "signals slot and awaits its filling"
            },
            {
                "thread": "1",
                "instr": "discovers slot is empty"
            },
            {
                "thread": "1",
                "instr": "NEXT TWO INSTRUCTIONS ARE SWAPPED",
                "classes": ["red"]
            },
            {
                "thread": "1",
                "instr": "signals slot and awaits its emptying"
            },
            {
                "thread": "2",
                "instr": "discovers slot is filled"
            },
            {
                "thread": "2",
                "instr": "prints 1 AGAIN",
                "classes": ["red"]
            },
            {
                "thread": "1",
                "instr": "writes x=2"
            },
            {
                "thread": "2",
                "instr": "... continues ..."
            },
            {
                "thread": "1",
                "instr": "... continues ..."
            }
        ]
    }
    </script>
</multi-threaded-program>

FAQ | Brief Answer
--- | ---
Why do processors do these reorderings? | For better performance.
What kind of reorderings are processors allowed to do? | Pretty much anything they want. They are just required to document them and support special instructions called Memory Barriers.
How to write a correct SPSC Synchronous queue? |  Using Barrier instructions.
How to make this queue portable across platforms if different processors are different in their memory models? |  Portable Languages (like Java) have defined their own memory model which can work on a range of processors. To do this, Java uses a different abstraction, called `happens-before`. The compiler maps this abstraction to the hardware's memory barriers. <br><br>When you are coding, you can concentrate on `happens-before`. <br><br>When you are trying to squeeze out performance, you will need to work at the memory-barrier level and utilize the particular platform's specifics for better performance and forgo portability.
Tell me more about Memory Models & Memory Barriers | See below. Memory Model defines what the legal values for `read X` are, in a multi-thread access situation. Memory Barriers are programming tools to temporarily restrict the processor to be more orderly so we can reason about our programs.

### Understanding Memory Models
To reason about Memory Models, we'll use a reasonable approximation:
* Each core executes its own Program
* Program = Sequence of Instructions
* Instruction = `Memory Operation | Barrier`
* Memory Operation = `Load (read from memory to register) | Store (write from register to memory)`
* Barrier Instruction = `StoreLoad | LoadStore | LoadLoad | StoreStore`
* Cores can reorder Instructions
  * Every such re-ordering is a swap of adjacent Instructions in the program
  * A swapped Instruction can be further swapped. For example `A B C D E` can be come `E A B C D` after multiple swaps of `E`
  * Different processors differ on what reorderings they perform
* Each of the 4 Barriers prevents a certain subset of adjacent instruction swaps (spot the pattern!)
  * `Store x=k, StoreLoad` cannot be swapped
  * `Store x=k, StoreStore` cannot be swapped
  * `Load x, LoadStore` cannot be swapped
  * `Load x, LoadLoad` cannot be swapped
  * `StoreLoad, Load x` cannot be swapped
  * `StoreStore, Store x=k` cannot be swapped
  * `LoadLoad, Load x` cannot be swapped
  * `LoadStore, Store x=k` cannot be swapped
  * The pattern is that a `StoreLoad` barrier prevents two kinds of swaps:
    * Earlier Stores cannot pass the StoreLoad barrier
    * Later Loads cannot pass the StoreLoad barrier
    * Net effect is that a Store before the barrier cannot swap places with a Load that is after the barrier
  * A more coarse-grained version of these barriers is the `Fence` barrier
    * A `Fence` does not participate in any swaps. It is equivalent to all the 4 barriers together.

#### Fixing the Queue implementation
Alex now writes a queue that works across all the hardware models:

Producer (in a loop) | Consumer (in a loop)
---- | ----
while(slot == FULL){} <br><span class="good">LoadStore Barrier</span> <br>x = ++counter <br><span class="good">StoreStore Barrier</span> <br>slot = FULL | while (slot == EMPTY) {} <br><span class="good">LoadLoad Barrier</span> <br>print(x) <br><span class="good">LoadStore barrier</span> <br> slot = EMPTY

Why does this work? 

First, **notice the parallels to a locking implementation**. Pretend that the check `while(slot == EMPTY){}` to be a lock acquire and `slot = EMPTY` to be a lock release. Similiary with `while(slot == FULL){}` and `slot = FULL`. So, 
  * We can be convinced that `x = ++counter` is never concurrently executing with `print(x)`. That is, what is read for printing will always be something written in a previous slot
  * Similarly, the lock acquisition takes turns. Neither Producer nor Consumer can acquire the lock twice in succession. So, we can be convinced that every value from the Producer will be seen by the Consumer

Second, let's see how the barriers prevent bad reorderings.
<multi-threaded-program title="What goes wrong without the LoadStore barrier in the Producer?">
    <script type="application/json" id="stuff">
    {
        "threadData": {
            "1": {
                    "name": "Producer",
                    "backgroundColor": "purple"
            },
            "2": {
                    "name": "Consumer",
                    "backgroundColor": "yellow"
            }
        },
        "iList": [
            {
                "thread": "1",
                "instr": "detects slot is empty"
            },
            {
                "thread": "1",
                "instr": "writes x=1"
            },
            {
                "thread": "1",
                "instr": "signals slot (i.e. set slot = FULL)"
            },
            {
                "thread": "1",
                "instr": "NEXT TWO INSTRUCTIONS ARE SWAPPED that LoadStore barrier would prevent",
                "classes": ["red"]
            },
            {
                "thread": "1",
                "instr": "writes x=2"
            },
            {
                "thread": "1",
                "instr": "loops in while(slot==FULL) {}"
            },
            {
                "thread": "2",
                "instr": "discovers slot is filled"
            },
            {
                "thread": "2",
                "instr": "prints 2. Missed x = 1",
                "classes": ["red"]
            }
        ]
    }
    </script>
</multi-threaded-program>

<multi-threaded-program title="What goes wrong without the LoadLoad barrier in the Consumer?">
    <script type="application/json" id="stuff">
    {
        "threadData": {
            "1": {
                    "name": "Producer",
                    "backgroundColor": "purple"
            },
            "2": {
                    "name": "Consumer",
                    "backgroundColor": "yellow"
            }
        },
        "iList": [
            {
                "thread": "1",
                "instr": "detects slot is empty"
            },
            {
                "thread": "1",
                "instr": "writes x=1"
            },
            {
                "thread": "1",
                "instr": "signals slot (i.e. set slot = FULL)"
            },
            {
                "thread": "2",
                "instr": "detects slot is full"
            },
            {
                "thread": "2",
                "instr": "prints 1"
            },
            {
                "thread": "2",
                "instr": "sets slot = empty"
            },
            {
                "thread": "2",
                "instr": "NEXT TWO INSTRUCTIONS ARE SWAPPED that LoadLoad barrier would prevent",
                "classes": ["red"]
            },
            {
                "thread": "2",
                "instr": "prints 1 again",
                "classes": ["red"]
            },
            {
                "thread": "2",
                "instr": "loops in while(slot==EMPTY) {}"
            },
            {
                "thread": "1",
                "instr": "detects slot is empty"
            }
        ]
    }
    </script>
</multi-threaded-program>

Similar (bad) things happen without the other barriers.

### Various Memory Models

This section lists a bunch of common hardware memory models to provide a taste for them. It doesn't mention the more recent ARM and RISC V models. It also leaves out a notoriously weak (i.e. very permissive wrt reordering) model used on the DEC Alpha.

{% raw %}
<table>
<tr>
<th>Sequential Consistency Model</th>
<th>X86 Total Store Ordering (TSO) Model</th>
<th>General Relaxed Consistency Model</th>
</tr>


<tr>
<td colspan="3" style="text-align: center;">Instructions <b>appear</b> to execute serially. That is, no two instructions across all the cores <b>appear</b> to execute in parallel.</td>
</tr>

<tr>
<td colspan="3" style="text-align: center;">Instructions from different cores interleave in an unpredictable manner.</td>
</tr>

<tr>

<td>No Instruction swaps are allowed.</td>

<td>
Only a few specific instruction swaps are allowed. The swaps are not draconian and common patterns like the SPSC synchronous queue shown work without barriers. <br><br>Allowed Single-core swaps.

<ol>
  <li>[Different Address] <code>Store x=k, Load y</code>  to <code>Load y, Store x</code> </li>
  <li>[Same Address] <code>Store x=k, Load x</code> to <code>Load x [but, guaranteed to return k], Store x=k</code>. <br> This is called <b>bypassing</b>. It may be surprising that the <code>Load x</code> returns <code>k</code> even if the actual <code>store x=k</code> has been swapped to AFTER it. Obviously, this is necessary for single-core program correctness. One way to think about this is that the core is intelligent: it knows that the store takes some time to complete. So, in the mean time, it continues with later loads but satisfies them with the correct value for Load (<code>k</code> here). Eventually the Store completes in memory and all other cores can see it; in the mean time, this Core has probably advanced 10s or even 100s of cycles and all the other cores don't see <code>k</code>. </li>
</ol>
</td>

<td>
The allowed set of instruction swaps is even larger than TSO.
<ol>
  <li>[Different Address]: All kinds of swaps are allowed. <code>  Load x, Load y </code> to <code> Load y, Load x </code>. Similarly, Store/Load, Load/Store, Store/Store swaps are all allowed </li>
  <li> [Same Address]: This follows TSO rules. Only Store/Load can be swapped with bypassing. That is, <code>Store x=k, Load x</code> to <code>Load x [but, guaranteed to return k], Store x=k</code>. </li>
</ol>

The set of instructions swaps = Set of instruction swaps allowed by TSO + { Load/Load, Store/Load, Store/Store instruction swaps on different addresses }

</td>

</tr>

<tr>
<td>Barriers are essentially no-ops since there are no reorders anyway</td>
<td>Only StoreLoad barrier is meaningful. Other barriers are no-ops because their corresponding swaps are not permitted and so the barrier doesn't change the set of permitted re-orderings (of the non-barrier instructions)</td>
<td>All the barriers are meaningful and work as described.</td>
</tr>

<tr>
<td colspan="3"><code>Load x</code> returns <code>k</code> from the latest <code>Store x=k</code> that executed prior to itself. 
<br>Note that 'prior' is well-defined since instructions execute in serial order.
<br>Note that if <code>Load x</code> is swapped with  <code>Store x=k</code>   (same <code>x</code>), the Load should return <code> k </code>.  
</td>
</tr>

</table>
{% endraw %}

### Test your Mental Model

Is it required to have a StoreLoad barrier between `slot = FULL` and `while(slot == FULL) {}` ?
{% details Hint %}
No.

There are two possible outcomes in terms of memory completion order:
* No swap: slot = FULL and then while(slot == FULL) {}
* With a swap: (test slot == FULL) completes N times as part of the while loop, slot = FULL completes, rest of the while loop (test slot == FULL) executes. The first block of N tests will all read FULL for the slot even though the actual write (slot=FULL) only completes later. This is guaranteed by almost all memory models to preserve the sanity of software folks.

Since a Store/Load reordering doesn't change the final result, a StoreLoad barrier isn't required.
{% enddetails %}

<br>Writes get stuck in cpu cache before hitting memory. Sometimes, CPU cache needs to be flushed. Right or Wrong?
{% details Hint %}
Wrong.

Cpu cache and memory are one unit in all processors with cache coherence (which is most of the processors in practice). If a write hits cpu cache, it is equivalent to hitting memory. There's no cpu-cache flushing.

This is a common misconception on the internet. What is asynchronous is store-buffers that sit **in-front** of the cpu cache. Suffice it to say that it takes some cycles before even initiating a write to cpu-cache (due to the cache coherence protocol, MESI or MOESI for example). A store-buffer holds the write while the cache-coherence protocol gets ready to accept the write and eventually commits it to the cpu-cache. The cpu can continue on doing other work instead of waiting on completing the write. The store buffer also services loads from the writes that it currently holds. Some times, it is necessary to wait until this store buffer drains and become empty and there are instructions for this. It's still a 'drain' because the drain happens naturally as the cpu-cache becomes ready to accept the stores. It's NOT a 'flush' because it cannot be forced - the cpu cache has to be ready to accept the write. There's no instruction to flush, only an instruction to 'wait' until the store buffer drains.

{% enddetails %}

<br>
### Resources

* [A primer on Memory Consistency and Cache coherence](https://pages.cs.wisc.edu/~markhill/papers/primer2020_2nd_edition.pdf) is both a bible and an accessible read
* [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html) is another accessible and important read
* [Is Parallel Programming Hard, And, If So,
What Can You Do About It?](https://mirrors.edge.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook-1c.2023.06.11a.pdf) is a practical book from Linux Kernel developer McKenney

### Appendix

Even more reorderings are possible; <span class="danger">Compilers can transform source code too</span> before the hardware reorders it! Analyzing the resulting reorderings and proving correctness of concurrent programs would be extremely tough.

Java which is portable across platforms recognized the need for specifying a language-level memory model so that multithreaded programs have well-defined behavior. By necessity, Java had to adopt a sort of least common denominator across the hardware memory models of most (if not all) of the platforms they run on. So, Java's memory model is most readily understood as a Relaxed Consistency Memory Model, with the following mappings:
* volatile field F; Store F=10 is equivalent to: LoadStore StoreStore F=10 StoreLoad StoreStore
* volatile field F; Load F is equivalent to: LoadStore StoreStore F=10 StoreLoad StoreStore
* Entering a `synchronized` section is like volatile field read 
* Exiting a `synchronized` section is like volatile field write

Apart from reordering protection, there are also additional concerns that Java describes: 
* Atomicity of 64 bit writes  (Java only requires 32 bit writes be atomic)
* Atomicity of 8 bit writes on 32 bit platforms (avoiding what's called Tearing) 
* Visibility of memory: Although the Java Memory Model doesn't require this, in practice, volatile writes also come with an immediacy guarantee in addition to barrier effects. That is, as soon as the volatile write operation completes, every other thread can read this write (if it does a volatile read). In contrast, Java doesn't require a regular memory write be made immediately visible to other threads. In other words, in practice, volatile reads & writes are linearizable, not just sequentially consistent.

