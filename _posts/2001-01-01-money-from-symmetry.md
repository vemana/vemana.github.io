---
layout: post
title: What is Money and where does it come from? An answer from symmetry.
date: 2023-10-19 15:00:00
description: Demanding a symmetric explanation offers insight.
tags: symmetry
categories: finance
featured: false
giscus_comments: true
toc:
  beginning: true
  sidebar: left
_styles: >
 .red-text {
   color: red;
 }
---

# Introduction

Ever wondered what money is and where it comes from? 
* This question bugged me for years until symmetry came to the rescue
* This post chronicles the thought process behind arriving at a satisfactory answer
* The secret lay in posing a simpler, concrete question and attempting to answer it

<hr>

# A strawman that wasn't

How to answer a daunting, nebulous question like *what is money?* 
* It helps to ask a simpler, concrete question and try to answer it
* My concrete question was
    > What happens when the bank lends John Doe money for a mortgage?
    {: .block-warning}
    
* This question turned out to be both deceptively difficult and incredibly insightful.

If you poll a few people, arguments often proceed like this:

|Argument|Counter argument|
|:--|:--|
||What happens when the bank lends money to John Doe for a mortgage?|
|The bank has money and gave it to John in exchange for interest payments.|Where did the bank get that money?|
|Why, it came from deposits like salaries|Where did the money for salaries come from?|
|Why, that comes from company revenues|Where did the company get those revenues from?|
|Why, that comes from consumers | Where did consumers get that money from?|
|Why, that comes from company revenues| See the circularity?|
|What's the problem? Circularity is fine | Circularity cannot explain the origin of the 'first' money.|
|So? | This explanation is unsatisfactory..|
|You overthink things..| Uhh? No. I don't accept unsatisfactory explanations|

I am not willing to accept that somehow this circularity works itself out; for one thing it doesn't explain the origin of the 'first' money. So, there has to be a better explanation.

<hr>

## Breaking circularity using Symmetry

The root of the circular argument appears to be the asymmetric nature of the mortgage transaction. Pay attention to how we describe it: `The bank gave John money`. This is an [asymmetric relation](https://en.wikipedia.org/wiki/Asymmetric_relation) because if we swap the bank and John, the statement would no longer be true `John gave the bank money`.

This observation prompts the key question: 
>How can we describe the mortgage transaction as a Symmetric relationship; that is, if we swap the Bank and John, the description should still be true ?
{:.block-warning}

My first attempt at answering this also turned out to be insightful.
>The bank and John enter a contract. Alternatively, John and the Bank owe each other something.
><br> 
><br> 
>Note how the statement is symmetric. Swapping bank and John in the statement doesn't change it!
{:.block-tip}

That's symmetric alright. But, what do they owe each other? This line of inquiry proved productive.

<hr>

## Liabilities, Contracts and Assets

The symmetric answer can be simply restated as: **In any transaction like the mortgage, the two parties are exchanging obligations.**. 

Upon some reflection, we can arrive at the following insights, which we'll explore in this section:
* Everyone can create/make a promise aka obligation
  * Liability is just another name for this promise
  * Liability is the most primitive economic unit in any society. It costs nothing to make a promise - the trouble is finding someone to accept your promise! 
* Two parties can decide to accept each other's Liability
  * This exchange of liabilities is a Contract
  * Economy runs on Contracts
* One party's liability is the other party's asset
  * All your assets are somebody's liabilities!
  * This may be surprising, but it really is so! Some liabilities have such low performance risk we don't even contemplate non-performance
<hr>

### Common Liabilities
With this in mind, we are ready to probe some standard liabilities we encounter. For each liability, we should be able to ask: 
* Who is the liability issuer?
* What does that liability promise?
* Is there a risk of non-performance? 

Liability|Issuer|Liability of the issuer|Non-performance Risk
:---|:---|:---|:---
US Govt. bond| US Treasury | A US Govt. bond pays interest & principal to the holder at a pre-determined schedule| Missed payments and/or principal.
US Dollar | Federal Reserve (Fed)| If you present 10$, Fed promises to give you 2x5$ (as funny as it sounds). The other implicit obligation is that the US Govt. accepts it as legal tender for tax payments. So, in that sense, it is a co-liability between the Fed & the Treasury. Other than that, there's nothing that the Fed promises on its US$ liability to a good approximation. They can print more of it with relatively little interference. | The Fed itself can always perform (exchanging 10$ for 2x5$), but US Treasury may accept a competing legal tender, can abolish taxes reducing need for US$ etc
Apple Stock| Apple Corporation |Apple corp promises to share dividends equally across all equity holders & guarantees equal voting rights. Note: There's no promise that any dividends will be paid - it only legally guarantees equal share in dividends and voting.| Unlikely, but legal changes may allow Apple Corporation to discrimnate between equity holders, preferentially paying dividends to only a few, for e.g.
Apple Corporate Bond| Apple Corporation | Similar to any bond: Apple Corp promises to pay interest & principal at a predetermined schedule.| Missed payments and/or principal
Chair| Chair manufacturer | The chair allows you to sit on it for some number of years. | Chair doesn't work as advertised or breaks down quickly etc.
Gold|Mother nature|It's chemical properties of conductivity & inertness will be maintained through millennia; new Gold can only be synthesised in supernovae, etc. There's no guarantee from mother nature that Gold will be valued at a certain US$ price or higher over time. That is a human group-think phenomenon. | This is a tricky one. Gold's properties are not directly guaranteed by mother nature (we can't sue her!), but reflect our current understanding. It is entirely possible that humans misunderstood mother nature and discover later on that Gold has a half life and /or can be synthesized in lab, both of which will erode some of its important properties
Bitcoin|Bitcoin Network|A mined bitcoin will be perpetually verifiable and new bitcoins will only be issued using an algorithm.| Similar to gold, there's no party to sue. It is entirely possible that the mining network suffers a Byzantine attack.
Laws of Physics|Mother nature|The Laws of physics work similarly everywhere | It is possible that humans understand some laws incorrectly; that is a human fault not really mother nature's. But this is also a sort of co-liability: humans try to understand mother nature's rules with the expectation that such rules indeed exist.
Checking account at JPM|JP Morgan Bank|On demand, you can withdraw US$ upto your account limit| JPM does not let you withdraw US$ on demand
Checking account at BofA|BofA|On demand, you can withdraw US$ upto your account limit| BofA does not let you withdraw US$ on demand

> **Note**: US$ is still Fed's liability. JPM cannot print it. So, when John Doe withdraws US$ from a checking account, JPM has to fetch the US$ from the Fed to give it to John Doe. JPM's checking account merely promises that on-demand it will be able to obtain those US$. It is entirely possible that JPM fails to honor this promise. So, 100$ in JPM checking account is not the same thing as 100$ in BofA checking account. All you have in the checking account is the respective banks' promises and NOT US$.
{:.block-warning}

> **Note**: ALL liabilities carry a non-performance risk. In some cases like a Chair or a Checking Account, it is easy to imagine non-performance. In other cases like US$, it is harder to imagine, but a non-performance risk absolutely exists.
{:.block-warning}

We colloquially say **printing** when an Issuer issues liabilities. For example, Apple can print more stock and dilute existing stock. Similarly, the Fed can print more US$ and dilute the existing US$.
<hr>

### Contracts: Exchange of Liabilities
Contracts are just an exchange of liabilities. Typically there are two parties. Some examples to illustrate.

|Contract|Party 1 & Obligation | Party 2 & Obligation|
|:---|:---|:---|
|$1M Mortgage between JPM and John Doe|JPM promises to increase John Doe's checking account by $1M| John Doe promises to pay interest & principal per agreement.|
|Aging parent & child (provocative to showcase the nature of contracts)|Parent promises to bequeath wealth upon passing.| Child promises to take care of parent in advanced years.|

<hr>

### Assets: Somebody's liabilities
A contract is simply an exchange of liabilities. However, it creates both an asset and liability for both parties. In fact, **all assets are somebody's liabilities**.

Consider the $1M mortgage example

|Party|Liability|Asset|
|:---|:---|:---|
|JP Morgan| Increment John Doe's checking account by $1M | John Doe's future interest & principal payments |
|John Doe | Future interest & principal payments | $1M in Checking account |

As you can see, the contract confers both an asset and a liability to both parties. This is the basis of double-entry book-keeping.
<hr>

## No more circularity

The fundamental unit of the economy is contracts. Something as simple as buying a chair involves a contract. John Doe sends US$ (Fed's liability) and the manufacturer sends the chair (manufacturer's liability) with a promise that it will work as advertised. If the chair doesn't, it perhaps comes with a warranty which is analogous to credit risk in a bond. 

Most money is just bank credit & it gets created by a bank on demand. For example, when John buys a chair using his credit card, JPM simply creates a liability for John and credits the chair manufacturer's checking account. No US$ is involved at all.

There's a bit more to this story, including what happens when the chair manufacturer's account is in BofA & John's card is JPM - it does involve transferring US$ (so called reserves) from JPM to BofA but in the background.

> The economy is NOT dependent on a circular rotation of some limited resource called money, but it progresses via a SEQUENCE of contracts. There's no confusion on how money's circulating - it is not going round & round; it is just being created freshly. New contracts (e.g. credit) may be created to service old contracts. 
{:.block-tip}

## Illustration: Treasury Transfer payments

What happens when the Treasury makes transfer payments (i.e. free distributions) to citizens? To a good approximation, this is what happens
* The Treasury holds its checking account with the Fed. It's called TGA (Treasury General Account)
* Treasury instructs the Fed to transfer $1000 from its TGA to JPM for the benefit of John Doe
* Fed transfers $1000 from TGA to JPM
* JPM credits $1000 to John Doe's checking account

You may have noticed that there are a bunch of uni-directional transfers which contradicts our insistence that each Contract (or Transaction) is an exchange of Liabilities! It turns out that our theory correctly predicts the existence of offsetting liabilities. So, I depict each transaction as an exchange of liabilities. The *fictional* Goodwill liability of John Doe is quite a standard accounting entity.

> Note: This is an approximation to help our understanding. The actual balance sheet entries are likely different.
{:.block-danger}

{% include figure.html path="assets/img/Treasury-Transfer-to-John-Doe-Balance-sheet-impact.svg" class="img-fluid rounded z-depth-1" zoomable=true %}

<hr>

# So, what's Money?
After that understanding of contracts & liabilities, we can now answer what Money is.

> To a good approximation, 
> * Money just includes a subset of liabilities of banks and the Federal Reserve
> * Banks & Fed are special institutions: Banks create new deposit liabilities via loans and Federal Reserve creates US$ liabilities
> * There are different measures of money, M1, M2 etc and they each pick a different subset of bank & Fed liabilities to include. The details are not important for us right now. 
{: .block-tip}

Even though banks are special in terms of regulation, banking itself is not. Setting aside regulations, 
* John Doe can maintain his own ledger of checking accounts like a bank if enough customers believe in his ability to on-demand pay them
* John Doe can also issue loans (again, just a matter of keeping accounts) if enough people believe in his ability to on-demand pay their checking accounts
* Banks just happen to be certified institutions and operate under important constraints on how many loans they can dole out among others.

<hr>

# FAQ

## Can we say that the Fed is the origin of money since it can print US$ without much restriction?
No. Economies existed long before the Fed and long before banks (barter system). A barter era contract might've looked like: `I promise to receive 1 bag of rice an year from now and deliver 1/2 bag of sugar 6 months from now`.

One might ask, how can someone confidently make a contract to produce rice - where does this rice come from? The rice producer is bartering with the sugar producer on the one side, but on the other side is entering a contract with mother nature. Mother nature's liability is to produce rice while the farmer's liability is to work the land in a certain way (i.e. rice farming) that she dictates.

## What was bank operation like, pre Fed?

Pre-Fed, to a decent approximation, Gold was the only money. Everything else was credit. The distinction was very clear and showed in bank operations.

In that era, a typical bank may have had
* Assets of 100 ozs. 10 ozs of gold  + 90 ozs worth of mortgages
* Liabilities of 100 ozs of deposits
* Note: Gold is measured in ozs (no US$ here)

If even a small % of outstanding credit defaults, depositors can lose all their money. Suppose this bank loses 20 ozs worth of mortgages, its balance sheet becomes
* Assets: 10 oz. of gold + 70 ozs worth of mortgages
* Liabliities: 100 ozs of deposits
* So, there's no way this bank can make whole on the deposits
* <span class='red-text'>This causes a bank run</span> and frequent bank runs were a feature of the pre-Fed era

If you wanted to transfer 1 oz. of Gold (i.e. money) from your account in bank A to your account in bank Z, the process would be roughly:
* Bank A deducts 1 oz. from your account
* Bank A physically sends 1 oz. to bank Z at the end of the day to credit to your account
* <span class='red-text'>So, a physical transfer of Gold was necessary to move money between accounts</span>

> Very important note: This system of Gold as money worked on the fundamental idea that Gold was scarce & could not be created.
{:.block-warning}

## Fed creation

To a decent approximation, Fed was created as literally a big pile of Gold, a Reserve of Gold
* To lend Gold as a last resort in a panic bank run situation
* Once the panic subsides, the bank can pay back the Fed
* This Gold is also known as Reserve, the same term we use for (not backed by Gold) today

US$
* The Fed issued the `US$`, also called the `Federal Reserve Note` (Note: A `Note` is just a promise) 
* It was backed by the Gold they had in Reserve
* 1 US$ could be presented at the Fed and redeemed for 1 oz. of Gold
* Being paper, it was easier to carry around than Gold
* It replaced all the other `Bank Notes`
  * Previously, each Bank would issue their own `Note` as a form of currency
  * So, there were many different Bank Notes in society
  * If a bank was in trouble, no body would accept that bank note at full value

Bank Gold transfers moved to a hub & spoke model.You can think of it as:
* Each bank has an account at the Fed, called the Reserve Account
* The Reserve Account holds Gold
* Instead of Bank A sending physical Gold to Bank Z, the Fed deducts from Reserve Account of A and credits it to B. No physical gold needs to move

## Gold standard relics

Mission Creep. A typical strategy for all business goes like this:
* Somehow gain customers
* Become a monopoly
* Wait until customers are used to your product, other competitors almost non-existent
* Raise prices

The same thing happened with the Federal Reserve and the US$. To a decent approximation,
* The US$ replaced all individual Bank Notes
* It was first promised as 1 US$ == 1 oz. of Gold but in 1933, the Govt. devalued it so that 1 US$ = 0.03 oz. of Gold (`1/35` to be precise)
* You could still redeem US$ for Gold, but at this reduced price
* In 1971, the tie between US$ and Gold was completely severed. You could no longer exchange US$ for Gold
* So, the  Govt. (technically the Fed) can now print US$ as much as it wants and raise prices on citizens
* Seems similar to the monopoly playbook?

Today, transferring from Bank A to Z works similarly except 
* The Reserve Account is no longer Gold, it is an ethereal thing called US$ (or a Fed liability)
* Crucially, there is no more Gold and the Fed can print its replacement

Many people still talk about US Govt. debt as being repaid
* They mean it in a Gold standard sense. You loan 100 oz.s to Govt & you expect to get paid the 100 ozs
* But, in a world with freely printable reserves, it works differently
  * The Govt. borrows 100 US$ today and promises to pay it back next year
  * If it can't pay, it will borrow more and repay using the boroowed funds
  * If private citizens don't want to lend to Govt., it can (indirectly) compell the Fed to print US$ and lend. This process is called Quantitative Easing
  * So, the US Govt. can literally pay all its debts back; the only cost is inflation
  * You will get your 100 US$ next year, just that it won't buy as much as 100$ this year

> There are some important nuances that I left out. The Fed is ostensibly an independent entity but the US President nominates the Fed Chairman of the Board of Governors. They can choose not to print US$ to lend to the Govt, but it will typically end up violating their dual mandate: Stable Employment and Stable prices. So, when the Govt. gets into trouble with debt repayment, employment gets into trouble as well and the Fed will end up cheapening the currency to turn the economy back (per their dual mandate); they cheapen it typically by reducing interest rates or by outright Quantitate Easing.
{:.block-warning}

## What is the contract between the banks and the Fed?
There is no natural reason for the Fed and Banks to be tied together. But, they are today because of current and historical regulations. There's a lot of detail here but that's not relevant for this post.

# Outro

Phew, that was a lot. This section starts with a recap and concludes with some takeaways and follow-up questions.

## Recap

A quick recap of the entire thought process from beginning to end
* I started with the question `What is money?`
* To make progress, I asked a strawman question `What happens when John Doe takes a mortgage?`
* Even after more than an year of pondering on and off, I couldn't answer the strawman convincingly
* Eventually, I added a constraint: any answer to this question must be symmetric in John & Bank - swapping them should not change the answer
* As it turned out, this symmetry constraint unlocked the whole mystery & within a matter of an hour, the primary concepts all became clear

> ## Takeaways
> 
> * A Liability is just a promise - everybody can create one, but it acquires value only when it can be exchanged for another liability. This exchange of Liabilities is a Contract.
>   * For every liability, there is a clear **Issuer** and a clear definition of what the liability entails
>   * US$ is the Fed's liability, not the US Govt.'s. Fed is ostensibly an independent entity distinct the US Govt
>   * It just so happens that most human contracts (like mortagages) are written in US$; they could also be written in any other liability, like Gold, Bitcoin or JPM Checking Account etc.
> * Your assets are always somebody else's liabilities
>   * 100 US$ in JPM checking account is not the same as 100 US$ in BofA checking account - they are both liabilities of the respective banks
>   * Human knowledge of natural sciences is a fantastic asset because it is mother nature's liability which she honors in eternity with close to 0 performance risk. Most human contracts are very limited in their time. There's a risk that humans misunderstood the liability (for e.g. Newton's laws are inaccurate), but that is not mother nature's responsibility
> * Democracy and mass bankruptcy are incompatible
>    * When a large pct of population is unable to honor their contracts (like mortages), Democracy votes (indirectly) for reducing the contract burden
>    * Since most contracts are written in US$, cheapening US$ makes it easier to honor the contract
>    * Naturally, all Democratic Fiat currencies tend to 0 over time
>    * Since they cannot be cheapened on demand, hard currencies like Gold & Bitcoin can force massive bankruptcies & recessions; this appears to be the lived history on the Gold standard.
{: .block-tip}

## Follow-up questions
Armed with this knowledge, we can ask a bunch of follow-up questions. We can offer very reasonable answers to these questions but they are posts in their own right.
* What is a good economy?
  * Hint: One that's confidently entering a lot of contracts!
* Is bitcoin better than US$ for the economy?
  * Hint: Does it help enter more contracts? What happens during a recession - is it good or bad that Fed can print US$?
* What is Quantitave Easing?
  * Is it a good or bad experiment? Hint: QE involves Fed printing US$ and buying US Treasuries and private citizen Mortgage obligations.
* Why do most people still talk about money in "lender/receiver" terms when there's just a contract?
  * Hint: It is a relic of the Gold standard. Gold was the only money at some point and a loan amounted to transferring Gold from the bank to the person.
* Will a Govt. ever pay back its debt?
  * Hint: No, not in the way a Gold based debt would need to be paid back.
* What do analysts mean when they say `cash on the sidelines`?
  * Hint: this is an oxymoron!
