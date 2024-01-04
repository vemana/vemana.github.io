---
layout: post
title: "Can software testing be objective? Hello from Homomorphisms."
date: 2023-10-20 15:00:00
description: How many tests to write? What tests to write? Can there be objective answers? Surprisingly, the answer is yes for a certain class of programs.
tags: software-testing
categories: software-engineering
featured: true
giscus_comments: false
toc:
  beginning: true
  sidebar: left

---

# 5 minute summary

If you ever wrote a test for a piece of code, you've wondered how many and what kind of tests to write. Surprisingly, for a class of functions called homomorphisms, you can write minimal tests with confidence. They are also very common if you know to look for them, but that's a topic for another time.

For a calculator `evaluate` function:

```java
long evaluate(Expression input, VariableMap variables) {...}
```
operating on AST
```java
sealed interface Expression {
  record Addition(Expression left, Expression right) implements Expression {}
  record Multiplication(Expression left, Expression right) implements Expression {}
  record Division(Expression left, Expression right) implements Expression {}
  record Number(long value) implements Expression {}
  record Variable(String id) implements Expression {}
}
```

with example expression
```
a*10 + b // a & b are variables whose values can be looked up in VariableMap
```

Don't write it like this (let's give it a name: **Natural Impl**):
```java
long evaluate(Expression input, VariableMap variables) {
  return switch(input) {
    case Number(value) -> value;
    case Variable(id) -> variables.getValue(id);
    case Addition(left, right) -> evaluate(left, variables) + evaluate(right, variables);
    case Multiplication(left, right) -> evaluate(left, variables) * evaluate(right, variables);
    case Division(left, right) -> evaluate(left, variables) / evaluate(right, variables);
  };
}
```

Write it like this instead (let's give it a name: **Homomorphic impl** for reasons explained later):
```java
// Since the thrust of this post is testing, we'll not comment on 
// 1. Efficiency. For example, boxing, varargs overheads here. 
//    There are many ways to mitigate them.
// 2. Error handling. What if dividing by 0? 
//    Again, there are many options.

interface Operator {
  long invoke(long... children);
}

class Evaluator {
  
  static final Operator PLUS = vals -> vals[0] + vals[1];
  static final Operator MULTIPLY = vals -> vals[0]*vals[1];
  static final Operator DIVIDE = vals -> vals[0]/vals[1];

  // This is our evaluate function implementation
  static long evaluate(Expression node, VariableMap varMap) {
    return operator(node, varMap)
        .invoke(children(node)
                    .map(child -> evaluate(child, varMap))
                    .mapToLong(x -> x)
                    .toArray());
  }

  private static operator(Expression node, VariableMap varMap) {
    return switch(node) {
      case Number(v) -> _ -> v;
      case Variable(id) -> _ -> varMap.getValue(id);
      case Addition(_, _) -> PLUS;
      case Multiplication(_, _) -> MULTIPLY;
      case Division(_, _) -> DIVIDE;
    };
  }

  private static Stream<Expression> children(Expression node) {
    return switch(node) {
      case Number(v) -> Stream.of(); // empty
      case Variable(id) -> Stream.of(); // empty
      case Addition(left, right) -> Stream.of(left, right);
      case Multiplication(left, right) -> Stream.of(left, right);
      case Division(left, right) -> Stream.of(left, right);
    };
  }
}
```

and write the following basic tests:
```
// One basics test per Node (like Addition, Multiplication)
expect(7, "a", {a = 7}); // Variable
expect(9, "9", {});      // Number
expect(11, "1+10", {});  // Addition
expect(12, "3*4", {});   // Multiplication
expect(2, "4/2", {});    // Division

// One test per Corner case per Node
expect_failure("1/0", {});
```

but skip more complex tests like this (we can prove they are not required):
```
// Complex tests (arg depth > 1): can be skipped with Homomorphic Impl
expect(203, "10*20+a", {a=3});
expect(18, "a*b+(3*2)", {a=3, b=4});
```

thereby obtaining full coverage in a small number of tests.

## What is a Homomorphic Impl?
Homomorphic Impl exploits the fact that the `evaluate` function is a **Homomorphism** [(wiki)](https://en.wikipedia.org/wiki/Homomorphism) to separate tree traversal from operator application. Despite the math terminology, Homomorphism [(in layman terms)](#homomorphisms) is a simple idea.

In a Homomorphic Impl, each node defines its **Operator** function (PLUS, MULTIPLY etc.) and there's a separate evaluator that traverses the Expression tree and invokes the Operators. Contrast this with the **Natural Impl** where the traversal is intertwined with the Operator application in the body of the method impl. This sort of coupling doesn't age well - see [Why prefer a Homomorphic Impl](#why-prefer-a-homomorphic-impl).

## Why prefer a Homomorphic Impl?
There are many benefits to exploiting homomorphism.


**Test minimalism** 
* With a Homomorphic Impl, **you can confidently skip complex tests** - like those that use arg depths > 1.
  ```
  // Complex tests (arg depth > 1): can be skipped with Homomorphic Impl
  expect(203, "10*20+a", {a=3});
  expect(18, "a*b+(3*2)", {a=3, b=4});
  ```
* We can prove rigorously that they are not needed; but it is fine to write one single complex expression test, just to be safe

**Ageable code**. Homomorphic Impl ages well along many important dimensions of change.
* Introduce parallelism easily if required. Doing this with Natural Impl gets very messy very quick
```java
// Showing only the changed parts.

  static long evaluate(Expression node, VariableMap varMap) {
    try(var scope = new StructuredTaskScope.ShutdownOnFailure()) {
        return evaluate(node, varMap, scope);
    }
  }

  private static long evaluate(Expression node, VariableMap varMap, StructuredTaskScope scope) {
    var childResults = children(node)
                           .map(child -> scope.fork(() -> evaluate(child, varMap)))
                           .toList();
    scope.join();
    return operator(node, varMap)
        .invoke(childResults.stream()
                    .map(Future::resultNow)
                    .mapToLong(x -> x)
                    .toArray());
  }
```
* Homomorphic Impl has O(1) calls to `evaluate` but Natural Impl has O(Nodes) calls to `evaluate`
  * In the example above, Homomorphic Impl has 1 call to `evaluate` while Natural Impl has 6 of them (2 each for addition, multiplication, division operators)
  * Reducing usage of API surface is extremely useful in practice. 
    * For example, consider changing the API signature to pass one more parameter. It requires 2 changes in Homomorphic Impl but 6 changes in Natural Impl. This adds up quickly when you have 20 Operators instead of 5
    * Not applicable here, but instrumenting call-sites for telemetry is easier when you have fewer number of call-sites
* Add new operators with ease
  * For example, it is trivial to add the SUBTRACTION operator
  * Code remains easy to read even with 20 operators, while the Natural Impl starts becoming unwieldy at say 10
* Handoffs to different owners are relatively straightforward to explain  

## Summary of the summary!

There's a class of functions called Homomorphisms that can be coded in a certain pattern - the Homomorphic Impl - which requires only a small number of tests to gain confidence. The pattern also ages well to many typical changes. Homomorphisms are VERY common if you know to look for them, but that's an entirely different post.

<hr>
# Introduction

All good quality Software has tests. But, there's the age old question faced by every software engineer:
* How many tests should I write?
* What kind of tests should I write?

These are good questions that elicit non-committal, **it depends** answers that ultimately don't help either the author, the code reviewer or the next maintainer.

## Why care about eliminating test subjectivity and minimizing tests?

High quality automated tests are essential for high quality software. Tests determine iteration & in turn product velocity. A lack of tests is a disaster in the making - any project of reasonable size grinds to a crawl without automated tests while their presence avoids `hostage to the code` situations. Rapid changes can be made & rolled out with confidence.

Test minimalism is important because a large number of tests (for e.g. to obtain code coverage) carries significant costs - presubmit times balloon, tests tend to get coupled with code & changes to one piece of code breaks a large number of tests for no good reason.

Test subjectivity - that is, what tests to write - hinders productivity. It causes code review debates, missing tests (because there's no framework to think about them) which bite later, difficulty in understanding which new tests to write when changing code, challenges in handovers to a different owners among others.

There are plenty of other concerns that are topics for other posts. For example, once you decide to write a test (logically), how to write it cleanly in a way that conveys the intent of the test to any new maintainer? Really the list is endless; one can barely scratch the surface of quality tests with a single post.

> Perhaps the most important thing going for quality tests is this funnel: quality tests -> higher productivity -> less need to hire a ton -> less need to reduce the hiring bar -> maintain high revenue/employee -> happier employees -> growth for everyone.
{:.block-warning}

## In this post...

> In this post, I'll demonstrate a class of problems & a strategy of coding for which we CAN objectively write a minimal number of tests with confidence & coverage.
{:.block-tip}

Testing is such a complex subject that it is likely not feasible to provide a general recommendation. At the same time, there are probably some problem domains which admit objective recommendations. In more than a decade of engineering experience, I am yet to encounter objective recommendations for what & how many tests to write. It is not even clear if such recommendations exist. But, in this post I argue otherwise and make an object recommendation on a particular problem domain.

One might ask: how feasible is it to have one objective recommendation per problem domain that admits? It is a whole lot better than the current mess of general recommendations which mean different things to different people. As a field, current best practices around tests seem ambigous and fresh thoughts with more objectivity are necessary.

<hr>

# A [surprisingly robust] strawman

How to approach a daunting, nebulous question like `What kind of tests should I write?`? Start by asking a simpler, almost strawman question, of course!

> **A simpler, natural question to ask**: What is the minimal number of tests one needs to write for a Calculator program?
{: .block-warning}

## Making the question concrete

Let's make it concrete by defining an Expression AST. The Calculator program operates on this AST.

```java
// Calculator program Expression AST

sealed interface Expression {
  record Addition(Expression left, Expression right) implements Expression {}
  record Multiplication(Expression left, Expression right) implements Expression {}
  record Division(Expression left, Expression right) implements Expression {}
  record Number(long value) implements Expression {}
  record Variable(String id) implements Expression {}
}
```

Some example `Expression`s include `(a*10+b)/100` which corresponds to a AST that looks like:
* Division
  * Addition
    * Multiplication
      * Variable("a")
      * Number(10)
    * Variable("b")
  * Number(100)

So, now we are ready to restate the question.

> **Concrete strawman question**: How to write a Calculator program where:
> * The program implements a function `long evaluate(Expression input, VariableMap variables);` that evaluates the expression
> * The program should be accompanied by tests
> * The tests should give confidence that the implementation works
> * The number of tests should be minimal
{: .block-warning}

## Solution Attempt

It is natural to write a solution that looks like this:
```java
long evaluate(Expression input, VariableMap variables) {
  return switch(input) {
    case Number(value) -> value;
    case Variable(id) -> variables.getValue(id);
    case Addition(left, right) -> evaluate(left, variables) + evaluate(right, variables);
    case Multiplication(left, right) -> evaluate(left, variables) * evaluate(right, variables);
    case Division(left, right) -> evaluate(left, variables) / evaluate(right, variables);
  };
}
```

And follow it up with tests like
```
expect(11, "a+10", {a=1});
expect(12, "a*b", {a=3, b=4});
expect(203, "10*20+3", {});
```

So far so good. But, the question remains: what tests to write & how many of them to write. For example, are the following tests necessary?
```
1. expect(18, "a*b+(3*2)", {a=3, b=4});
2. expect_failure("a/b", {a=1, b=0});
3. expect_failure(10 + 12/b, {b=0});
```

Each of these tests ostensibly tests something. #1 appears to test a complex expression, #2 appears to test a corner case, #3 appears to combine them both (corner case within a complex expression). The challenge is to be able to objectively say that a given number of tests are sufficient.

## Segmenting the tests

After some reflection, it is natural to arrive at a segmentation of tests:

Test Id & Description | Examples <br> Format: **Test Name: Example** | Count
:--- | :--- | :------
**[Per-node basic]**. <br> One basics test per Node type. The arguments have depth 1. <br> Node can be Addition, Variable, Multiplication, Number, Division | Addition basic: `expect(11, 10+1, {})` <br>Multiplication basic: `expect(20, 10*2, {})` | O(#Nodes)
**[Per-node corner case]**. <br> One test per corner case per node. | Division corner case: `expect_failure("1/0",{})` | O(#Nodes)
**[Complex arguments]**. <br> One test involving a complex expression, potentially involving all the operators | Complex arguments: `expect(5, 1*2+9/a, {a=3})` | O(1), but unclear whether & which ones to write
**[Per-node Complex arguments]**. <br> One complex expression test per Node type | Addition complex arguments: `expect(22, 1*2+10*(1*2), {})` <br> Multiplication complex arguments: `expect(15, (1+2)*(2+3), {})` | O(#Nodes). Unclear whether to writes and if so, which ones to write
**[Per-node Complex arguments arg depth = K]**. <br> One complex arguments test per Node type. At least one of the arguments has a depth K. | Addition complex arguments, arg depth=3: `expect(29, 1*2*3*4 + 5, {})` | O(#Nodes). Unclear whether such tests should be written & if so, what arg-depths are acceptable

<br>
In practice, different styles differ on whether to write **[Per-node Complex arguments]** test and what values of `K` are considered acceptable for **[Per-node complex arguments, arg depth=K]** tests.

## This strawman is robust!

Even this simple example of a Calculator demonstrates the inherent difficulty in deciding which tests to write. 
* Without a meaningful segmentation of tests, we cannot answer whether there's sufficient coverage and obtain confidence in the implementation. 
* Even with a segmentation, it is unclear which test to write for each segment

Segmentation is reasonable progress but we still haven't answered which tests to write and why those tests give us confidence in the implementation.

## Skip complex argument tests?

One might argue that complex arguments tests are not required because the code is recursively evaluating each child first and only passing its result to the parent operator. So, the complexity of the child argument is immaterial. This is certainly a reasonable argument & in fact, one this post will make towards the conclusion. But, there are some important reasons to continue investigating further:
* [Special code structure] The testing strategy of skipping complex arguments is only valid when child evaluation results are passed to the parent
  * When a code base is touched by many people, this requirement can easily get lost
  * Often, at the point when the original author moves on, the code has this structure but no one else knows that it has that structure
* [Node complexity and cardinality] Even if all the code base authors are familiar with the code structure, a large number of node types and/or complex node evaluations can make it hard to maintain the structure
  * In the above example, we had 5 node types. In industrial strength applications - for e.g. translating a user query to sql - this factor can be more than 20
  * Once we get above a few pages worth of the `evaluate` function, we'll need tools to help ensure that we are always evaluating the children recursively before applying the parent's operator

If only we had some tools to help us maintain the structure! Then, we can simply skip the complex argument tests with confidence.
<hr>

# Slaying the strawman

How do we make progress? The primary cause of test subjectivity is the arg-depth of complex argument tests. We don't know if a particular bug will be triggered only on arg depths of >= 2 and in a particular traversal path through the Expression tree. So, it is reasonable to never fully feel confident that our code works for all possible depths while only testing a sample of depth 2.

## Dealing with arg depth

> One way to grapple with the arg depth question is to somehow make the arg depth immaterial i.e. complex argument tests will catch the same bugs regardless of arg depth.

Let's assume we can make arg-depth immaterial. What does it buy us? For a start, we can simply pick arg depth = 1. `Once we set arg depth = 1, [Per-node complex arguments arg depth = 1] is the same set of tests as [Per-node basic] tests. Remarkably, we can drop the complex argument tests w/o missing any coverage!` This is a sizeable reduction in the set of tests and contributes to the goal of reducing the number of tests.

That's promising. How do we make arg-depth immaterial? arg depth being immaterial means that the bugs found from arbitrary depths (ignore stack overflow) are the same bugs found at arg depth = 1. This suggests that the implementation function for a Node should not even have access to the child Nodes - if it did, the impl can become intricately dependent on the exact arg and a bug might be triggered on only a very specific tree `(Addition(Multiplication(Division)))` say and we wouldn't know to test this particular tree. That is a bummer because `how can we implement the function if it can't even access the child Nodes?`

Perhaps surprisingly, there is a way to approach this. But first we need a detour in homomorphisms.

## Homomorphisms

[Homomorphism](https://en.wikipedia.org/wiki/Homomorphism) is an algebraic construct which essentially captures the following idea:

> **Homomorphism in layman terms**
> <br>
> <br>
>
> Consider a function which evaluates Nodes in a Tree (or directed acyclic graph more generally)
> * Example: functions like those in the strawman question: `long evaluate(Expression node, VariableMap vars)`
> * Such a function is either a homomorphism or not.
>
> It is a homomorphism if it has the following characteristics (to a good approximation)
> * Each Node has a bunch of [possibly empty] child Nodes
    * Example: `Addition` Node has two children while `Number` Node has no children
> * Each Node type has a corresponding operator function
    * E.g. `SUM` is the operator function for `Addition` node, and `MULTIPLY` is the operator function for `Multiplication` node 
    * Note that this operator function cannot depend on the Node's children. That is, Addition node will always have the same operator (`SUM`) regardless of its arguments.
    * The operator function for a Node `Number(v)` is the zero-ary operator `v`; i.e. it's a function which takes no arguments and always returns `v`. This is in contrast to the binary `SUM` function. In both cases, the Operator function is independent of children. Note that `v` is not a child of `Number(v)`, it is a configuration parameter, if you will.
> * The function's evaluation of a Node is equivalent to applying the node's operator function to the evaluated values of each of its children
>   * That is, `Evaluate(Node(node params, child1, child2, ...)) := Node.operator(node params)(Evaluate(child1, child2, ..))`
>   * That is, `Evaluate(Addition(left, right)) := SUM(Evaluate(left), Evaluate(right))`
>   * Similarly, `Evaluate(Number(value)) := value() == value`
{: .block-tip}

## Exploiting Homomorphisms

Let's start by noting that our Calculator's `evaluate` function is a homomorphism. 

So what, you ask? Why do we care about Homomorphisms?
* Homomorphism has so much structure that it can be factored further
* Further factoring means we get to invoke one of the foundational principles of software engineering: separation of concerns
* The factors (aka concerns) are relatively straightforward too
  * Evaluating child Nodes
  * Invoking the Node's operator passing child node values as arguments
* We can structure our code into two orthogonal pieces, one for each of the factors
  * Tests can be written for each of those orthogonal pieces
    * Tests that the correct Operator (like SUM) is being invoked with correct arguments
    * Tests for each of the Operators
  * Alternatively, tests can be written just for publicly visible piece (the `evaluate` function)
    * This implicitly tests that the correct Operator is being invoked with the correct arguments

**Code structure after separating the factors: Evaluating child nodes & Invoking node operators**
```java

// Since the thrust of this post is testing, we'll not comment on 
// 1. Efficiency. For example, boxing, varargs overheads here. 
//    There are many ways to mitigate them.
// 2. Error handling. What if dividing by 0? 
//    Again, there are many options.

interface Operator {
  long invoke(long... children);
}

class Evaluator {
  
  static final Operator PLUS = vals -> vals[0] + vals[1];
  static final Operator MULTIPLY = vals -> vals[0]*vals[1];
  static final Operator DIVIDE = vals -> vals[0]/vals[1];

  // This is our evaluate function implementation
  static long evaluate(Expression node, VariableMap varMap) {
    return operator(node, varMap)
        .invoke(children(node)
                    .map(child -> evaluate(child, varMap))
                    .mapToLong(x -> x)
                    .toArray());
  }

  private static operator(Expression node, VariableMap varMap) {
    return switch(node) {
      case Number(v) -> _ -> v;
      case Variable(id) -> _ -> varMap.getValue(id);
      case Addition(_, _) -> PLUS;
      case Multiplication(_, _) -> MULTIPLY;
      case Division(_, _) -> DIVIDE;
    };
  }

  private static Stream<Expression> children(Expression node) {
    return switch(node) {
      case Number(v) -> Stream.of(); // empty
      case Variable(id) -> Stream.of(); // empty
      case Addition(left, right) -> Stream.of(left, right);
      case Multiplication(left, right) -> Stream.of(left, right);
      case Division(left, right) -> Stream.of(left, right);
    };
  }
}
```
<br>

With this structure, let's examine the tests again
* **Per-node basic** tests are required
* **Per-node corner case** tests are required
* All other tests (e.g. complex arguments) can be skipped

In particular, all other complex argument tests can be skipped. This is because composition is triggered even for the simplest evaluations. At this point, it is reasonable to ask: is this additional code worth it? isn't it the same thing as the original attempt - just that the code is inline? Isn't the original attempt more compact & readable? All of these are legitimate questions that are answered in [Why prefer a Homomorphic Impl](#why-prefer-a-homomorphic-impl).

# Conclusion

See [Summary of the Summary](#summary-of-the-summary).

