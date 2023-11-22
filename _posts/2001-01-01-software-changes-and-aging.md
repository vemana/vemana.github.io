---
layout: post
title: "Are there changes that accelerate software aging? Yes, here's a small list."
date: 2023-11-13 15:00:00
description: Without effective mitigation, some patterns of change accelerate software aging.
tags: software-ageability
categories: software-engineering
featured: true
giscus_comments: true
toc:
  beginning: true
  sidebar: left
---

# Introduction

If you've ever observed the software powering a fast growing product, you know that software ages and becomes fragile as requirements change. Can we overcome this aging or at least better manage it? 

# Some patterns of change that accelerate aging

In this section, I'll note some patterns of change that contribute to software aging when not managed properly. These patterns occur during the normal lifecycle of software evolution, typically from changing/newer requirements. My hope is that aging can be managed effectively by virtue of these patterns being recognized & formalized.

## 1. Going from Product Type to Sum Type

> When SWEs start off a model (quite reasonably) as a Product Type, changing it to a Sum Type can be a significant effort that is often hacked around.
{:.block-tip}


### Example 1 {#ptos-example1}
When getting a project off the ground, a SWE might reasonably model a Printer's output paper like so:<br>
`PrinterPaper := (Height, Width)`

Later, requirements change (printer can now print on circular paper) <br>
`PrinterPaper := CircularPaper | RectangularPaper` 
<br>
`CircularPaper := (Radius)`
<br>
`RectangularPaper := (Height, Width)`

The former version of `PrinterPaper` is a Product Type and the latter version is a Sum Type.

### Example 2 {#ptos-example2}
Suppose you are the software owner and your product is managing 401K plans (like Vanguard). It offers say 3 different `Fund`s that an Account holder can put money into. Each `Fund` has a price and each Account owns some quantity of each of the 3 funds. That is, `Account := List of (Fund, Quantity)` and `Fund := (Price, <other metadata>)`.

Now, you need to support a SDB (Self Directed Brokerage) for a 4th `Fund`; that is, an option for an Account holder to put money into self-managed external brokerage account. It's no longer true that each `Fund` has a notion of `Today's price` because SDB doesn't have a price! You now have a different model: `Fund := FundWithPrice | SDB`. That is, `Fund` has evolved into a Sum Type from a Product Type.

### Why this Change is difficult to manage {#ptos-difficulty}
Going from Product Type to Sum Type often requires a ton of effort. Using example#2, here are some things that need to change in response:
* Database: Suppose you are using a relational db and have a table for the supported `Fund`s. Data specific to the SDB cannot fit in this table because the properties of a `FundWithPrice` are different from `SDB`; you need to invest time in a solution.
* Application: Your API method `retrieveAccountHoldings` that returns a `list of (fund_id, quantity, today's price)` now has to change to support returning SDB data and the impl has to change to support it. If you have an external API, exposing and versioning this change can be challenging (without good tooling)
* UI: Your UI was previously displaying Account Holdings in a table with three columns: (Fund, Quantity, Price). You now have to rethink that design in the presence of an SDB.

### In Practice {#ptos-practice}
When confronted with this problem, time/resource constraints often prefer a **hacky solution**: Model an SDB as a `Fund` with price = 1 and quantity = amount of money allocated to the SDB! This choice amplifies aging:
* If new columns are added to the `Funds` database table for SDB specific data (yes, this is a hack), over time, it leads to a messy schema and a new SWE cannot look at the db and understand the data model
* Somewhere in the application layer, you probably have a class called `Fund` with a property called `CurrentPrice`. If SDBs are also modeled as instances of `Fund`, code gets very messy very quickly because you don't know whether `CurrentPrice` property can be invoked on a given `Fund` object.
* The UI has similar issues; it needs several if/else statements in the code to show the UI differently for SDBs as compared to other regular `Fund`s. Many if/else statements are a standard recipe for bugs.

There are no great solutions for this problem today. But, one can imagine end-to-end software development environments (i.e. Programming languages, databases & all parts of the stack) having tooling to make moving from Product Types to Sum Types easy. One thing's for sure: with even a small number of such hacks, the codebase is a hot mess.

## 2. Exceeding a dimension's implicit cardinality
> When SWEs model data that 1. Contains sets/lists 2. Is customer-specified, there's often an implicit expectation of the cardinality on those sets/lists. Software ages when these implicit expectations change because customers outgrow the requirements.
{:.block-tip}

### Example {#cardinality-example1}
Suppose you are designing a schema where `entity X has a List of entities of type Y`. Suppose, you design it assuming that `X has around 1000 of Y`. This assumption around 1000 is known widely because `why does anyone ever want more than 1000 Y per X?`. At some point, the product grows and some customer needs X to have 10,000 of Y and so they start creating data using this extra cardinality.

### Why this Change is difficult to manage {#cardinality-difficulty}
There are many problems with cardinality abuse because SWEs will have expressed this implicit knowledge in their choice of the architecture and algorithms.
* Suppose you sharded out compute per `X`; i.e. each `X` is served by one shard. Once there's cardinality abuse of `Y per X`, the shard processing `big X` (i.e X with 10K Y) slows down and that cascades to other `X` being served by the shard. You profile those other slow `X`s and find nothing wrong. And you didn't have a way to know that the `big X` is monopolizing compute and penalizing all the `small X` assigned to its shard!
* With 1000 entries, an O(N^2) algorithm works fine latency wise, but at 10,000 entries it may produce noticeable delays. SWEs would have chosen O(N^2) algorithm because of the conscious assumption that `N <= 1000`. Suddenly, there's a serious problem: what was once a snappy app is no longer snappy. Worse yet, you don't even know that this is the reason until you profile and even if you do and identify it, fixing it may be an expensive project of its own.

In other words, when assumptions underlying the architecture are invalidated, production tends to break in mysterious ways. The violations are often slow and steady causing a gradual, insidiuous deterioration over a period of time. By the time a final violation tips it visibly over the edge, there's not one single thing to blame and often it is just easier to pile on and get more value out of the existing (outdated) architecture rather than redoing it.

### In Practice {#cardinality-practice}
The root cause is that some assumptions (like cardinality) are only ever present in human brains (whoever designed them). The architecture initially reflects these (very good) assumptions but after a few requirement changes that invalidate the assumptions, the architecture is no longer suited to the assumptions. Since they were never recorded explicitly in the codebase in the first place, there's no way to even really know the failure points until a customer abuses a dimension.

It is difficult to imagine self-righting architectures in response to observed cardinalities (outside of some special problem domains like auto-sharding databases) until perhaps AI starts writing all the code and change architectures (and data migrations) on the fly. Until then, in practice, explicitly enforcing the implicit assumptions is a reasonable approach. For example, when writing data to the databases, validate that `N <= 1000`. This way, if a customer wants to bump up N to 10,000, it'll fail and you can talk to the customer to learn their use case.

## 3. Evolutionary Conflations
As we all know, distinct concepts require distinct names and distinct treatment; sometimes, the conflation can creep in very subtly through evolution.
{:.block-tip}

### Example {#conflating-example1}
You have a store where users either 1. order new gifts or 2. reorder previously ordered gifts. You just launched the store & for each order you randomly picked the packaging color (the user didn't get a choice). Suppose Order #10 had Red color packaging. Time progresses and you introduce a settings page where the user can configure a default packaging color.

**Here's the question**: Suppose the user configures Green for default packaging color and proceeds to reorder Order #10. What color packaging will you use - Green or Red? Both answers are feasible
* Red is correct because the user is just reordering a prior Order & expects the same color packaging
* Green is correct because the user configured Green as the default color & did not explicitly specify it in Order #10 (which is being reordered); so, they expect to get the default


### Why this change is difficult to manage {#conflation-difficulty}
The question of Red vs Green for re-orders arises at the time you introduce the default packaging color option. Your database entry of Order #10 probably looks like `Order {id: 10, packaging_color: Red}`. The attribute name `packaging_color` is now conflated: does it represent the shipped packaging color or user specified packaging color? It needs to be de-conflated. All because you introduced a new adjacent notion of _user specified_ packaging color.

To deconflate, you'll need to update Order entries in the database to reflect the reality of Order#10: `Order {id: 10, shipped_packaging_color: Red, user_specified_packaging_color: UNSPECIFIED}`. Depending upon what the Product team decide, you can now support choosing either RED or GREEN for reordering Order#10. 

To summarize, instead of a single concept called `packaging_color`, you now have two similar concepts & the old concept has to be mapped into one of these new concepts. Further, this distinction has to be reflected in every piece of the stack, not just the database, but also the application layer & the UI and also manage compatibility between different layers while doing these changes. This can be a substantial amount of work. For example, apart from renaming & backfilling, you need to look at all uses of `packaging_color` and check that they are all used as if it were `shipped_package_color`. This is a pretty difficult undertaking for any large project with tentacles.

### In Practice {#conflation-inpractice}
In practice, often a hacky solution is adopted: `For reorders, just use the packaging_color attribute of the order being reordered` and `For fresh orders, use the packaging_color attribute for recording the user specified color`. It is easy because it requires no further database changes. Unless the product team has a strong opinion on the topic, RED will likely be the chosen answer, just because it is easy. 

The deconflation may seem unnecessary especially for those already familiar with the product/db schema, but, leaving it out leads to aging:
* It ramps up the learning curve for any SWEs onboarding onto the codebase
  * For example, a new SWE looking at the database does not know what the `packaging_color` is supposed to be: user specified or shipped
* It is restrictive. Deconflation provides more flexibility. Without deconflation,
  * You couldn't support Green as the answer
  * You couldn't model the case where you run out of a particular color and need to use a different one. This fact cannot be adequately captured without separating the shipped and user specified packaging colors

In practice, such conflation occurs often and is subtle. It pays off to be vigilant and invest in tooling to mitigate it.

# Some themes
Some themes can be extracted from the patterns above.
* Implicit assumptions that are present only in human brains
  * For example, cardinality assumptions underlying the architecture
* Lack of tooling for common changes for which hacky solutions don't age well
  * For example, moving from Product type to a Sum type across the stack should be zero-effort
