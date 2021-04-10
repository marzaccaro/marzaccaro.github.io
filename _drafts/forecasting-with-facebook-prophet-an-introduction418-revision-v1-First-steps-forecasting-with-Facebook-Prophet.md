---
id: 434
title: First steps forecasting with Facebook Prophet
date: 2021-02-07T17:07:31+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2021/02/07/418-revision-v1/
permalink: /2021/02/07/418-revision-v1/
---
I had a go at forecasting time series with Facebook Prophet, and find it useful &#8211; so hopefully you&#8217;ll find it useful too.

<a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Time_series#:~:text=Most%20commonly%2C%20a%20time%20series,the%20Dow%20Jones%20Industrial%20Average." target="_blank">Time series</a> analysis and forecasting are useful in social, demographic, economical contexts; in all the scenarios where you have a sequence of observation that are indexed over time. Example includes: number of Covid-19 cases per day (sadly we are all to familiar with this), number of pizzas served in a day by a restaurant (this makes me happier), average daily temperatures. 

Often in the business scenarios there is a need for forecasting demand, orders and revenue, and sometimes just assuming a linear pattern doesn&#8217;t account for seasonality and change in trend. Plus having a quicker and more reliable way to forecast allows business to adapt faster to change &#8211; improving their planning and spending. 

This proven especially challenging during Covid-19, as this was totally unpredictable and made planning for 2020 and beyond really hard to untangle. Nonetheless is useful forecasting to have an idea of how the future might look like, given the history. Remember though that

<blockquote class="wp-block-quote">
  <p>
    Past&nbsp;performance&nbsp;is&nbsp;no guarantee of future results
  </p>
</blockquote>

<div style="width:100%;height:0;padding-bottom:51%;position:relative;">
</div>

[via GIPHY](https://giphy.com/gifs/black-and-white-bw-jim-carrey-mEcpw2615iy5y)

### What is Facebook Prophet?

It&#8217;s an open source project first released in February 2017, that offers a forecasting procedure implemented with R and Python. It provides the ability to use human-interpretable parameters to improve the forecasts by adding your domain knowledge.The documentation and link to the code repository are available in the <a rel="noreferrer noopener" href="https://facebook.github.io/prophet/" data-type="URL" data-id="https://facebook.github.io/prophet/" target="_blank">project website</a>.

The docs in the website cover the quick start guide and extensive explanation of how to use the various features. 

### How does it work?

More information can be found in <a rel="noreferrer noopener" href="https://peerj.com/preprints/3190/" target="_blank">this paper</a>, but this is what the procedure is trying to do. Suppose we have a time-series y(t):

<div class="wp-block-mathml-mathmlblock">
  \[y(t)= g(t) + s(t) + h(t) + ε_t \]
</div>

with those components:

  * a trend g(t) that capture non periodic changes
  * a seasonal component s(t), which models for example weekly or yearly seasonality
  * a holiday component h(t), to account for the effect of holidays or other occurrences with potentially a more irregular schedule.

Using time as a regressor Prophet is trying to fit several linear and non linear functions of time as components, minimising the error.

### What are the benefits?

According to the website the main advantages are:

  * Simplify the approach to forecasting, as is robust to outliers, missing data, and dramatic changes in your time series
  * The model fitting uses <a rel="noreferrer noopener" href="https://mc-stan.org/" target="_blank">Stan</a>, which improve performance
  * It allows performance tuning to improve forecasting performance, using insight coming from the domain knowledge
  * It&#8217;s available in both R and Python and completely open source.

I&#8217;ll be using Python, as is the language I am more familiar with.

Success stories of using Prophet to scale forecasting, include Facebook themselves, but also [Starbucks](https://www.slideshare.net/NavinAlbert/how-starbucks-forecasts-demand-at-scale-with-facebook-prophet-and-databricks). 

### The steps

These are the steps you generically needs to go through if you want to forecast using Prophet, with Python:

  1. **[Setup]** Have an installation of Python 3 in your laptop compatible with Prophet
  2. **[Installation]** Install `fbprophet` and the dependencies (`pystan`)
  3. **[Time Series]** Have a time series in hand, in the form of a <a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/user_guide/dsintro.html#dataframe" target="_blank">DataFrame</a> (Python equivalent of a table) with one column for time and one for the value of the series at that point in time
  4. **[Exploratory Data Analysis]** Analyse seasonality, holiday effects, segmentation of your data.
  5. **[Predict]** Try out with forecasting with the default setting
  6. **[Diagnose]** Evaluate model performance, with the in-build [cross validation function](https://facebook.github.io/prophet/docs/diagnostics.html)
  7. **[Optimise]** Tune parameters and re-evaluate. Usually you predict, validate and tune in a loop, until you&#8217;re happy with the error.