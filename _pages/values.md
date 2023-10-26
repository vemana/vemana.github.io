---
layout: page
permalink: /values/
header_link_text: values
title: My Values
description: What you can expect when you work with me
nav: false
nav_order: 1
toc:
  beginning: true
---
<hr>
# What this is about

This page is about my value system focused mostly on work. I like to articulate it because:

* Knowing my values, my colleagues, teams or recruits can decide if and how to effectively work with me
    * **Effective leadership** requires clarity, consistency and communication of thought
      * It is crucial for the team to be able to fill in the many unsaid details coherently
      * If a leader is inconsistent in thought, the team fills up the little details incoherently & the whole product suffers
    * **Effective collaboration** requires understanding the value system of the collaborator
      * Different people are just wired different
    * **Effective recruitment** requires a mutual understanding of the value systems of the team and the recruit
      * One-way understanding is more common, but not sufficient for harmony
* **Decision velocity** is positively influenced by well-established, articulated values
  * The holy grail is to get [System-2](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Two_systems) like accuracy operating at System-1 velocity
* **What gets measured gets improved**
  * I get to tweak my values over time to reflect learnings

My approach is to adopt some axioms and let my reactions & decisions be guided by them. Periodically, I re-evaluate the axioms and as they change, so does my behavior with them. Here are some axioms in no particular order. Each of these axioms have been adopted over many years & sometimes a lifetime of experience. In this post, the thrust is to communicate WHAT the axioms are, so I won't belabor the reasons behind adopting them.
{:block-warning}

<hr>
## Axioms related to values & culture
**Incentives drive outcomes**. If you want the best people & their best work, they'll do it for the right incentives. For some, it may be the opportunity to be among other competent folks they respect, for others it may be money & so on.

**Small, focused teams with wide spectrum of skill > large, unfocused teams**. Prime examples include Amundsen's lean, well-researched teams vs Scott's empire thinking in polar expeditions.

**Good teams are HARD to put together and magic can happen with 5 great people in one spot.** Shockley Labs is a prime example - Shockley assembled a team from all over the US to build semiconductors. The team including Bob Noyce and Gordon Moore went on build Silicon Valley. Just like every athletic competence, unusual brainpower appears to be distributed sparsely, randomly & needs constant maintenance. So, putting together a good team is REALLY HARD. But, it is worth working and spending a lot of time towards. Ohh, when you are in a really good team, appreciate the privilege of working with them and enjoy it! It really is rare.

**Experience requires thinking**. Just because one does the same thing for a decade doesn't mean one is an expert. It needs conscious reflection about that effort to improve & learn. The number of experts is far less than the number of people with experience.

**I can never tell what's going on in somebody else's head, so I won't presume to know.**. Life is tough for many people. Many successful humans appear to be driven by ego and they often forget the good fortune of being born in a place with enough security (food, mental, freedom etc.) to let them blossom. As much as I sometimes get annoyed by people not keeping their word, I recognize that by and large people mean well, try their hardest and yet the variance in the world - be it their health, some family situation or otherwise - humbles every one from time to time. It is particularly cruel to label or judge someone with relatively little information of their circumstance.

**One for you, one for the team.** The naturally curious people can get distracted quickly and lose focus. For my team, I use the mantra *one for you, one for the team*: each term, do one thing of highest importance for the team and do one other thing that makes you very excited & satisfies your curiosity. The former is important for the company and the latter is important for your well-being and being productive over the long run.

**Be grateful for what you have.** It can always be MUCH worse. The world has very high variance.

**I see myself as a contributor to the world's knowledge base.** I am aware of only a few unidirectional arrows: entropy one of them. The other - on a sufficiently large time scale - is human knowledge: we know how to do things better tomorrow than today. I find meaning in being a part of that pantheon of humans who've been industrious enough to discover the secrets of mother nature and generous enough to share it with the next generation.

**Say no to intellectual dishonesty.** It's ok to disagree & commit or say *I don't know*. But, I'd challenge willfull intellectual dishonesty. It's never personal, though.

**We never have enough information to make a perfect decision.** And waiting can be good or bad - in elective medical care, waiting can be good & in business context, waiting can be bad. There's still scope for nuanced decision making even when information is scarce.



<hr>
## Axioms related to Software Engineering

**Shipping is not just good business, but also good ethics.** Software is delivered for a purpose. And the sooner that purpose can be served, the better. Imagine making patients wait unnecessarily for a life-saving medicine. That sounds unethical, doesn't it? Now, imagine making customers wait on an important piece of software. Transitively, it has similar effects as making patients wait. Once we connect the dots between shipping & value being delivered to people we'll never hear from, we realize the importance of shipping.

**Writing poor code is unethical.** We teach our kids not to steal others' possessions. Similarly, stealing others' time is also stealing. Writing poor code steals time from developers that follow. Too often, in the name of shipping (see above), the following pattern occurs: (1) Write terrible code (2) Claim impact (3) Get promoted (4) Leave team. The developers that follow end up paying the price of cleaning up the mess. This is unethical behavior & often the person doing it does not even realize they are doing it. In their mind, there is no notion of "terrible code", only code. But, in my mind, this is both unethical behavior and a sign of poor engineering understanding. Incentives need to adjust for this behavior.

**Conflict between clean code & fast shipping is NOT inevitable.** For an early stage startup, it is well-worn advice to just focus on shipping. I agree. When you don't have a business, you don't have code. But, it doesn't have to devolve into a free for all with shaky foundations that cannot be built on top of. Paying attention to writing **ageable code** - that is, code that ages better - can drastrically improve the number of features that can be built without needing to over-hire.

**Software ageability is a first class citizen.** Code should be written to expect change. All successful software requires change. Well-written, well-structured code ages better. Poorly structured code invites patches upon patches. Especially when each person is incentivized to push their own features, there's every reason to build upon a creaky edifice than refactor.

**Clean structure & correctness go hand in hand.** Cleanest code tends also to be the fastest to produce and has much better lifetime costs owing to fewer bugs.

**Distinguish between egregious and acceptable shortcuts.** It is inevitable to need to take shortcuts.

**Thoughtful testing has an EXTREMELY high ROI.** Without a test suite that gives confidence on no-op refactors, code ages very quickly.

**Culture comes from the top.** If your most respected engineer takes short cuts, expect 10x of it from everyone else. So, actions from a position of responsibility matter a lot.

**Basics are a must.** This includes algorithms, hardware performance like caches etc.

**Telemetry is a first class citizen.** What gets measured gets improved. So, no telemetry => no improvements in latency or understanding of user behavior etc.

**Process should be a help, not a burden.** Obvious. But, too often it can become a end-goal in itself with no flexibility because of a prisoner's dilemma situation - if N people follow the process and one person doesn't, the one who doesn't can gain an advantage; so, fairness considerations end up imposing slavery to the process. There's judgment involved in each situation, but my rule of thumb is *Introduce a process only if well-meaning engineers will naturally gravitate towards it.*

**Productivity requires long chunks of time.** Interrupts like meetings kill productivity. So, engineer calendars should never have fragmented meetings. Perhaps best articulated in [Paul Graham's manager vs maker schedule](http://www.paulgraham.com/makersschedule.html).


