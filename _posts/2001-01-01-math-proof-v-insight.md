---
layout: post
title: 'The trouble with math textbooks: Proof yay, insight nay.'
date: 2024-01-01 15:00:00
description: 'Logic & Math must be taught better. An example using Borel Cantelli lemma.'
tags: math-verbal
categories: math
featured: false
published: false
giscus_comments: false
toc:
  beginning: true
---

### What this is about

I think Math - and in general logic too - teaching must really improve. I was compelled to write this post after coming across a textbook proof of a theorem which offered no insight. Worse, the proof appears somewhat magical and students can easily think of it as a cool trick rather than something they can actually reason and arrive at themselves.

At one point of time, I was that student and was even ok with remembering some cool tricks. I was decent at solving problems but knew that I didn't always have insight. Over the years, I've revisisted some topics but focused on insight and so I see math and proofs in a very different light. As an example of this **insight-over-tricks** mentality, see a fruitful reasoning on [this IMO problem](/blog/2024/math-proof-v-insight). Of course, this is not a universal technique and cool tricks have their place, but insight probably trumps tricks. I hope to demonstrate that with this post.

### Problem 

**Borel-Cantelli Lemma #1**: Let $$\mathbb{E}_1, \mathbb{E}_2, ...$$ be events on a probability space such that
$$
\sum_{n=1}^\infty \mathbb{P}(\mathbb{E}_n) \lt \infty.
$$
Then, the probability that an infinite number of events occur is $$0$$.

### The textbook proof

