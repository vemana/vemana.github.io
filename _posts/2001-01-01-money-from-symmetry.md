---
layout: post
title: What is Money? An answer from symmetry.
date: 2023-10-19 15:00:00
description: Where does money come from? How to understand it? A surprising answer comes from symmetry.
tags: symmetry
categories: finance
featured: true
toc:
  beginning: true
  sidebar: left
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
    {: .block-danger}
    
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

## Breaking the circularity using Symmetry

The root of the circular argument is the asymmetric nature of the mortgage transaction. Pay attention to the wording: "The bank **gave** John Doe money.". This is an asymmetric relation. As long as there's a giver and a taker, we'll continue to run into circular arguments.

This observation prompts the key question: 
<blockquote>How can we describe the mortgage transaction using symmetric wording? That is, there's no longer a money lender & money receiver. </blockquote> 

My first attempt was quite simple and also turns out to be satisfactory.
<blockquote>The bank and John enter a contract. A contract imposes an obligation - aka liability - on both parties.</blockquote>

That's symmetric alright. But, what is the contract here and what is the obligation on each party?

<hr>

## Contracts: Assets and Liabilities

A two-party contract imposes liabilities on both the parties. This brings us to two key realizations
* Everyone can promise a liability. But, it is useless until there's a contract to exchange it with some other liability - this exchange of liabilities defines the contract.
* All your assets are somebody's liabilities
<hr>

### Common Liabilities
With this in mind, we are ready to probe some standard liabilities we encounter. For each liability, we should be able to ask: **Who is the liability issuer & what does that liability promise?**. For example, we can ask **Who issues the US$ liability and what do they promise to the holder?**

|Liability|Issuer|Liability of the issuer|
|:---|:---|:---|
|US Govt. bond| US Treasury | A US Govt. bond pays interest & principal to the holder at a pre-determined schedule|
|US Dollar | Federal Reserve (Fed)| If you present 10$, Fed promises to give you 2x5$ (as funny as it sounds). The other implicit obligation is that the US Govt. accepts it as legal tender for tax payments. Other than that, there's nothing that the Fed promises on its US$ liability to a good approximation. They can print more of it with relatively little interference. |
|Apple Stock| Apple Corporation |Apple corp promises to share dividends equally across all equity holders & guarantees equal voting rights. Note: There's no promise that any dividends will be paid - it only legally guarantees equal share in dividends and voting.|
|Apple Corporate Bond| Apple Corporation | Similar to any bond: Apple Corp promises to pay interest & principal at a predetermined schedule.|
|Chair| Chair manufacturer | The chair allows you to sit on it for some number of years. |
|Gold|Mother nature|It's chemical properties of inertness will be maintained through millennia. There's no guarantee from mother nature that Gold will be valued at a certain US$ price or higher over time.|
|Bitcoin|Bitcoin Network|A mined bitcoin will be perpetually verifiable and new bitcoins will only be issued using an algorithm.|
|Laws of Physics|Mother nature|The Laws of physics work similarly everywhere. It is possible that humans understand some laws incorrectly; that is a human fault.|
|Checking account at JPM|JP Morgan Bank|On demand, you can withdraw US$ upto your account limit|
|Checking account at BofA|BofA|On demand, you can withdraw US$ upto your account limit|

> Note: US$ is still Fed's liability. JPM cannot print it. So, when John Doe withdraws US$ from a checking account, JPM has to fetch the US$ from the Fed to give it to John Doe. JPM's checking account merely promises that on-demand it will be able to obtain those US$. It is entirely possible that JPM fails to honor this promise. So, 100$ in JPM checking account is not the same thing as 100$ in BofA checking account. All you have in the checking account is the respective banks' promises and NOT US$.

We colloquially say **printing** when an Issuer issues liabilities. For example, Apple can print more stock and dilute existing stock. Similarly, the Fed can print more US$ and dilute the existing US$.
<hr>

### Common Contracts
Contracts are just an exchange of liabilities. Typically there are two parties. Some examples to illustrate.

|Contract|Party 1 & Obligation | Party 2 & Obligation|
|:---|:---|:---|
|$1M Mortgage between JPM and John Doe|JPM promises to increase John Doe's checking account by $1M| John Doe promises to pay interest & principal per agreement.|
|Aging parent & child (provocative to showcase the nature of contracts)|Parent promises to bequeath wealth upon passing.| Child promises to take care of parent in advanced years.|

<hr>

### Your assets are somebody's liabilities
A contract is simply an exchange of liabilities. But, it creates both an asset and liability. Let's take the mortgage example.

Consider the $1M exchange

|Party|Liability|Asset|
|:---|:---|:---|
|JP Morgan| Increment John Doe's checking account by $1M | John Doe's future interest & principal payments |
|John Doe | Future interest & principal payments | $1M in Checking account |

As you can see, the contract confers both an asset and a liability to both parties. This is the basis of double-entry book-keeping.
<hr>

## No more circularity

The fundamental unit of the economy is contracts. Something as simple as buying a chair involves a contract. John Doe sends US$ (Fed's liability) and the manufacturer sends the chair (manufacturer's liability) with a promise that it will work as advertised. If the chair doesn't, it perhaps comes with a warranty which is analogous to credit risk in a bond. 

To simplify, the 'first money' - the US$ - is created by the Fed as its liability. Most money is just bank credit & it gets created by a bank on demand. For example, when John buys a chair using his credit card, JPM simply creates a liability for John and credits the chair manufacturer's checking account. No US$ is involved at all. So, there's no notion of circularity anymore. There's no confusion on how money's circulating - it is not going round & round; it is just being created freshly. There's a bit more to this story, including what happens when the chair manufacturer's account is in BofA & John's card is JPM - it does involve transferring US$ (so called reserves) from JPM to BofA but in the background.

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

# Conclusion

Let's conclude with a summary and some follow-ups.

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
>    * When a large pct of population is unable to honor their contracts (like mortages), Democracy votes (indirectly) for printing Govt. legal tender (like US$)
>    * Since most contracts are written in US$, cheapening US$ makes it easier to honor the contract
>    * So, naturally all Democratic Fiat currencies tend to 0 over time
>    * Since they cannot be cheapened on demand, hard currencies like Gold & Bitcoin can force massive bankruptcies for citizens settling contracts in them; this appears to be the lived history on the Gold standard.
{: .block-tip}

## Follow-up questions
Armed with this knowledge, we can ask a bunch of follow-up questions. We can offer very reasonable answers to these questions but they are posts in their own right.
* What is a good economy? Hint: One that's confidently entering a lot of contracts!
* Is bitcoin better than US$ for the economy? Hint: Does it help enter more contracts? What happens during a recession - is it good or bad that Fed can print US$?
* What is Quantitave Easing? Is it a good or bad experiment? Hint: QE involves Fed printing US$ and buying US Treasuries and private citizen Mortgage obligations.
* Why do most people still talk about money in "lender/receiver" terms when there's just a contract? Hint: It is a relic of the Gold standard. Gold was the only money at some point and a loan amounted to transferring Gold from the bank to the person.
* Will a Govt. ever pay back its debt? Hint: No, not in the way a Gold based debt would need to be paid back.
