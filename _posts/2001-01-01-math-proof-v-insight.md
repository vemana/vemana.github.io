---
layout: post
title: 'Math Proofs: Insight vs Tricks. An example using Borel Cantelli Lemma.'
date: 2024-01-01 15:00:00
description: 'Learning math should be about insights. But textbooks often fall short.'
tags: math-verbal
categories: math
featured: true
published: true
giscus_comments: false
toc:
  beginning: true
_styles: |
  .monospace {font-family: monospace, monospace;}
---

### What this is about

I think Math - and in general logic too - education can really improve on some axes. A thorough analysis of the ills are beyond the scope of this blog. But, I felt compelled to write this post after recently coming across a textbook proof of a theorem. It was cool and elegant, but offered no real insight. Readers can think of it as a cool trick rather than something they can actually reason and arrive at themselves.

Once upon a time, I was that student and accepted remembering cool tricks. I was decent at solving problems but knew that I didn't always have insight and it bugged me. Over the years, I've revisited some topics focused on insight and as a result, I now see math differently (though limited by my relatively modest capabilities). As an example of this **insight-over-tricks** mentality, see a fruitful reasoning on [this IMO problem](/blog/2024/math-fxy-imo2022). Of course, this is not a universal technique and cool tricks have their place, but insight probably trumps tricks. I hope to contribute more weight to that thought with this post.

---
### Problem : The Borel Cantelli Lemma

{:.monospace}
Let $$E_1, E_2, ...$$ be events on a probability space such that
$$
\sum_{n=1}^\infty P(E_n) \lt \infty.
$$
Then, the probability that an infinite number of events occur is $$0$$.

---
### Reminder: Axioms of Probability Spaces
Axioms
1. $$ P (S = \text{entire sample space}) = 1$$ [Full space probability]
1. $$0 \le P(A) \le 1$$ where $$A$$ is a measurable subset of $$S$$. For the purposes of this post, we can safely ignore the adjective 'measurable'
1. If $$E_n, n \ge 1$$ are mutually disjoint events (i.e. $$E_i \cap E_j = \phi$$ for $$i \neq j$$), then $$P(\cup_{n=1}^\infty E_n) = \sum_{n=1}^\infty P(E_n)$$

Corollaries
1. $$A \subseteq B \implies P(A) \le P(B)$$
1. $$ P (\overline A) = 1 - P(A) $$
1. When $$E_i$$ are mutually disjoint, $$P (\cup_{n=1}^k E_n) = \sum_{n=1}^k P(E_n)$$
1. $$  P(\cup_{n=1}^\infty E_n) \leq \sum_{n=1}^\infty P(E_n) $$
1. If $$E_n$$ is a decreasing (or increasing) sequence of events, $$ P(\lim_\limits{n \to \infty} E_n) = \lim_\limits{n \to \infty} P(E_n) $$. Increasing sequence of events means $$E_n \subseteq E_{n+1}$$ and Decreasing sequence of events means $$E_n \supseteq E_{n+1}$$.

---
### Textbook proof
The event `An infinite number of events occur`, $$E_{i.o.}$$ can be expressed as $$\cap_{k=1}^\infty \cup_{n=k}^\infty E_n$$, or equivalently $$\cap_{k=1}^\infty F_k$$, where $$F_k = \cup_{n=k}^\infty E_n$$.

Then,

$$
\begin{align*}
P(E_{i.o.})
& = P(\cap_{k=1}^\infty F_k) \\
& = P(\lim \limits_{k \to \infty} F_k) \text { [since } F_k \supseteq F_{k+1} \text{ ] } \\
& = \lim \limits_{k \to \infty} P(F_k) \text { [by corollary 5] } \\
& = \lim \limits_{k \to \infty} P(\cup_{n=k}^\infty E_n) \text { [by definition] } \\
& \le \lim \limits_{k \to \infty} \sum_{n=k}^\infty P(E_n) \text { [by corollary 4] } \\
& = 0 \text { [since  } \sum_{n=1}^\infty P(E_n) \lt \infty \text{ per problem statement.]}
\end{align*}
$$

---
### My take on the proof

The proof is certainly cool. It uses a neat trick to express the event `infinite number of events occur` as a combination of the primitive events and then follows it up with elegant symbol manipulation. I probably would've liked this proof in my younger days. But, I have a different perspective now. I think it is a missed opportunity to showcase many aspects of scientific inquiry: research and approximations to name a couple.

---
### What I would have liked from the proof

The textbook missed a few opportunities:
* It didn't discuss Corollary 5 in a `what does it really mean?` fashion that Feynman was wont to do 
  * Feynman's explanations of a topic have liberal doses of "what does it really mean?". His [Messenger lectures](https://www.youtube.com/playlist?list=PLS3_1JNX8dEh5YcO-Y05stU0u_T9nqIlF) are a treasure
  * Sure, it seems able to move limits from `P(lim ...)` to `lim P(..)` but what does it really mean?
* It didn't connect the dots between Corollary 5 and the proof

#### What does Corollary 5 really mean?

**Corollary 5**: If $$E_n$$ is a decreasing (or increasing) sequence of events, $$ P(\lim_\limits{n \to \infty} E_n) = \lim_\limits{n \to \infty} P(E_n) $$. Increasing sequence of events means $$E_n \subseteq E_{n+1}$$ and Decreasing sequence of events means $$E_n \supseteq E_{n+1}$$.

On first glance, this looks like a way to move those pesky Limits from inside the $$ P(lim ..) $$ to outside. But, why is that important or useful? Some clever manipulations can use it, but is that really it? How might one even have discovered this rule if it was about finding cute ways of moving limits around ? The search space seems too large. Something seems off. Enter the Plain English Version of Corollary 5 which clarifies it for us.

**Plain English understanding of Corollary 5**: I wish to find the probability of an event `X`. But, I can't directly measure it. So, I am forced to **decompose** it into approximations and then **recompose** the final answer out of the solutions of the decomposed approximations. It works like this:
* Find a series of events that Monotonically Approximate `X`. Call them $$E_1, E_2, E_3, ...$$
  * Each event, $$E_n$$ is an approximation of `X`
  * Monotonically Approximate means that the series of events is monotonically approaching `X` (either from superset or subset side)
    * If $$E_1 \subseteq E_2 \subseteq E_3 ... = X$$, the $$E_n$$ Monotonically Approximate $$X$$.
    * If $$F_1 \supseteq F_2 \supseteq F_3 ... = X$$, the $$F_n$$ Monotonically Approximate $$X$$.
    * If $$G_1 \supset G_2 \subset G_3 \supset G_4 \subset G_5 ... = X$$, the $$G_n$$ Approximate $$X$$ but don't Monotonically Approximate $$X$$
* Corollary 5 then guarantees that the probability of Monotonically Approximate events of `X` Monotonically Approximates the probability of `X`
  * Monotonically Approximates the probability of `X` means that I get a series of monotonic approximations of $$P(X)$$
  * If $$a_1 \le a_2 \le a_3 \le ... = P(X)$$, the $$a_n$$ Monotonically Appproximate $$P(X)$$
  * If $$b_1 \ge b_2 \ge b_3 \ge ... = P(X)$$, the $$b_n$$ Monotonically Appproximate $$P(X)$$
  * If $$c_1 > c_2 < c_3 > c_4 < c_5... = P(X)$$, the $$c_n$$ Appproximate $$P(X)$$ but don't Monotonically Approximate $$P(X)$$
* Monotonic approximations are better than non-monotonic approximations in that the approximation is always increasing in quality
  * The higher the number of the event - $$E_{10} \text{ vs } E_9$$ for example - the higher quality its approximation is
  * If I am running a computation for the approximation, I can increase the number of iterations and get a better approximation; but, for non-monotonic approximations, increasing the number of iterations could produce a temporarily poor approximation

{:.block-tip}
> Corollary 5: The probability of Monotonically Approximate events of `X` Monotonically Approximates the probability of `X`.
> <br>
> <br>
> That is, Corollary 5 reduces the task of estimating the probability of a not-directly-measurable event `X` to finding increasingly accurate approximations of `X` that are more readily measurable.

Corollary 5 solves the problem by decomposing and then re-composing. This is a VERY common theme in mathematics. For example,
* Area under a curve = limit of Area of rectangular tilings that approximate it
  * Decompose into rectangular tilings and Recompose using limits
* Expected value of a continuous random variable = limit of Expected Value of discrete random variables that approximate it
  * Decompose into finite-valued Random variables and Recompose using limits

It is also a very common theme in software engineering. How does a computer draw a polygon? It breaks it down into lines, which it further breaks down into a list of pixels and corresponding brightness values. I've written about this theme at length in [ABIYZ pattern](/blog/2023/abiyz-intro).

#### Turning our understanding of Corollary 5 into a proof

Borel Cantelli Lemma wants to estimate the not-directly-measurable event: An infinite of $$E_n$$ occurs.

How can we estimate it? Let's use Corollary 5 and try to find monotonic approximations of `X`. 

How do we monotonically approximate $$E_{i.o}$$ where i.o stands for "infinitely often"? We can do this in two ways (no less), but let me show the more natural approach.

**Approach**. Negate $$E_{i.o}$$ and approximate $$E_{f.o}$$ = Finite number of occurrences of $$E_n$$.

What's the definining characteristic of 'finite' occurences of $$E_n$$ ? It is that there's a max $$n$$ such that $$E_n$$ occurs (or no event occurs at all). So, let's define $$F_k$$, our kth approximation of $$E_{f.o}$$ as $$F_k$$ = event that last occurring $$E_n$$ is $$E_k$$. We quickly realize that $$F_k$$ is not increasing, that is, it is not necessarily the case that $$F_{k+1} \supseteq F_k$$. So, we define $$G_k, k \ge 1$$ = event that the last occurence of $$E_n$$ satisfies $$n < k$$. This turns $$G_k$$ into a Monotonic Approximation of $$E_{f.o}$$. We use strict inequality $$n < k$$ to consider the case that none of the events occur at all, that is something like $$F_0$$. The remaining question is whether $$P(G_k)$$ is estimatable. Indeed it is: 

$$
\begin{align*}
P(G_k)
& = 1 - P(E_k \cup E_{k+1} \cup E_{k+2} \cup ...) \\
& > 1 - \sum_{n=k}^\infty P(E_n) \\
& > 1 - \epsilon \text{ [for arbitrarily small, positive } \epsilon \text { as } k \to \infty  \text { since the series sum of } P(E_i) \text{ converges]} \\
& = 1 \text { as } k \to \infty
\end{align*}
$$

This completes the proof since $$E_{i.o} = 1 - E_{f.o} = 0$$ as required.

I believe this approach demonstrates the superiority of the insight-over-tricks approach. We arrive at a proof from logical questions instead of first plucking a magical expression (for $$E_{i.o}$$ here) out of thin air and then performing tricky manipulations. Not just that, the fact that I managed to go through this entire argument in my head (not humblebragging, just a serious observation) while I'd be challenged to follow the textbook proof unless I wrote it down and stared at it for a bit is also a strong argument for the insights-first camp.

---
### Math history is important too

One of the conscious things I've done when revisiting math topics more than a decade after school is to cast the main results in plain English. Often, there'd be a strong correlation with a purpose for which the result was discovered. I read a few math history books out of curiosity and it left a strong impression that new math arises out of need and not out of a vacuum. Several inventions like Calculus, Complex Numbers and Probability came out of some canonical problems that were hitherto unsolvable. Bearing this in mind is extremely useful in following math texts because if one can associate a theorem with its purpose, it sticks much better.

Some math history books I can recommend
* Story of sqrt(-1) by Paul Nahin
* Gamma by Paul Nahin
* Calculus Gallery
* Infinite Powers
* Calculus Reordered
* A history of Vector Analysis

---
### Key Takeways

* Math shares main themes with other scientific areas
  * Example: To solve a difficult problem, Decompose the problem into smaller pieces and Recompose the solution from solutions of the smaller pieces
  * Example: Software engineering uses Decompose/Recompose as perhaps its main workhorse. For a rudimentary example, think Merge sort.
  * Many theorems come about from a vexing problem in the development of the subject; they don't develop in a vaccum
* Math is often taught as a sequence of Axioms, Theorems & Proofs
  * This misses the opportunity to really showcase math as human innovation for solving hitherto intractable problems or reducing tedium of existing solutions
  * It doesn't enlighten the bridge between problem solving techniques like Decompose/Recompose and particular proofs
* Where textooks don't do justice, students would do well to
  * Understand the motivation for discovering the theorems in the first place. They were not investigated in a vacuum and often have some motivation
  * Recognize the Decomposition and Recomposition pattern. This is pervasive in all of science. Once recognized, it sticks better and is more recall-able
  * Attempt to express theorems in plain English to understand `what do they really mean?`
