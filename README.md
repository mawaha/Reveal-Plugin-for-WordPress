Reveal Shortcodes Plugin for WordPress
===========================

Shortcode suport for inline modal boxes when using Zurb's Reveal plugin with WordPress.

-Easy to use Tiny MCE interface


## How to use

All you do is click the new button on your wp_editor to insert the shortcodes, or add them manually like this:

```html
[reveal id="reveal-example"]

Some other content.
 
[/reveal]
```

There is an optional link attribute to the shortcode which creates a text link automatically, but I prefer to add my links manually as that gives me a bit more control.

All you need to do is create an ordinary link with `href="#"` and give it a new attribute of `data-reveal-id="whatever-your-reveal-id-is"`.
