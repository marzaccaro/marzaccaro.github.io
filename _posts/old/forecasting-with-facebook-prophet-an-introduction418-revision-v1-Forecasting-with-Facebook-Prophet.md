---
id: 442
title: Forecasting with Facebook Prophet
date: 2021-02-07T17:32:58+00:00
author: Martina Z
layout: revision
guid: https://foodfordata.com/2021/02/07/418-revision-v1/
permalink: /2021/02/07/418-revision-v1/
---
<a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Time_series#:~:text=Most%20commonly%2C%20a%20time%20series,the%20Dow%20Jones%20Industrial%20Average." target="_blank">Time series</a> analysis and forecasting are useful in so many contexts, from economy to demographics, and in all the scenarios where you have a sequence of observations that are indexed over time. Examples include the number of Covid-19 cases per day (sadly we are all too familiar with this), the number of pizzas served in a day by a restaurant (this makes me happier), or again the average daily temperature. 

Often in business scenarios, there is a need for forecasting demand, orders, or revenue, and sometimes just assuming a linear pattern doesn&#8217;t account for seasonality and change in trend. Plus having a quicker and more reliable way to forecast allows businesses to adapt faster to change &#8211; improving their planning and spending. 

Forecasting has proven especially challenging during Covid-19, as the pandemic was totally unpredictable and made planning for 2020 and beyond really hard. Nonetheless forecasting is useful to have an idea of how the future might look like, given the history. 

Remember that

<blockquote class="wp-block-quote">
  <p>
    Past performance is no guarantee of future results
  </p>
</blockquote>

but using Prophet you feel a little bit like:

<div style="width:100%;height:0;padding-bottom:51%;position:relative;">
</div>

[via GIPHY](https://giphy.com/gifs/black-and-white-bw-jim-carrey-mEcpw2615iy5y)

### What is Facebook Prophet?

Facebook Prophet It&#8217;s an open-source project first released in February 2017, that offers a forecasting procedure implemented with R and Python. It provides the ability to use human-interpretable parameters to improve the forecasts by adding your domain knowledge. The documentation, tutorials, and all relevant links to the code repository are available on the <a rel="noreferrer noopener" href="https://facebook.github.io/prophet/" data-type="URL" data-id="https://facebook.github.io/prophet/" target="_blank">project website</a>.<figure class="wp-block-image size-large">

<img width="1024" height="280" src="https://foodfordata.com/wp-content/uploads/2021/02/Screenshot-from-2021-02-07-17-30-02-1024x280.png" alt="" class="wp-image-441" srcset="http://foodfordata.com/wp-content/uploads/2021/02/Screenshot-from-2021-02-07-17-30-02-1024x280.png 1024w, http://foodfordata.com/wp-content/uploads/2021/02/Screenshot-from-2021-02-07-17-30-02-300x82.png 300w, http://foodfordata.com/wp-content/uploads/2021/02/Screenshot-from-2021-02-07-17-30-02-768x210.png 768w, http://foodfordata.com/wp-content/uploads/2021/02/Screenshot-from-2021-02-07-17-30-02.png 1483w" sizes="(max-width: 1024px) 100vw, 1024px" /> <figcaption>Prophet project page homepage</figcaption></figure> 

### How does it work?

More information can be found in <a rel="noreferrer noopener" href="https://peerj.com/preprints/3190/" target="_blank">this paper</a>, but this is what the procedure is trying to do. Suppose we have a time-series y(t):

<div class="wp-block-mathml-mathmlblock">
  \[y(t)= g(t) + s(t) + h(t) + ε_t \]
</div>

with those components:

  * a trend g(t) that capture non-periodic changes
  * a seasonal component s(t), which models for example weekly or yearly seasonality
  * a holiday component h(t), to account for the effect of holidays or other occurrences with potentially a more irregular schedule.

Using time as a regressor Prophet is trying to fit several linear and non linear functions of time as components, minimising the error.

### What are the benefits?

According to the website the main advantages are:

  * Simplify the approach to forecasting, as is robust to outliers, missing data, and dramatic changes in your time series
  * The model fitting uses <a rel="noreferrer noopener" href="https://mc-stan.org/" target="_blank">Stan</a>, which improve performance
  * It allows performance tuning to improve forecasting performance, using insight coming from the domain knowledge
  * It&#8217;s available in both R and Python and completely open-source.

I&#8217;ll be using Python, as is the language I am more familiar with.

Success stories of using Prophet to scale forecasting, include Facebook themselves, but also [Starbucks](https://www.slideshare.net/NavinAlbert/how-starbucks-forecasts-demand-at-scale-with-facebook-prophet-and-databricks). 

### The steps

These are the steps you generically needs to go through if you want to forecast a time series using Prophet, with Python:

  1. **Setup**. Have an installation of Python 3 in your laptop compatible with Prophet
  2. **Installation**. Install Facebook Prophet
  3. **Time Series**. Have a time series in hand, in the form of a <a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/user_guide/dsintro.html#dataframe" target="_blank">DataFrame</a> (Python equivalent of a table) with one column for time and one for the value of the series at that point in time
  4. **Exploratory Data Analysis**. Analyse seasonality, holiday effects, segmentation of your data.
  5. **Predict**. Try out with forecasting with the default setting
  6. **Diagnose**. Evaluate model performance, with the in-build [cross-validation function](https://facebook.github.io/prophet/docs/diagnostics.html)
  7. **Optimise**. Tune parameters and re-evaluate. Usually, you predict, validate, and tune in a loop, until you&#8217;re happy with the error.