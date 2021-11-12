---
title: Forcasting with Facebook Prophet, an example 
date: 2021-10-01T07:00:00+00:00
author: Martina Z
layout: post
categories:
  - Python
---

This is the second part of the post about forecasting with Facebook Prophet. There are a few things to do if you want to repeat this same experiment.

### Setup: installing `pyenv`

First you need to have installed in your laptop a Python installation compatible with [Facebook Prophet](add link).

It's a good idea if you have different python projects, using different python versions in your laptop to install [`pyenv`](add link).

For more context about python environments, I found [this Medium article](https://towardsdatascience.com/python-environment-101-1d68bda3094d) especially helpful. 

My go to guide to install `pyenv` is this post [Managing Multiple Python Versions With pyenv]( https://realpython.com/intro-to-pyenv/?utm_source=pocket_mylist) in the __Real Python__ website.

Here the list of commands you'll need to type:

1. [Install the dependencies](https://realpython.com/intro-to-pyenv/#build-dependencies). The command here will depend on the OS you are using. I used this for **Ubuntu**

    ```
    sudo apt-get install -y make build-essential libssl-dev zlib1g-dev \
    libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev \
    libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev python-openssl
    ```


2. [Install pyenv](https://realpython.com/intro-to-pyenv/#using-the-pyenv-installer) 

    ```
    curl https://pyenv.run | bash
    ```

3. Add `pyenv` to the load path, adding this snippet to your `~/.bashrc`

    ```
    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"
    ```

4. Exit the terminal or type in the terminal, to make sure the changes above are effective

    ```
    exec "$SHELL"
    ```

After you completed these steps you should be able to run successfully the following command 
```
pyenv versions
```

Ok now you set yourself up to use different python versions (and environments) for different folders in your laptop.

### Installation: installing Jupyer Notebook (with `prophet` and `pandas`)

After you're all set with `pyenv` you can create an environment for your forecasting project.

1. Create a folder called `fb-prophet`

    ```
    mkdir fb-prophet 
    cd fb-prophet
    ```

2. Create a virtual environment with a python version >=3 for `prophet` compatibility (after installing the python version you want).

    ```
    pyenv install 3.8.12
    pyenv virtualenv 3.8.12 fb-prophet

    ```
3. Make sure the environment is loaded locally in your folder, whenever you are inside the folder.

    ```
    pyenv local fb-prophet
    ```

4. Install Jupyter notebook, more details [here](https://jupyter.org/install.html)

    ```
    pip install notebook
    ```

5. Install `pandas` and `plotly` for interactive charts (this was giving some errors later, if missing and I'll need it anyway!)

    ```
    pip install pandas
    ```

4. Install prophet and dependedencies, more details [here](https://facebook.github.io/prophet/docs/installation.html#python)

    ```
    # bash
    # Install pystan with pip before using pip to install prophet
    # pystan>=3.0 is currently not supported
    pip install pystan==2.19.1.1
    pip install prophet
    ```

<!-- 
Maybe is actually better to generate all of this with pipenv, actually - give it a go!
 -->

Verify that you have all the things you need, using `pip show <module name>` ie:

```
pip show notebook
pip show pandas
pip show prophet
```

### Find a timeseries you want to forecast

There are many public data sets out there, you could even use the one that the [prophet tutorial](https://facebook.github.io/prophet/docs/quick_start.html#python-api) is using.
For my example I'll use a public datasource from the Google Analytics Demo accounts [here](https://support.google.com/analytics/answer/6367342?hl=en#access&zippy=%2Cin-this-article), I did download an extract of all sessions count from January 2018 to October 2021, which are the result of tracking of this [Google Merchandise Store](https://shop.googlemerchandisestore.com/?utm_source=partners&utm_medium=affiliate&utm_campaign=data%20share%20article).

For convenience I loaded those into a csv, which you can find [here](add link when you load repo)

### Forecasting Sessions for Google Merchandise

Ok, now we can start forecasting our time series. Let's start! You can follow along all of this if you install this...


### Diagnose







