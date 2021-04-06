---
id: 116
title: 'A 3D exploding pie chart: not a good idea.'
date: 2019-06-01T09:00:44+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=116
permalink: /2019/06/01/a-3d-exploding-pie-chart-not-a-good-idea/
image: /wp-content/uploads/2019/05/IMG_20190505_170747856-e1559126539151.jpg
categories:
  - Data visualisation
---

#### A panel in a history of printing museum

Last week I was visiting this <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="http://www.museibassano.it/collezione/museo-della-stampa-remondini" target="_blank">museum</a> about the history of invention and development of printing in Bassano Del Grappa, a small little village in the North of Italy. The museum was really well presented and it reminded me how the introduction of printing marked a revolution: more and more books were available and the knowledge was faster to spread.

The museum focus was about the Remondini&#8217;s: a famous family running a publishing business, particularly active in the &#8216;700 and based in Bassano. Historians knew it was flourishing, because it was the main reproducer of a satiric depiction called the Juicio Universal, that was widespread and talked about in all the Catholic countries. To point out how wide was the reach of the prints, a panel in the museum proposed this chart 

{% include figure.html image="/assets/uploads/exploding-pie-chart.jpg" caption="Panel at the Museo della Stampa Remondini, Bassano del Grappa" width=406 height=242 %}



And I decided to use this post as a commentary and an opportunity for a make over.

#### Why the 3D pie chart does not fit for purpose?

Looking at the panel I find myself going back and forth between the chart and the legend, struggling to understand what the aim of the chart is and I actually start looking at _Svizzera_ and then look back to the _Impero_ because the colours are so similar. Here some more reasons why this chart is not a good choice:

  * Too many colours make it hard to decide which is which clearly
  * _Spagna_ looks bigger than _Stato Pontificio_, even though the latter is 1% bigger in reality: this is due to the deformation caused by the 3D effect
  * At a glance I cannot understand what is going on and I need to read the whole legend.

#### What are better options?

What alternative can I use to display the data? Of course the answer is **it depends!** On what &#8211; I heard you asking? &#8211; on the message you&#8217;re trying to convey. 

If it is important to **compare** how many of the reproductions were going in each region, I would use a **bar chart**, maybe highlighting the top region, like in the image below.

{% include figure.html image="/assets/uploads/bar-chart.png" caption="Bar chart, the difference between the regions is now clear and there is no need for a legend." width=570 height=336 %}

If instead is important to mark that **so many different regions** were receiving these reproductions I would just list the number of different end markets and compare it to the number of existing regions at that time. Or alternatively give a **sentence** like _X% of the number of books circulating in Europe where produced from Remondini_, something along the line of this

{% include figure.html image="/assets/uploads/single-value-chart.png" caption="Sometimes a sentence with the main numbers is more effective. Note: these numbers are made up" width=498 height=127 %}

To summarise the nature of this data-set makes it hard to choose a pie chart, both because the number of colours is too high and because some of the slices&#8217; sizes are so similar. The 3D effect does not help &#8211; distorting the proportion of the real numbers. Curious to see when is a good idea to use a pie chart? Have a look at <a rel="noreferrer noopener" aria-label="my presentation (opens in a new tab)" href="https://foodfordata.com/2019/02/10/how-to-tell-a-story-with-data/" target="_blank">my presentation</a> on how to better tell a story with data.