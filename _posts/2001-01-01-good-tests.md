---
layout: post
title: "Is there an objective way to think about the quality of a test? Yes, indeed."
date: 2023-11-22 15:00:00
description: 
tags: software-testing
categories: software-engineering
featured: false
published: false
giscus_comments: true
toc:
  beginning: true
  sidebar: left
---

# Problem Statement
Every software engineer wants to write good quality tests. But, what is a *good quality* test? 
* Most answers to this question fall in the realm of *opinion*. Even if backed by experience, opinions are just that - they don't have backing in first principle reasoning. 
* Can we offer a more objective standard?

# Yes, we can, to some degree

It turns out, we *can* say something objectively about the quality of a test for certain kinds of tests. In my experience, this tests are the vast majority, but again it's an opinion and YMMV.

So, what makes an objectively good test?
* It follows the **arrange/act/assert** pattern
* It is **not underspecified**
* It is **not overspecified**

There's also a fourth condition. It can help catch more bad tests but at the expense of non-objectivity
* It should be possible to understand the test without scrolling beyond the test body
  * The above are binary conditions, but this is a continuous condition
  * If you must scroll, how many times you need to do so should be minimized
  * This is obviously not objective, but the key is the word *understand* and we shouldn't let perfect be the enemy of the good

## Pedagogical Example

We want an example that has
1. State changes
1. Irrelevant details for certain properties


We'll use the following example to demonstrate tests.

Concepts
* Proposal: Upon creation, it is in DRAFT state
  * Edit Proposal: You can edit a proposal and thereby create a new Draft proposal
  * Approve Draft Proposal: When a draft is Approved, it moves to Approved state and replaces the currently Approved Proposal (if any)
* Publish

## Arrange/Assert/Act

## No Underspecification

## No Overspecification

## No scrolling out of the test body

