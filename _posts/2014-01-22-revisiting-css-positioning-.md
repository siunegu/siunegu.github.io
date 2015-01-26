---
layout: post
title: "Revisiting CSS Positioning"
date: 2014-01-22 14:59:00
categories: css
---

### Positioning
#### Static
Browser Default positioning.
> ** position: static; ** 
Is the Default for all elements.

#### Fixed 
Position something relative to the window object.
> ** position: fixed; ** 
Use fixed to specify the positioning of an element relative to the window.

When an element is fixed, that element goes into it's *own* layer. The normal flow of elements will flow on as if that element doesn't exist. 
Specify the ** fixed ** position with `top`,`left`,`bottom,`,`right`.

#### Relative
Used to adjust something relative to it's normal positioning. 
> ** position: relative; ** 
Offsets an element relative to it's normal default position.

Relative positioning is essentially to take an element, without removing it form the natural flow of the page, and shift it however much distance you specify 

To specify the ** offset **, use it together with `top`,`left`,`bottom,`,`right`.

_ Example: _
```
    h1 {
        position: relative;
        top: 5px;
        right: 5px;
    }
```
Elements will move a specified distance relative to it's original position, without affecting the rest of the page.

#### Absolute
Position something relative to it's parent object.
> ** position: absolute **
Aligns the element, in relation to it's parent element.

_ Example: _
```
    #container {
        /* blahblah - Stuff about the #container */
        position: relative;
    }
    img {
        /* blahblah - Stuff about the img elements on the page */
        position: absolute;
        top: 0;
        left: 0;
    }
        /* So here, the image knows to always sit at 
        the very top left of it's parent element. */
```
When you want an absolute positioned element to *honour* it's absolute positioning, it's ** parent ** element must be set to `position: relative` for this to take effect. 

A 'containing block' ( the first one with positioning attributes ) is effectively the first parent element that has a position spec other than 'static'. When no parent has any position spec, then it's relative to the html element.