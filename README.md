# `arc-plugin-enhance-styles`

Plugin for generating Enhance CSS utility classes in an [Architect](https://arc.codes) app.

## Install

`npm i @enhance/arc-plugin-enhance-styles`

## Usage

In your `app.arc` file:

```arc
@app
enhnc-styl

# Define your plugins pragma and add the enhance-styles plugin
@plugins
enhance/arc-plugin-enhance-styles

# Define the styles pragma
@enhance-styles
filename utilities.css # defaults to "styles.css"
config ./enhance-styles.json # WIP
``` 

> Update the config.json file to include your settings. See the [enhance-styles documentation](https://github.com/enhance-dev/enhance-styles).

You will now be able to load a utility css file from

```html
<link rel="stylesheet" href="_styles/styles.css">
```
