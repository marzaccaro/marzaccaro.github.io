---
id: 362
title: Qualify
date: 2020-08-25T19:52:19+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2020/08/25/353-revision-v1/
permalink: /2020/08/25/353-revision-v1/
---
This is the second post about some Snowflake features, that I use often and find useful to write a better SQL. You can find the first of the series about aliasing <a rel="noreferrer noopener" href="https://foodfordata.com/2020/08/24/aliasing/" data-type="URL" data-id="https://foodfordata.com/2020/08/24/aliasing/" target="_blank">here</a>.

##### What is it?

Have you ever been in the situation where you want to keep all rows of your query but than filter the result set based on a condition you would get from a subset of it? Let me clarify this with some examples:

  * Suppose you are tracking all the interactions with a website and you want to see what happened after a specific action took place: then you would want to keep all events for those customers that have a specific event in their event stream.
  * Suppose you sell multiple products per customers and you want to see all the purchase history of the customers that have a very specific product as last purchase.

Let&#8217;s stick with this second example. In that case you would have a table looking like this, let&#8217;s call it `purchases`:<figure class="wp-block-table is-style-regular">

| customer_id | product | purchased_date  
(YYYY-MM-DD) |
| ----------- | ------- | ----------------------------- |
| 1           | A       | 2020-04-01                    |
| 1           | B       | 2020-05-03                    |
| 2           | A       | 2020-03-01                    |
| 3           | B       | 2020-04-01                    |</figure> 

So customer 1 and 3 last purchase was product B, and customer 2 last purchase was product A. Now suppose you want to filter in your data only the customers that purchased B as last product, for an analysis you&#8217;re doing.

What you would do, without using the qualify statement, would be something like this:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">with product_purchased_order as (
select 
  customer_id
  , product
  , row_number() over (partition by customer_id order by purchased_date desc) as n_last_order_nr
from purchases
)
select customer_id 
from product_purchased_order
where n_last_order_nr = 1 and product ='B'</pre>

You see that I have to use at least two queries: first the window statement and the where clause to filter the results I want. There are many other way to get to the same result, but let&#8217;s see how to simplify the query.

The `qualify` expression allows to rewrite the statement above to read nicely and in one single query. Here you go:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  customer_id
  , product 
  , last_value( product ) over (partition by customer_id order by purchased_date) as last_product_purchased
from purchases
qualify last_product_purchased = 'B'</pre>

Note the benefits of using this second option:

  * I can write only one query
  * I can keep in the same query all the fields in the base table: in this case all the purchase history, even though I am just keeping the customer that have bought B as last product &#8211; I can still see all the products they purchased.

When analysing something, you often want to filter by a condition on a partition, but keep all the records at a lower granularity &#8211; that is where the `qualify` come in handy. Note also how using the alias in the query above made the statement more clear. 

##### Where does the qualify clause this fit?

From the Snowflake <a rel="noreferrer noopener" href="https://docs.snowflake.com/en/sql-reference/constructs.html" target="_blank">general query syntax reference</a> you get this general outline:

<pre class="wp-block-code"><code>&#91; WITH ... ]
SELECT
   &#91; TOP &lt;n> ]
   ...
&#91; FROM ...
   &#91; AT | BEFORE ... ]
   &#91; CHANGES ... ]
   &#91; CONNECT BY ... ]
   &#91; JOIN ... ]
   &#91; PIVOT | UNPIVOT ... ] ]
   &#91; VALUES ... ]
   &#91; SAMPLE ... ]
&#91; WHERE ... ]
&#91; GROUP BY ...
   &#91; HAVING ... ] ]
&#91; QUALIFY ... ]
&#91; ORDER BY ... ]
&#91; LIMIT ... ]</code></pre>

So, the `qualify` sit in the query order right after the `having` (if present) but before the `order by` and the `limit` clauses.

It&#8217;s also possible to not include the window function you are filtering by in the select list, which is good in case you don&#8217;t want to show the value you are filtering on, for example in the previous query something like:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  customer_id
  , product
from purchases
qualify last_value( product ) over (partition by customer_id order by purchased_date) = 'B'</pre>

Which could be good if the additional field is redundant or used just for filtering.

That&#8217;s it for today! Hope you&#8217;ll start getting rid of some extra CTEs / sub-queries, thanks to the `qualify` or, why not, have better time writing the logic to get some fancy slice of your data, based on whatever complex condition.

Have you used the `qualify` statement? What are the pros and cons about it? Any warnings that you want to share? Let me know!