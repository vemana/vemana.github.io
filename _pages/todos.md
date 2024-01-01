---
layout: page
permalink: /todos/
header_link_text: todos
title: Posts that I plan to eventually get to (with no promises)
description:
nav: false
nav_order: 1
toc:
  beginning: true
---

Mental Model for Memory Model
* Three main memory models
* Aim for graphics

Mental Model for Distributed systems consistency
* Eventual vs Strong
* Timestamped vs non-timestamped APIs

Throughput/Latencies
* Throughput times latency = queue size
* Tree of nodes each with Capacity, Requirement per request
* Throughput = Capacity/Requirement
* For leaf node which also happens to be throughput limiter: Queue size = 1

Immutable Functional style code
* Algebraic data types
* Data oriented programming (Perhaps Printer example ?)

Objectively Good Tests
* No over/under spec
* Avoid mocks

Error Handling in java

Borel-Cantelli lemma
* Thinking verbally and using approximations

Reducing mutablity
* Abstracting away State into an object. Command vs Process
* Keep state manipulation bounded in scope: 
  * Iterator vs Iterable
  * Number of methods in which mutable object exists should be minimized

Homomorphic coding
* How you can simulate homomorphisms even without the structure

API design
* guessabilty: many examples including css (allows partially parsed css declarations)
* composability: lack of sequence operator
