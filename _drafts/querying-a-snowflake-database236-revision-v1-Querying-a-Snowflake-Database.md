---
id: 241
title: Querying a Snowflake Database
date: 2019-09-29T12:25:48+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2019/09/29/236-revision-v1/
permalink: /2019/09/29/236-revision-v1/
---
My company is in the process of moving from an <a href="https://aws.amazon.com/redshift/" target="_blank" rel="noreferrer noopener" aria-label="Amazon Redshift (opens in a new tab)">Amazon Redshift</a> to a <a rel="noreferrer noopener" aria-label="Snowflake (opens in a new tab)" href="https://www.snowflake.com/" target="_blank">Snowflake</a> database, and without going into the consideration of pros and cons of each, let&#8217;s see how to query data from Snowflake. 

### Using the Web UI

The first and easiest option is to use the web UI that comes for free once your Snowflake administrator have set you up with a username and password and given you the link to access it. You can find all the details on how to use it <a rel="noreferrer noopener" aria-label="here (opens in a new tab)" href="https://docs.snowflake.net/manuals/user-guide/ui-using.html" target="_blank">here</a>.

#### Worksheets

<div class="wp-block-image">
  <figure class="aligncenter is-resized"><img src="https://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-13-08-17.png" alt="" class="wp-image-238" width="152" height="37" /></figure>
</div>

Most notable feature of the Worksheets is that you can **save, load and delete scripts** and keep them saved in your area &#8211; without worrying of saving before logging-out as all the scripts are automatically saved. 

I wouldn&#8217;t recommend writing complex scripts in here, because you **don&#8217;t have autocomplete**, and you can just place the SQL element (table, column, etc.) where your cursor is placed. 

I would use the UI for database exploration: you can search tables by name, preview data, and see catalogs, tables and columns in your database or if do some basic row count or select all of certain tables.

Snowflake is well aware of the limitations of the UI and recently acquired <a href="https://www.snowflake.com/blog/numeracy-investing-in-our-query-ui/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Numeracy</a>, to improve it.

#### History

<div class="wp-block-image">
  <figure class="aligncenter"><img width="128" height="42" src="https://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-13-10-27.png" alt="" class="wp-image-239" /></figure>
</div>

This is a really good feature of the web UI, as you can **check the performance** for every user / warehouse and see what are the most expensive nodes in the execution plan of your query. This will allow you to optimise your query structure and write your query more efficiently.

Every analyst should keep an eye on the execution plan. This is also the place that tells you if in your specific query is better to use a temporary table or a CTE. Be aware of repeated executions as <a href="https://www.youtube.com/watch?v=lcO8CRT5EMc" target="_blank" rel="noreferrer noopener" aria-label="Snowflake caches result (opens in a new tab)">Snowflake caches result</a>.

### Using a SQL Client

As Snowflake UI is not very friendly for auto-complete and field suggestion, as well as formatting, you can use a SQL client of your choice to connect to the database. My go to SQL client is <a href="https://dbeaver.io/" target="_blank" rel="noreferrer noopener" aria-label="DBeaver (opens in a new tab)">DBeaver</a>, as it is open source and it supports most SQL database. 

#### Setting up DBeaver with Snowflake

  * Download the latest version, 4.3.4 or higher comes automatically with the Snowflake JDBC driver
  * Click create a New Connection and select Snowflake
  * You will need the **Host**, **User**, **Password** and the **Role** (ask your DB administrator for the details)
  * You can specify Database or the Schema, but it&#8217;s optional

<div class="wp-block-image">
  <figure class="aligncenter is-resized"><img src="https://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-12-14-23.png" alt="" class="wp-image-237" width="483" height="532" srcset="http://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-12-14-23.png 781w, http://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-12-14-23-272x300.png 272w, http://foodfordata.com/wp-content/uploads/2019/09/Screenshot-from-2019-09-29-12-14-23-768x847.png 768w" sizes="(max-width: 483px) 100vw, 483px" /><figcaption>Connection set-up screen</figcaption></figure>
</div>

Once you&#8217;re set up you can now navigate the database and write more complex queries with the autocomplete functionality.

Hope you find this useful and happy querying with Snowflake!