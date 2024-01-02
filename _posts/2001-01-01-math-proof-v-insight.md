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
_styles: |
  .monospace {font-family: monospace, monospace;}
---

### What this is about

I think Math - and in general logic too - education can really improve. I felt compelled to write this post after recently coming across a textbook proof of a theorem. It was cool and elegant, but offered no real insight. Readers can think of it as a cool trick rather than something they can actually reason and arrive at themselves.

Once upon a time, I was that student and was even ok with remembering some cool tricks. I was decent at solving problems but knew that I didn't always have insight. Over the years, I've revisited some topics focused on insight and I see math in a very different light. As an example of this **insight-over-tricks** mentality, see a fruitful reasoning on [this IMO problem](/blog/2024/math-proof-v-insight). Of course, this is not a universal technique and cool tricks have their place, but insight probably trumps tricks. I hope to contribute more weight to that thought with this post.

### Problem 

{:.monospace}
Borel-Cantelli Lemma: Let $$E_1, E_2, ...$$ be events on a probability space such that
$$
\sum_{n=1}^\infty P(E_n) \lt \infty.
$$
Then, the probability that an infinite number of events occur is $$0$$.

### Reminder: Axioms of probability
Axioms
1. $$ P (S = \text{entire sample space}) = 1$$ [Full space probability]
1. $$0 \le P(A) \le 1$$ where $$A$$ is a measurable subset of $$S$$. For the purposes of this post, we can safely ignore the adjective 'measurable'
1. If $$E_n, n \ge 1$$ are mutually disjoint events (i.e. $$E_i \cap E_j = \phi$$ for $$i \neq j$$), then $$P(\cup_{n=1}^\infty E_n) = \sum_{n=1}^\infty P(E_n)$$

Corollaries
1. $$A \subseteq B \implies P(A) \le P(B)$$
1. $$ P (\overline A) = 1 - P(A) $$
1. When $$E_i$$ are mutually disjoint, $$P (\cup_{n=1}^k E_n) = \sum_{n=1}^k P(E_n)$$
1. $$  P(\cup_{n=1}^\infty E_n) \leq \sum_{n=1}^\infty P(E_n) $$
1. If $$E_n$$ is a decreasing (or increasing) sequence of events, $$ P(\lim_\limits{n \to \infty} E_n) = \lim_\limits{n \to \infty} P(E_n) $$

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

### My take on the proof

The proof is certainly cool. It uses a neat trick to express the event `infinite number of events occur` as a combination of the primitive events and then follows it up with elegant symbol manipulation. I probably would've liked this proof in my younger days. But, I have a different perspective now. I think it is a missed opportunity to showcase many aspects of scientific inquiry: research and approximations to name a couple.

### My approach

When I saw the lemma statement, I wanted to prove it myself first before looking at the textbook proof. I could recall all through Corollary 4 from memory (it's been a while!), but Corollary #5 stood out. It wasn't immediately obvious what it was saying, but 


### Key Takeways

* Understand the problems for which the theorems were discovered. They are not investigated in a vacuum and often have some motivation.
* A lot of applied math is about increasingly accurate estimation of unknowns. Limits are the most common.
