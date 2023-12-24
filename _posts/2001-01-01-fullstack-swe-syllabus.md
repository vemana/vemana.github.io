---
layout: post
title: The full-stack Software Engineer syllabus
date: 2023-11-19 15:00:00
description: "A look into the breadth of topics that Full Stack Engineers encounter"
tags: software-abiyz
categories: software-engineering
featured: false
giscus_comments: false
published: false
toc:
  beginning: true
  sidebar: left
mermaid: true
---

# What is this about?

Colloquially, a **FSE** (Full-stack Software Engineer) is a SWE (Software Engineer) with the skills to work end to end on a web application. But what topics does an FSE need to master or at least be familiar with? In this post, I'll list some topics of interest that go into making a FSE, provide a brief introduction and some jump-off points for further research.

## A note of caution

This post covers a large set of topics. If you are planning to be an FSE, don't let it intimidate you. Some things to bear in mind:
* The goal for an FSE first and foremost is to solve customer problems. You may not even need 10% of these skills in some jobs and may need 90% in some others
* Likely, you'll learn best by actually doing. So, it is helpful if you are practising some of these in your day job
* Learning these topics takes significant, conscious effort. Expertise is only obtained by thinking
* The aim in listing these topics is to provide an introduction to the breadth of topics a FSE may encounter

# Code

As a FSE
* you'll write a ton of code (unlike data-heavy jobs like ML engineering), so you should have a reasonable idea of how to write & structure code **that ages better**
* you'll deal with many frameworks which can look convoluted and/or daunting. It helps to have a framework to think/reason about them to quickly come upto speed

To be a master FSE usually requires expertise in the above topics. Each SWE will develop their own method over time.

## Structure

Structure your code coherently. 

It should be possible to 
* Guess what feature is implemented where 
* Given knowledge of what the code does, SWEs unfamiliar with the codebase should be able to understand HOW it does it
* With NO knowledge of what the code does, unfamiliar SWEs should have at least say 50% chance of understanding WHAT the code is doing
* Code should age well. That is, as more features are built it shouldn't be necessary to do stop-the-world codebase refactors

In my practice,
* I use the [ABIYZ pattern](/blog/2023/abiyz-intro) for structuring code where possible
* Unless working on a really really latency sensitive codebase, I use immutability as much as possible
* As for code aging, experience has taught me some particularly [bad patterns of code aging](/blog/2023/software-changes-and-aging/)

## Frameworks

Understand the frameworks you use thoroughly.

A modern full stack likely uses several frameworks. Examples include Web application backends (REST APIs, Authentication etc.), Web application frontends (Angular, React etc.). Each of those frameworks tends to do a few things very well (its **design center**) and other things not so well. Ideally, you should stick to its design-center, understand it thoroughly and be able to explain it to others.

In my practice, I find the [ABIYZ pattern for understanding frameworks](/blog/2023/abiyz-intro#example-4) useful. Beyond that, I find it helpful to be aware of a large number of ideas from various walks of Computer Science and Engineering - very few ideas are brand new.

## Building

Aim for deterministic builds.

If you work on large projects, Building the code to produce deployable artifacts can itself be a strongly non-deterministic process. Non-determinstic processes extract a significant time tax.

If you have the size to justify it, Google's [Bazel](https://bazel.build/) is an excellent choice, but it is a pretty heavy and opinionated tool; so, be cautious.

## Testing

Write high quality tests and use continuous testing.

As a FSE, you'll read, write & release a ton of code. You'll need high quality automated, pre-commit tests to maintain long-term velocity - i.e. ability to add features quickly without breaking existing features. What constitutes high quality tests? This is a difficult question to answer with certainty but there are some simple thumb rules that I've found valuable in my practice.

If my experience is any guide, software testing is still in the dark ages. It tends to be dominated by discussions around test pyramid, test driven development etc. While useful, I think they don't address what in my opinion is the most relevant concern: An **objective definition of a Good Test**. That is, a definition which classifies every test as *Good* or *Bad*. In practice, that means any definition that classifies say 80% of the tests with 90% agreement among the human raters. In other words, if we give the definition to 100 SWEs (*human raters*) and ask them to rate a 1000 tests as *Good* or *Bad* based on the definition, more than 800 of the tests will have 90 or more human raters classifying one way. Such a definition is criticalbecause it provides clear guidance for every SWE on the team on what tests are acceptable and what are not. It preempts unproductive debates. It is the equivalent of a language-prescribed source formatter (like Golang's built-in formatter) which preempts formatting debates (2 spaces as indent? 4? etc.) even if it isn't to the liking of everyone in any particular situation.

In my practice
* I adopt the definition of a *Good Test* from [Objectively Good Tests](TODO) and utilize the practical techniques there-in to produce *Good Tests*
* I attempt to use [homomorphic](/blog/2023/testing-calculator-homomorphism/) code structure to minimize the number of tests while maintaining full coverage


## Error Handling

Treat Error paths and outcomes as first class citizens. Error message should tell you what's wrong most of the time.

A good thumbrule is that error messages should explain what is wrong and attach context variables that led to the error; that is, using a debugger should not be required in most cases. Useful error contexts would include variables across many stack frames (especially the stack frames which are in the middle of a loop) and the stack trace itself.  Attaching sufficient context is much harder than one thinks. In languages such as Java/C#, exceptions can also be a double edged sword.

In my practice, I aim for [practical error handling in Java](TODO) practices.

## Continuous Releases

Release often, preferably 4 times a week.

As a FSE, you'll release a lot of features over time. Having a predictable and fast release schedule allows for quick feedback and removal of transient compatibility-related glue. So, you'll need to stay disciplined with continuous releases. Setup your processes to aim for daily releases (except say, Friday & weekends). While it may seem courageous to be releasing everyday, remember that lower frequency releases tend to result in significant amount of cherry picking, compatibility issues and overall lower quality releases.

# Your Roles

As a FSE, you'll have to play many roles. You'll interact with many stakeholders, provide leadership and expand your influence. The following is meant to provide a sneak peek into these aspects.

## Personnel Interactions

As an FSE, it is **critically important** to be able to interact with a wide variety of roles. It is important to maintain a strong working relationship across the entire spectrum of roles. The following is a non-exhaustive list of such roles you'll interact with.

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

Sometimes FSEs will interface with customers directly to learn their pain points. If you do get the chance, lean in and really understand how customers use the product. If you don't get given the chance, ask for it. Listening to customers first hand will connect the dots between your technical work and customer value. More importantly, it helps you get a sense of relative priorities of customers. For example, should you spend time towards reducing the latency of your service or towards providing a more understandable error message when something goes wrong? Understanding the customer perspective helps you better make micro decisions like this one.

### Difficult people

It is likely you'll have some colleagues who can be characterized as 'difficult'. Have a strategy to collaborate effectively with them despite the difficulties.


## Leadership

Leadership is one of those things that you can recognize when you see but not necessarily define it. It has many strings and so a simple working definition is likely to be simplistic. In this section, I'll draw attention to some of its important aspects that a FSE can reasonably exhibit.

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

# Backend Systems

As a FSE, you'll need to interface with many backend systems. For example, you may need to work with a distributed database (potentially inconsistently replicated), a pub-sub message queue, asynchronous data syncs among others. Many concerns emerge from this.

## Design Center

Understand the Design Center of backend Systems.

Each backend system has its own `design center`, that is, a purpose where it is a perfect fit. You have to understand the mental models of each of these systems and factor them into your design. In addition, you'll need to understand iterative design. It is not feasible to deliver all the pieces of a design upfront. So, you'll need to monitor some metrics that you know will not be at-target at launch but can be improved over time. The initial design should perhaps favor time to market **without** closing doors on features that didn't make the launch cutoff.

Some standard systems to understand:
* Scalable Key Value stores: Bigtable, NoSQL but more accurately called No-Transactions.
* In-memory stores: Redis
* Big file sytems: Ceph, Google Colossus   
* Map-reduce: Cloud Dataflow
* Real-time processing: Apache Kafka
* Vertical relational databases: Oracle, MySql
* Distributed relational databases: Spanner, Cockroachdb
* Publish Subscribe

## Design Simplicity

Keep it simple: Bound the complexity

One of the most common temptations is to explode the number of tools used. While there are merits to this - `one tool, one purpose` is appealing - complexity increases super-linearly in the number of distinct concepts (or tools) used in an architecture. There's a natural tension between using different tools and using the same tool beyond its design center. For example, one can simulate a simple pub-sub using database tables and some Sql. When to use this vs a real pub-sub system is a judgment call that has to be honed with experience and informed by the circumstances of the current situation. If you have a growing team, adding new concepts doesn't scale well and you'll likely end up with hotspots: a few SWEs who know about all the concepts and everybody else is constantly going to them for information/advice. This dynamic tends to break under its own weight.

Overall, it is important to not overdo systems/tools usage. This judgment takes time and experience.

## Vertical Relational Databases

Understand thoroughly.

Of all the systems you'll encounter as an FSE, Databases are perhaps the most ubiquitous and important. Databases are a **vast** topic and understanding it means forming a mental model by which one can utilize it effectively: for e.g. efficient querying, avoiding inconsistencies, using transactions etc. Vertical databases (like Oracle, PostgreSQL) are still the most common form of database (often with flavors of some replication/sharding).

Here are some (non-exhaustive) topics to understand in depth, in no particular order:
* Indexes & Querying: how a database uses Indexes to query effectively
* Schema design: Access pattern friendly design, Relational vs KeyValue
* Transactions: Optimistic & Pessimistic transactions
* Replication: Does the db support replication? If so, what kind of consistency does it offer?
* Sharding: Does the db support sharding? If so, how is it managed (auto vs manual)?
* Snapshots: How do you get a point-in-time snapshot of the database for offline processing ?
 
## Distributed Relational Databases

Develop a mental model.

All the same concerns as Vertical Databases apply, but Distributed Databases (e.g. CockroachDb, Spanner) are noticeably different. For example, consistency models, distributed sql execution, automatic sharding, tracing sql execution etc. make for a different experience using them compared to regular vertical databases.

Their APIs are also different. For example, Spanner due to its external consistency offers a more high fidelity API (one that reflects the distributed nature of it) than a vertical database which also happens to be sharded/replicated.

Resources
* [F1 Distributed Query Execution Paper](https://research.google/pubs/f1-a-distributed-sql-database-that-scales/)
* [Spanner](https://cloud.google.com/spanner)
* [Cockroach DB's consistency model](https://www.cockroachlabs.com/blog/consistency-model/) is a great read into important concerns like Linearizability
* [Db Consistency & Isolation Terminology](https://www.cockroachlabs.com/blog/db-consistency-isolation-terminology/)
* [Jepsen Consistency Models](https://jepsen.io/consistency). Clickable map of various terms.
* [Raft leader leases for low latency reads](https://www.yugabyte.com/blog/low-latency-reads-in-geo-distributed-sql-with-raft-leader-leases/)
* [Hybrid clocks 1](https://www.youtube.com/watch?v=YqNGbvFHoKM) and [Hybrid Clocks 2](https://www.yugabyte.com/blog/evolving-clock-sync-for-distributed-databases/) when atomic clocks like Spanner TrueTime are not available
* [Herlihy and Wing's Linearizability paper](http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)

## Non-relational Distributed Databases

Have them in your toolkit.

Colloquially called key value stores, these have become mainstays but, to some degree are being usurped by Distributed Relational Databases. They tend to have limited transaction semantics (say only a single key can be atomically updated). Examples include Google's Bigtable, MongoDb, Amazon Dynamo DB.

## In-memory stores

Rare, but some domains require them.

Specifically, in the case of real-time writes and reads - for example, online game leaderboards - in memory stores with durable persistence./O

## Data warehouses

Essential for insights. SQL is your friend.

Data warehouses are typically just a bunch of append-only flexibly structured data. They can contain data both business data (how many clicks did a particular Ad receive) and application telemetry (how long did a user spend on a form on the webpage). Metrics for business are often powered like this.

## Other big data systems

# Performance

Many aspects tto performance: throughput focused or latency focused. While it is sometimes claimed that there is a tradeoff between the two, it is not exactly very clear cut. In some scenarios, code can be improved to deliver both more throughput and better latency.

## Hardware: Know it and make better performance choices

Even if it is unlikely that an FSE will ever interface directly with hardware, there'll be times that performance matters above all. In such scenarios, it is crucial to understand how hardware works and to write code that is sympathetic to it. In general, you'll be interfacing with high performance libraries rather than writing low level code, but it it still cruical in order to utilize these libraries well.

In no particular order, it is important to understand:
* Relative speeds of processor and memory. Latency today is usually determined by cache misses (i.e. processors waiting for memory).
* Processor cache hierarchies
* Cache coherence protocols (MESI, MOESI)
* CISC instruction execution using internal RISC uops
* Fetch/decode/execute/retire cycle
* Using processor specific tuning libraries (e.g. Intel VTune)
* Individual instruction latencies
* Effects of branches on execution
* Batching for amortization
* Branch (mis-)prediction
* Speculative and out-of-order execution

Resources
* [Algorithms for Modern Hardware](https://en.algorithmica.org/hpc/) shows practical issues
* [Instruction Latencies for most processors](https://www.agner.org/optimize/instruction_tables.pdf)
* [Intel's presentation on Modern CPU Architectures](https://www.youtube.com/playlist?list=PL8t1FdN2Tj3ZVAzTY-FvsS0qy-mEfRdoj). Great overview of how processors execute instructions.
* [Matt Kulukundis' talk on improving Hash Table performance at Google](https://youtu.be/ncHmEUmJZf4)


## Multithreading: Essential in the multi-core era

As an FSE, you have to be familiar concurrency and parallelism. Even though it is unlikely you'll need to write your own primitives, a reasonable under-the-hood understanding is essential for both correct and performant code.

In today's era of shared memory multicore systems, concurrency and parallelism are front and center. Better performance leads to both happier users and better resource footprint (helps bottomline!)

### Concurrency: Know the constructs, limitations and concerns

Concurrency is about competing for resources as opposed to Parallelism which is about cooperation towards a particular task. Concurrency shows up in many contexts - queues, database transactions etc.

As an FSE, it is unlikely you'd write your own concurrent datastructures. However, it pays to understand concurrency concerns in choosing the right ones for your own application (apart from actually benchmarking performance of course). For example, as an exercise, deep-dive and understand a single producer single consumer high performance queue. It will introduce you to some important hardware details (also see resources in [Hardware](Hardware) section).

Resources
* [LMAX disruptor queue](https://lmax-exchange.github.io/disruptor/)
* [Martin Thompson: Adventures on concurrent programming in Java](https://www.youtube.com/watch?v=929OrIvbW18)
* [Martin Thompson: Mythbusting Modern Hardware to Gain Mechanical Sympathy](https://www.youtube.com/watch?v=MC1EKLQ2Wmg)
* [Martin Thompson: Mechanical Sympathy blog](https://mechanical-sympathy.blogspot.com/)

### Parallelism: Think parallel when appropriate

Parallelism is about exploiting cooperation among resources towards a particular task. Like with concurrency, getting top performance requires an understanding of hardware. For example, exploiting the single writer principle (each cache-line should be written only from one core) and exploiting the fact that a modern processor has many ALUs so it can do multiple add/multiplies simultaneously; i.e. each core itself has inbuilt parallelism and high performance code needs to exploit it.

As an FSE, it is unlikely you will ever write a parallelism framework (like Java's ForkJoin, or Go's GoRoutines). Still, it is useful to understand the overheads and hardware-empathetic patterns in using parallelism.

Resources
* [Guy Steele's How to think of Parallel Programming Not](https://youtu.be/dPK6t7echuA)
* [Rob pike: Concurrency is not Parallelism](https://youtu.be/oV9rvDllKEg)
* [Tony Hoare's Communicating Sequential Processes paper](https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf). Basis for Go routines.
* [Ron Pressler: Java Virtual Threads](https://youtu.be/YQ6EpIk7KgY)
* [Java Virtual Threads used like GoRoutines in the Game of Life](https://youtu.be/n8uGsc4y6W4)

### Memory Models: Develop a mental model

It is important to understand Memory Models whenever you are writing multi-threaded code. Even more so in this age of multi-core processors. Even though memory models originated as a hardware concern, they are actually an important concern for high level programming languages like Java and C++ in multithreaded contexts. Memory models determine semantics when multiple threads communicate via shared memory.

If core1 performs a series of writes (`A` and `B` are variables here): `A = 0; B = 0; A = 10; B = 20;` and core #2 performs `read B; read A;`, can it read `B==20 and A==0` ? This is the kind of question that is answered by memory models. One might think that it is a non-sensical possibility to obtain `B==20 and A==0`, but it is definitely possible under weak memory models. The x86/x64 architectures have what is called a Total-store-ordering (TSO) model where this will not happen but other oddities do. Higher level languages (like Java) have to provide a common way to write meaningful (i.e. predictable semantics) multi-threaded code across architectures.

Knowing that your code runs on an x86/64 machine, you can exploit its TSO model to gain more performance. For example, it would be ok to 

Resources
* [Primer on Memory Consistency and Cache coherence](https://pages.cs.wisc.edu/~markhill/papers/primer2020_2nd_edition.pdf). Terrific book to form a good mental model
* [Memory models overview & RISC V](https://youtu.be/QkbWgCSAEoo)
* [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.htmljls-17.4)

### Misc topics

There are several other topics in the general area of multithreading. The more one's coverage extends, the easier it is to grok newer topics. For example, there are remarkable similarities between optimistic transactions in a database and lock-free compare-and-swap based shared memory concurrent datastructures.

While a deeper understanding is not necessary for an FSE, it is potentially helpful to know ancilliary topics like Lock free datastructures and Hardware primitives like CAS and/or Fetch-and-add.

## Latency

Latency engineering is a different ball game. It is unlikely for FSEs to look at cycle count. In some specific industries like High-Frequency-Trading, latencies matter tremendously.

# APIs: A vast topic that can only be learnt in the field

APIs really are a vast topic and I will only be scatching the surface here. APIs come in  many forms: internal library APIs consumed by your application code and external APIs consumed by a browser or external clients. While some considerations are different between internal and external APIs, a vast majority of principles apply to them both.

As an FSE, API design and maintenance will be a big portion of your job. It is a vast topic with many aspects to it. Some of them, in no particular order:
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

## TCP/IP: Know it well

## HTTP: The workhorse

App level protocol. HTTP 1 vs 2 vs 3.

## gRPC: RPC framework
gRPC is a prime example.

Resources: 
gRPC notions video
gRPC-web for browser/app clients
Others like Thrift

## Networking

Need to understand basics of Networks, starting from Ethernet to subnets, WWW, DNS, routing. Useful for understanding docker networks, or setting up VPNs etc.

Also need to understand notions of connections, streams v

Resources: 
Internet Routing.
Docker networking


# Production

## Containers

Docker is the de-facto standard. Need to understand c-groups

Resources: docker presentation on namespaces

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
