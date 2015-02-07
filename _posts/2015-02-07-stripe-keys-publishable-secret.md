---
layout: post
title: "A note about Charging with Stripe, secret and publishable keys"
date: 2015-02-07 15:29:00
categories: css
---


Stripe Billing
===
@(Brief Guides)[subscription | model]

I found this out while following the official stripe documentation to add stripe API keys to my rails app. 
So far I set up my environment variables and am pulling it into `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.

**"What’s the difference between my secret key and my publishable key?"**
Secret and publishable keys are used to identify your Stripe account.

You can grab the test and live API keys for your account under Your Account >> API Keys.

The publishable key is used to generate credit card tokens and should be included with the HTML form. The secret key is used for all other API calls on the server-side.

In  your new charges form views/charges/new.html.erb
```html
  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
          data-key="<%= Rails.configuration.stripe[:secret_key] %>"
          data-description="A month's subscription"
          data-amount="500"></script>
```
Note it says `:secret_key`
And on the server side on config/initializers/stripe.rb
```
Rails.configuration.stripe = {
  :publishable_key => ENV['STRIPE_PUBLISHABLE_KEY'],
  :secret_key      => ENV['STRIPE_SECRET_KEY']
}

Stripe.api_key = Rails.configuration.stripe[:publishable_key]
```
Note it says `:publishable_key`