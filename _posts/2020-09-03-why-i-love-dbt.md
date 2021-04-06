---
id: 340
title: Why I love dbt
date: 2020-09-03T19:00:32+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=340
permalink: /2020/09/03/why-i-love-dbt/
categories:
  - dbt
---

I am an analyst and since the early days I've found quite frustrating having to wait days, weeks or even months for the data to be available -- because the data warehouse developers were busy, and felt I couldn't add value or contribute doing what I knew: analysing data. 

And I still remember my first job as a BI developer back in 2014 where I was using [Oracle BI](https://www.oracle.com/uk/middleware/technologies/bi-enterprise-edition.html), and I needed to wait the transformation and loading to be completed, before I could do anything at all. That implies a waste not only because the BI developers can't use their expertise in helping the design, but also because the agility of creating data value is greatly compromised (more on this in the section _Coupled pipeline decomposition_ of [this article](https://martinfowler.com/articles/data-monolith-to-mesh.html)).

Fast forward March 2019, my team at [Simply Business](https://www.simplybusiness.co.uk/) decided to introduce dbt, in wander for a more clear pipeline and a more robust analytics. The new paradigm is ELT (Extract, Load, Transform) instead of ETL (Extract, Transform, Load) because of the incredible computing power the cloud databases ([Snowflake](https://www.snowflake.com/), [Redshift](https://aws.amazon.com/redshift/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc), [BigQuery](https://cloud.google.com/bigquery) among others) can bring to the table. 

With this new approach, I no longer need to wait for someone to create the base tables for me to use in the reporting tool of choice, and what is most exciting I have a lot more freedom and flexibility to tailor my data structure to the needs of the reporting tool and the business requirements, iterating faster than ever before.

What it means is my role as well changed, and I am no longer building reports / reporting models waiting patiently for someone to load the clean and modelled data for me, but I can just wait for someone to load them and then rework and adapt the model to the business requirements, exposing the changes in the reporting layer with no waiting times. Some companies went on and even adopted some loaders like [Stitch](https://www.stitchdata.com/) or [FiveTran](https://fivetran.com/) to be able to load data from the data sources and make the loading even quicker.

This change means two main consequences on my role: **more knowledge of the data sources and the relationship among them**, but also the responsibility ([with more power comes more responsibility](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility), the evergreen quote) to create something that is reusable rather than create a new table every time a new requirement come in: so understanding if it's a case of **adding to the existing content or create something else** to cover the new business questions arising.

{% include figure.html image="/assets/uploads/super-analyst.jpg" caption="My bitmoji, credit to Bitmoji & dbt for the logo. <br />I feel a super-analyst, just thanks to dbt." width=309 height=309 %}

dbt is the T, the Trasform, in the ELT process, and the power that made me a **super-analyst**: faster, more reliable and empowered to understand not only the business, but how the business needs are translated into a data model. That's why I love dbt and I'll try to describe it in some upcoming posts, hoping to spread the love.

Curious to know more? Start reading these blog posts:

  * <a href="https://blog.getdbt.com/what--exactly--is-dbt-/" target="_blank" rel="noreferrer noopener">What, exactly, is dbt?</a>
  * <a href="https://blog.getdbt.com/is-dbt-the-right-tool-for-my-data-transformations/" target="_blank" rel="noreferrer noopener">Is dbt the right tool for my data transformations?</a>
  * <a href="https://highgrowthengineering.substack.com/p/why-is-dbt-so-important-" target="_blank" rel="noreferrer noopener">Why dbt is so important?</a>

Feel like you want to listen to something, instead? [Trying to avoid screen time uh?] Try this podcast episode:

<a href="https://softwareengineeringdaily.com/2020/03/09/dbt-data-build-tool-with-tristan-handy/" target="_blank" rel="noreferrer noopener">Software Engineering Daily, DBT: Data Build Tool with Tristan Handy</a> 

Want to learn by doing? Check out this [Tutorial](https://docs.getdbt.com/tutorial/setting-up/)

Want to support your learning? The dbt community is just incredibly helpful and welcoming, you can join the [slack channel](https://community.getdbt.com/), or check out the [Discourse online](https://discourse.getdbt.com/).

And finally they just re-launched <a rel="noreferrer noopener" href="https://www.getdbt.com/coalesce/" target="_blank">Coalesce 2020, 7-11 December</a>, can't wait to attend!
