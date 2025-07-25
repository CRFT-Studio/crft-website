---
layout: ../../layouts/PostLayout.astro
title: 'Dynamically track query (UTM) parameters and pass them in forms'
pubDate: 'May 5, 2024'
description: 'Learn how to capture UTM parameters from URLs and automatically pass them through forms using JavaScript and local storage to track marketing attribution.'
author: ['Jeremy', 'David']
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["Client Work"]
---
Many months ago, the team over at MobiLoud wanted a way to know which of their paid ads their demo call bookings came from.

By default, UTM parameters were being appended to the landing page URL that the ads took visitors to, but that information was soon lost the moment they navigated to a different page.

And that's intended, because it turns out Google Analytics 4 marks the presence of UTM parameters in a URL as the start of a new browsing session.

So instead of making UTMs persists across all subsequent URLs people visit, we decided to write some JavaScript that:

1. Let's us define which query parameters we care about. We've included all UTM parameters by default, but you can include any kind that you like.
2. Saves the specified parameters from the current URL to the visitor's local storage.
3. Creates a hidden field with the name and value of each query parameter in all forms with class .passTrackedParams.

Here's our code:

```html
<script type="text/javascript">
  $(() => {
    var trackedParams = ["utm_source", "utm_campaign", "utm_medium", "utm_term", "utm_content"];
    var queryParams = new URLSearchParams(window.location.search);
    for (var p of queryParams)
      if (trackedParams.includes(p[0]))
        localStorage.setItem(p[0], p[1]);
    for (var p of trackedParams)
      if (Object.hasOwn(localStorage, p))
        $("form.pass-tracked-params")
          .append(`<input type="hidden" id="${p}" name="${p}" value="${localStorage.getItem(p)}"/>`);
  });
</script>
```

To make use of it, make sure to add it before the </body> tag in all of your pages, and add the class .passTrackedParams to each of the forms you want query parameters added to!

Now, no matter how long after someone books a MobiLoud demo after visiting their website from an ad, the team will always know which of their marketing efforts to attribute that call to. And they have one convenient place to interpret that data--their form submissions.

Found this post useful? Contact us and let's work together on your marketing website.
