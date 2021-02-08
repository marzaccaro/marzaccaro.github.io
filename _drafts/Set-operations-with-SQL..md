---
id: 389
title: Set operations with SQL.
date: 2020-09-10T07:19:23+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=389
permalink: /?p=389
categories:
  - dbt
  - Snowflake
---
<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix">Reading Time: </span> <span class="rt-time">4</span> <span class="rt-label rt-postfix">minutes</span></span> 

Following up on Snowflake and dbt series, today I am talking about how to deal with set operations in Snowflake.

These are the maths operations, you can do with sets:

put image of sets

  * A UNION B: to keep all elements of A and B
  * A MINUS B: to keep all elements of A that are not in B
  * A INTERSECT B: to keep all elements of both A and B

For now this is math, now let&#8217;s see how this works when A and B are actual tables and when is a good time to use those.

The sets in this case are tables, so to be able to perform this operations there are 2 fundamentals requirements: 

  * The tables A, B have the same number of columns
  * The columns of A and B, with their order have the same datatype

For example, I can union two tables like this:<figure class="wp-block-table is-style-regular">

| email            | source       | date_collected |
| ---------------- | ------------ | -------------- |
| martina@mail.com | contact form | 2020-02-03     |
| sara@mail.com    | contact form | 2020-04-05     |<figcaption>Table A</figcaption></figure> <figure class="wp-block-table is-style-regular">

| email            | event              | date_collected |
| ---------------- | ------------------ | -------------- |
| martina@mail.com | newsletter sign-up | 2020-06-01     |
| maria@mail.com   | newsletter sign-up | 2020-05-07     |</figure> 

because the columns are in the same number and of the same type. Note that the column names don&#8217;t need to be the same, as the labels inferred are the ones from the first query in the operations:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  email,
  source,
  date_collected
from tableA

union 

select 
  email,
  event, 
  date_collected
from tableB</pre>

This will output a table with column names from tableA, but that contains record from both table A and table B. So basically you are stacking the table A on top of the table B. 

Now `union` is doing the mathematical definition of the record, which unions the table rows, getting rid of duplicates, but there is a variation of the union, the `union all`. It is special because it will keep duplicates, so all records from the tables you union without getting rid of the duplicates.

Why would you want it? well there are some reason why I actually prefer it to the union: the operation is cheaper from the SQL compiler perspective, because it will not waste time removing duplicates, i.e. doing a distinct count afterwards.

TEST what the compiler does

So if you already know that your record will be different (for example in the tables above), always use the `union all` as it&#8217;s more efficient.

Let&#8217;s clarify with an example:

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
 email
from tableA

union

select 
  email
from tableB</pre>

has as output:<figure class="wp-block-table is-style-regular">

| email            |
| ---------------- |
| martina@mail.com |
| sara@mail.com    |
| maria@mail.com   |<figcaption>s</figcaption></figure> 

and 

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select
  email
from tableA

union all

select 
  email
from tableB</pre>

has output<figure class="wp-block-table is-style-regular">

| email            |
| ---------------- |
| martina@mail.com |
| sara@mail.com    |
| martina@mail.com |
| maria@mail.com   |</figure> 

The MINUS ( or EXCEPT, the operators are interchangable) operations will keep only record from table A that are not in table B. So the output of 

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  email
from tableA

except 

select
  email
from tableB</pre>

is <figure class="wp-block-table is-style-regular">

| email         |
| ------------- |
| sara@mail.com |</figure> 

and the result of the INTERSECT will keep all record in table A that are also in the table B, so the output of 

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  email
from tableA

intersect 

select 
  email
from tableB</pre>

is <figure class="wp-block-table is-style-regular">

| email             |
| ----------------- |
| martina@email.com |</figure> 

I am not an heavy user of EXCEPT or INTERSECT because I usually can get the EXCEPT with a left join and where clause asking for the record I&#8217;m joining on is null for the second table and the INTERSECT, with the inner join or left join but this time asking the join term not to be null. 

I find EXCEPT particularly useful, when I want to check if two tables are the same or not, in fact if A and B are exactly the same the query will return no result. I use this when re factoring some SQL code to make sure the output of the table are exactly the same.

but the UNION is a very useful operation, because it allows to combine records in the same tables, when usually they are not.

This is especially useful in these cases for example:

  * Create a table that contains all the sales that a business has, even if the sales are coming from a different sources (example sales from Stripe or sales from another payment provider)
  * Combine different type of events for analysis purpose
  * Combine in the same table all the emails, that you selected based on different set of conditions; but that you need to have uploaded to your email marketing system all in one go.

dbt enters the game.

So the disadvantage of the union are the following:

  * the columns needs to be in order
  * the columns needs to be in the same number 

Not with dbt, because as long as you keep the column name consistent it will pick up the columns that needs to stacked on top of each other and fill the columns missing in one of the table with nulls, this is very convenient, especially if the columns are different, but you want to keep the extra column of the dataset. 

How to do it?

Use the dbt\_utils macro that is called dbt\_utils.union link to the docs.

Benefit of using it?

  * can decide the business names of the columns upfront and then union the datasets to get a nice result
  * no need to worry about the tables to be exactly the same
  * easier to read than the union
  * automatically create some utility columns

The examples I choose are nowhere near the size of the tables you would use in the real world scenario, so you can understand why having a macro like this, really simplify the modeling and understanding of the datasources.

When you have a couple of sources with limited numbers of fields it might be ok to write a union but as the number of sources changes, using this macro really help you to scale without worring too much!