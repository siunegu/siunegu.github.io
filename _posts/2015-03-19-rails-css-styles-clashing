---
layout: post
title: "Rails & CSS: common random issues, bootstrap and custom styles."
date: 2015-03-14 18:40:00
categories: wistia uploader command line utility api 
---

Been meaning to make a little post about the random CSS x Rails issues that pop up here out of no where blindsiding you when you least expect it. I was recently showing a friend of mine a recent rails app that I built, and came across a point where upon clicking on a prompt for a dropdown menu, the plugin refused to work. I'd used the Bootstrap Dropdown menu, and over and over again it would just decide to be 'untouchable', refusing to be told what to do. 

It could have been sprockets, or it could have been my including the Bootstrap CDN. So it turned out that after requiring Bootstrap via [CDNJS](http://www.bootstrapcdn.com/), before the rest of the links:

```
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

```

I then had to import Bootstrap in our **application.scss** 

```
// Bootstrap
@import "bootstrap-sprockets";
@import "bootstrap";
```
We had to make sure sprockets was required before bootstrap itself.

And make sure that I was requiring 'self', before requiring 'tree .' so that we were loading our css dependencies in the current file before loading the other assets in our stylesheets directory, like so:

```
 *= require_self
 *= require_tree .
...  
``` 
This should also fix any instance of your custom styles and overrides not loading in your CSS files, for say example, trying to patch over a default Bootstrap class. 
