---
layout: post
title: 'Hardware Memory Models: 10 Minute Mental Model'
date: 2023-12-25 15:00:00
description:
tags: software-concurrency
categories: software-engineering 10-minute-mental-models
featured: false
published: false
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


get(key) and set(key, value) APIs are not sufficient. get(key, timestamp) and set(key, value):timestamp are needed
Now, clients have the burden of passing timestamps with every call
Alex calls Berkeley, but what timestamp should Berkeley use ? This is external synchronization. What if sufficient time passes ? Why should Berkeley stil use the timestamp?
