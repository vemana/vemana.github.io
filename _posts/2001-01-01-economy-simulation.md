---
layout: post
title: "A simple simulation of the economy."
date: 2023-10-20 15:00:00
description: Simulation using learnings from the 'What is Money?' post.
tags: simulation
categories: finance
featured: false
giscus_comments: true
published: false
toc:
  beginning: true
  sidebar: left
---

# Problem Statement

Given our learnings from [Money-From-Symmetry]({{ '/blog/2023/money-from-symmetry' | relative_url }}), it would be interesting to do a barebones simulation of the economy.

<iframe src="{{ '/assets/plotly/finance-simulation.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>

# Simulation

To simulate, we'll need concrete notions of
* Global State
* Global State evolution

Simulation Outline
* Proceeds in steps
* In each step, Global State evolves
* Global State is defined as the collection of outstanding Contracts
* In each step, Contracts are originated and exchanged

So, for every Contract, at each simulation step:
* Decide the shape of the Contract profile (i.e. Quantity Price graph; Price measured in some common yardstick like say USD)
* Exchange the contracts in a market style clearing operation

# Contracts
