---
id: 272
title: 'Let&#8217;s practice with this month #SWDchallenge.'
date: 2019-10-06T21:25:16+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=272
permalink: /2019/10/06/lets-practice-with-this-month-swdchallenge/
image: /wp-content/uploads/2019/10/Account-share-vs-revenue-share-for-new-client-top-tiers.png
categories:
  - Data visualisation
---

#### #SWDchallenge and where to find them

One of my favourite author about data visualisation, Cole N. Knaflic, published a new book _<a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.amazon.com/gp/product/1119621496/ref=as_li_qf_asin_il_tl?imprToken=MXc2dye5HuMafi41a0kHIA&slotNum=2&creative=9325&creativeASIN=1119621496&ie=UTF8&linkCode=w61&linkId=c74bc50a287b2986edae7e3b95f9f5f4&tag=storytellingwithdata-20" target="_blank">Storytelling with data: Let&#8217;s Practice!</a>_ 

I am keen of getting my own copy, but while waiting I decided to take part in this month challenge. If you&#8217;re interested too, she launch one every month on her <a rel="noreferrer noopener" aria-label="website. (opens in a new tab)" href="http://www.storytellingwithdata.com/" target="_blank">website.</a>

#### October 2019 SWDchallenge

This is the extract from the latest post. I&#8217;ll follow the steps.

{% include figure.html image="https://images.squarespace-cdn.com/content/v1/55b6a6dce4b089e11621d3ed/1569866960440-ILA3DGUHPQZQUO3F98VY/ke17ZwdGBToddI8pDm48kFq85IBSQimBW5vU3jIslaIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2EMBHxCcfLnzTQpwko3MaGDteolNhPNWFS-NzayplzSEKMshLAGzx4R3EDFOm1kBS/Exercise+2.1+%2855%29.png?format=750w" width=750 height=42 caption="Extract from www.storytellingwithdata.com for this challenge" %}


#### Step 1

My assumptions are:

  * The tiers are ordered by best to last (A to D)
  * As the sum of % of Accounts doesn&#8217;t sum up to 100% and neither the % Revenue &#8211; either I have missing tiers or this is the just the new clients, but then I&#8217;ve just had a really good year if my revenue growth has been so big.

I would ask where the is the revenue missing to the 100%.

#### Step 2

This is how I re-designed the table using Google Sheets.

{% include figure.html image="/assets/uploads/swd-challenge-my-table.png" width=797 height=300 caption="My re-desing" %}

Here is the list of actions, and my thoughts behind them.

  * Kept the order of the tiers, assuming the order have a meaning
  * Right align the numbers and percentage &#8211; to make the scan and comparison quicker for the reader
  * Delete background in the titles as the contrast wasn&#8217;t great for readability
  * Remove the alternate line background, as the new line separation is already enough
  * Added the unit and currency to each value in the table &#8211; to make it clear we are talking Million $, and remove it from the title as unnecessary
  * Added the Other tier &#8211; so that we have the whole and not just part of it, this is following my assumption at step 1.
  * I made the % italic, to sort of create a link between numbers and related %
  * Use the default font of Google sheet, for consistency.

#### Step 3

The title of the table and the exercise suggest to look at the tier share in terms of number of accounts and revenue, and compare those two. 

I decided to stick with a simple visual, a column chart where I compare only the revenue and account share for the top tiers (so I excluded the Other bucket).

{% include figure.html image="/assets/uploads/swd-challenge-my-chart.png" width=835 height=475 caption="Chart to compare accounts share and revenue share" %}

Again I used Google Sheet, selecting the column chart and putting the two share % side to side for an easier comparison. 

I put the legend on the top left, to be picked up first thing by the user and kept the order of the tiers. 

Now having them side to side I can see how A, A+ are giving most of the revenue, while forming only 9% of all accounts. While C, D give 17% of the revenue, but has 4 times more accounts.

I went for a black and grey version, bit old style and boring, but as effective &#8211; and will be the same if printed!

The link with both the data, the table and the chart can be found <a rel="noreferrer noopener" aria-label="here (opens in a new tab)" href="https://drive.google.com/file/d/1mFxZeLLoquP5pmk4zS6HnpXolK-Ib1DI/view?usp=sharing" target="_blank">here</a>. Hope you find this post useful, I will submit this on the SWDchallenge!