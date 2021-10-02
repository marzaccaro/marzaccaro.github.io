---
title: Forcasting with Facebook Prophet, an example 
date: 2021-10-01T07:00:00+00:00
author: Martina Z
layout: post
categories:
  - Python
---

This is the second part of the post about forecasting with Facebook Prophet. There are a few things to do if you want to repeat this same experiment.

### Prerequisites

#### Installing `pyenv`

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

#### Installing Jupyer (with Prophet)

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

4. Install Jupyter notebook, more details [here]()