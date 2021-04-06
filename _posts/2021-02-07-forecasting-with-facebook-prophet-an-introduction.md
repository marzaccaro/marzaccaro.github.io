---
id: 418
title: Forecasting with Facebook Prophet, an introduction.
date: 2021-02-07T17:59:52+00:00
author: Martina Z
layout: post
guid: http://foodfordata.com/?p=418
permalink: /2021/02/07/forecasting-with-facebook-prophet-an-introduction/
categories:
  - Python
---

[Time series](https://en.wikipedia.org/wiki/Time_series#:~:text=Most%20commonly%2C%20a%20time%20series,the%20Dow%20Jones%20Industrial%20Average.){:target="blank_"} analysis and forecasting are useful in so many contexts, from economy to demographics, and in all the scenarios where you have a sequence of observations that are indexed over time. Examples include the number of Covid-19 cases per day (sadly we are all too familiar with this), the number of pizzas served in a day by a restaurant (this makes me happier), or again the average daily temperature. 

Often in business scenarios, there is a need for forecasting demand, orders, or revenue, and sometimes just assuming a linear pattern doesn't account for seasonality and change in trend. Plus having a quicker and more reliable way to forecast allows businesses to adapt faster to change - improving their planning and spending. 

Forecasting has proven especially challenging during Covid-19, as the pandemic was totally unpredictable and made planning for 2020 and beyond really hard. Nonetheless forecasting is useful to have an idea of how the future might look like, given the history. 

Remember that

> Past performance is no guarantee of future results

but using Prophet you feel a little bit like:

<div style="width:100%;height:0;padding-bottom:51%;position:relative;"><iframe src="https://giphy.com/embed/mEcpw2615iy5y" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/black-and-white-bw-jim-carrey-mEcpw2615iy5y">via GIPHY</a></p>

### What is Facebook Prophet?

Facebook Prophet it's an open-source project first released in February 2017, that offers a forecasting procedure implemented with R and Python. It provides the ability to use human-interpretable parameters to improve the forecasts by adding your domain knowledge. The documentation, tutorials, and all relevant links to the code repository are available on the [project website](https://facebook.github.io/prophet/){:target="blank_"}.

{% include figure.html image="/assets/uploads/prophet-pic.png" caption="Prophet project page homepage" width=1024 height=280 %}

### How does it work?

More information can be found in [this paper](https://peerj.com/preprints/3190/){:target="blank_"}, but this is what the procedure is trying to do. Suppose we have a time-series `y(t)`:

```
  y(t)= g(t) + s(t) + h(t) + ε(t) 
```

with those components:

  * a trend `g(t`) that capture non-periodic changes
  * a seasonal component `s(t)`, which models for example weekly or yearly seasonality
  * a holiday component `h(t)`, to account for the effect of holidays or other occurrences with potentially a more irregular schedule.

Using time as a regressor Prophet is trying to fit several linear and non linear functions of time as components, minimising the error `ε(t)`.

### What are the benefits?

According to the website the main advantages are:

  * Simplify the approach to forecasting, as is robust to outliers, missing data, and dramatic changes in your time series
  * The model fitting uses [Stan](https://mc-stan.org/){:target="blank_"}, which improve performance
  * It allows performance tuning using insight coming from the domain knowledge
  * It's available in both R and Python and completely open-source.

I'll be using Python, as is the language I am more familiar with.

Success stories of using Prophet to scale forecasting, include Facebook themselves, but also [Starbucks](https://www.slideshare.net/NavinAlbert/how-starbucks-forecasts-demand-at-scale-with-facebook-prophet-and-databricks){:target="blank_"}. 

### The steps

These are the steps you generally need to follow if you want to generate a forecast for a time series using Prophet, with Python:

  1. **Setup**. Have an installation of Python 3 in your laptop compatible with Prophet
  2. **Installation**. Install Facebook Prophet
  3. **Time Series**. Have a time series in hand, in the form of a [DataFrame](https://pandas.pydata.org/pandas-docs/stable/user_guide/dsintro.html#dataframe){:target="blank_"} (Python equivalent of a table) with one column for time and one for the value of the series at that point in time
  4. **Exploratory Data Analysis**. Analyse seasonality, holiday effects, or eventual segmentation of your series.
  5. **Predict**. Try out with forecasting with the default setting
  6. **Diagnose**. Evaluate model performance, with the in-build [cross-validation function](https://facebook.github.io/prophet/docs/diagnostics.html){:target="blank_"}
  7. **Optimise**. Tune parameters and re-evaluate. Usually, you predict, validate, and tune in a loop, until you're happy with the error.

I'll show an example following these steps in another post.
