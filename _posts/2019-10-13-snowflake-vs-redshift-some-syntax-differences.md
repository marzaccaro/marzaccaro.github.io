---
id: 234
title: 'Snowflake vs Redshift: some syntax differences.'
date: 2019-10-13T11:30:20+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=234
permalink: /2019/10/13/snowflake-vs-redshift-some-syntax-differences/
categories:
  - Snowflake
---
<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix">Reading Time: </span> <span class="rt-time">3</span> <span class="rt-label rt-postfix">minutes</span></span> 

#### Moving code from Redshift to Snowflake

As I said <a rel="noreferrer noopener" aria-label="here, (opens in a new tab)" href="https://foodfordata.com/2019/09/29/querying-a-snowflake-database/" target="_blank">here,</a> my company is in the process of moving from Redshift to Snowflake. There are loads of reasons for doing it: to mention a few, better handling of permissions, less maintenance and less effort to optimise query performance.

#### A really good article as a starting point.

I start reading around for differences between the two syntax in preparation to move lots of SQL scripts from Redshift to Snowflake, and <a rel="noreferrer noopener" aria-label="this article (opens in a new tab)" href="https://medium.com/@jthandy/how-compatible-are-redshift-and-snowflakes-sql-syntaxes-c2103a43ae84" target="_blank">this article</a> explains well the major differences regarding:

  * Window functions
  * Timestamps&#8217; operations and time-zones
  * Casing and quotes
  * General less forgiveness of Snowflake over Redshift in functions and datatype conversions

This article helped me a lot as starting point, to understand what could be the potential issue when the query was not running, but sometimes Snowflake error messages aren&#8217;t clear enough, and it&#8217;s hard to figure out what the issue is. So during the migration we decided to keep a log of all the differences in syntax that we found.

I&#8217;ll list them below, hopefully is helpful for other people dealing with a Redshift to Snowflake migration.

#### More timestamps issues

`GETDATE()` is no longer supported, but you can use `CURRENT_TIMESTAMP` to get the current timestamp and `CURRENT_DATE` to get the current date. This syntax is also compatible with Redshift so you can safely replace all your `GETDATE()` with `CURRENT_TIMESTAMP` , remembering to convert to a specific timezone if needed.

`DATEPART` is not allowed in Snowflake, but you can use the equivalent `DATE_PART`, with exactly the same structure, checkout the documentation <a rel="noreferrer noopener" aria-label="here. (opens in a new tab)" href="https://docs.snowflake.net/manuals/sql-reference/functions/date_part.html" target="_blank">here.</a> 

#### More cast issues

When casting, Snowflake is less forgiving than Redshift, but has built in functions to better deal with those, `TRY_CAST` that will return `NULL` if the conversion cannot be performed. The function can be used only if the input is of type `string`, &nbsp;when the input is numeric use instead `TRY_TO_DECIMAL`, `TRY_TO_NUMBER`, `TRY_TO_NUMERIC`. 

The function `CONVERT` does not exist any longer, but `CAST` is a safe alternative.

#### Boolean and NULL

With Redshift a syntax like: 

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">CASE WHEN a is true THEN 'Yes' ELSE 'No' END </pre>

will work, in Snowflake `is` is allowed only for `NULL` identity verification, not for `BOOLEAN`, so the above should be rewritten as

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">-- similar:
CASE WHEN a = true THEN 'Yes' ELSE 'No' END

-- using IFF:
IFF( a, 'Yes', 'No')</pre>

Snowflake, in fact, have an `IFF` function, less verbose than `CASE` for when only one condition need to be checked.

Snowflake does not infer a `BOOL` type from `` and `1`, so something like 

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">-- here b is a number with value 1 or 0:
SELECT CASE WHEN b THEN 'Yes' ELSE 'No' END</pre>

will not work on Snowflake, you can convert to a condition on the field, so `b=1` or do `TO_BOOLEAN(b)` or `TRY_BOOLEAN(b)` for a safer result.

Another difference is in the Redshift function `ISNULL(a,0)`, this is no longer available and it needs to be replaced with `IFNULL(a,0)`, where this returns `` when the field `a` is `NULL`. Or even better you can use `COALESCE(a,0)` or `NVL(a,0)` that are supported by both databases, and return the same result.

#### String functions

Some issues with string function might occur too. The string concatenation operator is `||` and `+` gives an error message:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">-- working in Snowflake:
SELECT 'Snowflake' || ' is great' 

-- not working in Snowflake:
SELECT 'Snowflake' + ' is great'</pre>

To remove left and right trailing spaces you would use `TRIM`, valid in both databases, but `BTRIM` that was doing the same in Redshift is not a valid function in Snowflake.

The only syntax allowed in both databases to get the length of a string is `LENGTH` and `LEN` is not valid anymore.

The equivalent of the hash function `FUNC_SHA1` is `SHA1` , so use this one with the same structure.

#### Parsing JSON

Contrary to Redshift, Snowflake allows a better handling of unstructured data so you can query JSON objects more easily. Suppose you have a JSON in the format:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">my_json = '{"f2":
  {"f3":1},
 "f4":
  {"f5":99,
   "f6":"star"}
}'</pre>

to get `star` from it in Redshift you would need:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select json_extract_path_text( my_json,'f4','f6')</pre>

in Snowflake:

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">select parse_json( my_json:f4.f6 )</pre>

To know more about how to deal with JSON and semi-structured data, have a look at [this document](https://docs.snowflake.net/manuals/user-guide/querying-semistructured.html) or [this post](https://community.snowflake.com/s/article/json-data-parsing-in-snowflake) in the Snowflake community.

Sometimes the syntax differences are hard to spot, and you end up losing a lot of time troubleshooting, a good idea is try to comment out pieces of your SQL and then test out functions and syntax in an easier example.

Hope you find this useful. What other differences did you spot moving your queries to Snowflake?