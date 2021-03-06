---
id: 352
title: Aliasing
date: 2020-08-24T17:52:15+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2020/08/24/342-revision-v1/
permalink: /2020/08/24/342-revision-v1/
---
I&#8217;ll be starting a series of posts about some cool <a rel="noreferrer noopener" href="https://www.snowflake.com/" target="_blank">Snowflake</a> (The cloud data platform) features, that makes SnowSQL really cool &#8211; compared to other SQL dialect (I am most familiar with Microsoft SQL Server or T-SQL).

I&#8217;ll start the series, talking about **aliasing**.

Sometimes our SQL get really complex: who haven&#8217;t seen a nested case statement grows exponentially? so much that after a while you can&#8217;t understand anymore if the output is what is supposed to be, and same for window functions.

The suggestion when complexity arise is usually &#8220;break down the problem in smaller steps&#8221;, and that&#8217;s where aliasing can help the most writing your SQL queries.

Snowflake features of aliasing allows you to re-use the same SQL block in another column definition and simplify massively your code, making it more understandable.

For example you might have a SQL like this:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  case 
    when price > 100 and referral_code  = 'XXX1' then price * 0.9
    when referral_code = 'XX2' then price*0.75
    when referral_code = 'XX3' then price - 10 
    else price end as discounted_price,
  case 
    when partner = 'A' then discounted_price*0.2
    when partner = 'B' then discounted_price*0.3
    else discounted_price end as partner_fee
from my_table</pre>

So this is the new alternative, without the aliasing capability (for example in a database like SQL Server, you would have to explicitly re-write the logic for the `discounted_price` twice (not DRY, <a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" target="_blank">Don&#8217;t Repeat Yourself</a>) or create a function in the database (<a rel="noreferrer noopener" href="https://docs.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver15" target="_blank">like this</a>). So much neater using the alias!

Moreover you can use those aliases in the `where`, `group by`, `having`, `qualify` and `order by` statement, saving you from copying the same logic multiple times in your query. 

Here is another example:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  first_name,
  last_name,
  first_name || ' ' || last_name as full_name
from names
where full_name = 'My Full Name'</pre>

In general this feature is amazing, but there are a couple cases where it might trick you. In particular: alias don&#8217;t override existing columns names and can have unexpected behaviour when used in join clauses.

##### Alias conflicting with existing columns names

Snowflake doesn&#8217;t infer the alias if you create an alias that is already a columns in one of the tables you join. Suppose the tables look like these:

first table t1:<figure class="wp-block-table is-style-regular">

| id | email_address |
| -- | ------------- |
| 12 | foo@com       |
| 13 | hola@com      |</figure> 

second table t2:<figure class="wp-block-table">

| my_id | email_address |
| ----- | ------------- |
| 12    | food@com      |</figure> 

The following query

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  t1.id
  , coalesce( t2.email_address, t1.email_address) as email_address
from t1
left join t2
  on t1.id = t2.my_id
where email_address = 'foo@com'</pre>

will give you an error of ambiguous column name, so you&#8217;ll need to specify the table for the column you want to use or rename the column alias to be something different from the column names already existing in your tables.

##### Alias used in joins.

Snowflake doesn&#8217;t like aliases in joins, suppose we have two tables above, and say you want to rename the `my_id` of the second table to `new_id` :

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select 
  t1.id
  ,t2.my_id as new_id
from t1
left join t2 
  on t1.id = t2.new_id</pre>

Will give you an error of unknown column names, so careful when using aliases in the join.

To summarise, aliases are amazing to simplify your code and stay DRY but needs to be used with care when joining tables.

Hope you too loves aliases, or start using them after reading this post! Did you find any other troubles using them? Let me know.