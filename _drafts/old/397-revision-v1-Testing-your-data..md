---
id: 402
title: Testing your data.
date: 2020-09-10T07:09:58+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2020/09/10/397-revision-v1/
permalink: /2020/09/10/397-revision-v1/
---
While in software development testing is pretty much an accepted reality and they even have the concept of TTD (Test Driven Development), in Data Analytics often Testing is quite ad-hoc. 

And often companies have a UAT (User Acceptance Test) environment just so the business users can see how the data looks like before releasing the changes in production.

So Data Assets are result of data collection that is often a result of a Technological problem, and so data keep chaniging and evolving too; that&#8217;w why is important to have a way to test changes in the source systems, and the impact that those changes will have on the sets of KPI and metrics your system defined as important.

One of the most interesting feature of dbt is the possibility to add test. There are 2 main type of test Data tests and Schema test. The schema test allows you to do simple and easy test on the columns, for example test for a column to be a primary key (uniqueness), test for a column to never be null (not null), freshness, etc., check that you kept all the record when transforming the data (integrity test).

But also data test, and you can write any type of test using SQL, one example include: I want the total amount in this table to always be within a certain threshold. expand here with more examples.

What I really struggle with at the beginning was to write those test, because it force yourself to list all the assumptions you&#8217;re making when writing a SQL model. Whereas the &#8220;usual habit&#8221; is just write a SQL that works, and then sense check the numbers (which I think a lots of analyst do, and as they have more experience, they refine more and more the business acumen for this reason)

I feel different companies have different approaches to this. Example RVU was going for a test everything approach, vs Tail.com advice was to be very specific with their test, focusing mainly on the most important ones. Because test means possibility of test failures and that implies debugging and resolving issue. 

I think that is the case in a lot of cases, where the test you put on is just a not null test, but didn&#8217;t really impact the data that strongly.

So my advice on this is start small and build your testing suite as you go.

The minimum is uniqueness of the primary key, relationship test, to check that you&#8217;re not dropping record from the transformation to the final data set .

Then the question you should ask yourself are:

  * what are these model main assumptions? i.e. this table has one row per order, or this table has one row per customer -> then set a uniqueness tes t on that column
  * is adding this test making this model any more reliable? example I think especially engineers in our team tend to add test to every columns &#8211; just because they can &#8211; but that implies goes in and check when the error is failing &#8211; so sometimes what they do is remove the test or convert it to a warning (I would do the first)
  * I have mixed feelings about warning: so the system is notified, but there is no system failures: I feel most of the warnings we set up are assumptions, that then the data couldn&#8217;t satisfy because of data-quality issues or issue with the models, but that could not be resolved > port over of legacy code that we expected work in a way but then did not. I admit we ignore those and focus on the failure instead, so in the end I am wondering &#8211; should we use warnings if someone is not going to check them. I still a good thing you can flag those.
  * using test with threshold A for a couple of bad record (data quality issues uh?) recently dbt added this feature to handle it 

All the ones I mentioned above are test that you do while developing your model, and before productionize it.

Say now you&#8217;re happy with your model, created it, tested it, use it in your BI tool, shown to the users the result / interface and they are happy about it: now you can let them use the data and move on.

ahahah &#8211; never! Things evolve and change all the time, that&#8217;s why when something goes wrong, and someone raise an issue with your data you should think of a way to prevent that from happening again.

What I find particularly hard