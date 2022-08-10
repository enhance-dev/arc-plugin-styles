# `arc-plugin-styles`

Plugin for generating Enhance CSS utility classes in an [Architect](https://arc.codes) app.

## Install

`npm i @enhance/arc-plugin-styles`

## Usage

In your `app.arc` file:

```arc
@app
enhnc-styl

# Define your plugins pragma and add the enhance-styles plugin
@plugins
enhance/arc-plugin-styles

# Define the styles pragma
@enhance-styles
filename utilities.css # defaults to "styles.css"
config ./enhance-styles.json
```

> Configure `enhance-styles` by providing a .json file with the `config` option. See the [enhance-styles documentation](https://github.com/enhance-dev/enhance-styles).

You will now be able to load a utility css file from

```html
<link rel="stylesheet" href="/_static/utilities.css">
```
