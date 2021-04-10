---
id: 338
title: Python Virtual Environments
date: 2020-01-29T10:48:09+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=338
permalink: /?p=338
categories:
  - Uncategorized
---
<span class="rt-reading-time" style="display: block;"><span class="rt-label rt-prefix">Reading Time: </span> <span class="rt-time">< 1</span> <span class="rt-label rt-postfix">minute</span></span> 

Python is getting more and more important for analyst.

I needed two different Python environment:

  * One to deal with dbt (maybe explain what dbt is briefly)
  * One where I want to connect my jupyter notebook to dbt to do some data analysis &#8211; using sql_alchemy?

What happens? there are conflicting dependencies (sql url lib) &#8211; so this is not possible unless with pip I change the package version I want to use.

Whats the solution?

It&#8217;s to have 2 different virtual environment, so I will activate one virtual environment when I use my dbt project and then a different one to link to a jupyter notebook, and next time I will need to do something with yet another set of package &#8211; I&#8217;ll be free to do it.

It&#8217;s really complex to understand how all the virtual environment thing work, especially if you&#8217;re not familiar with programming, dependencies and all that faff

So this is probably not the best option, but one that worked for me

  1. install pyenv