---
id: 345
title: Alias FTW
date: 2020-08-24T16:33:07+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2020/08/24/342-revision-v1/
permalink: /2020/08/24/342-revision-v1/
---
I&#8217;ll be doing a sequence about some cool Snowflake (the cloud database) features, that is worth highlighting for the benefit of everyone using this cool new platform.

Sometimes our SQL get really complex, who haven&#8217;t seen a case statement grows exponentially, and after a while you can&#8217;t understand anymore what are the business rules behind the output or if it&#8217;s giving you what you expect.

Usually, when you tackle math/programming problem, the suggestion is always: &#8220;Break it down&#8221;.

Snowflake features of aliasing allows you to re-use the same SQL block in another column definition and simplify your code, and make it more understandable.

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

So this is the new alternative, without the aliasing capability (for example in a database like SQL Server, you would have to explicitly write the logic twice (not DRY) or create a function <a href="https://docs.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver15" data-type="URL" data-id="https://docs.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver15">(here)</a>.

Moreover you can use those aliases in the where, group by, having, qualify and order by statement, saving you from copying the same logic multiple times in your query!