# `@enhance/arc-plugin-styles`

Plugin for generating [Enhance CSS utility classes](https://github.com/enhance-dev/enhance-styles) in an [Architect](https://arc.codes) app.

## Install

```
npm i @enhance/arc-plugin-styles
```

## Usage

### Setup

In your `app.arc` file:

```arc
@app
my-arc-app

# Define your plugins pragma and add the enhance-styles plugin
@plugins
enhance/arc-plugin-styles

# Enable the plugin
@enhance-styles
# with an optional JSON config:
config ./enhance-styles.json
```

> Configure `enhance-styles` by providing a .json file with the `config` option. See the [enhance-styles documentation](https://github.com/enhance-dev/enhance-styles).

### Utility functions

Utility functions are provided to access your generated stylesheet:

```js
import { getStyles } from '@enhance/arc-plugin-styles'

getStyles.linkTag()   // a <link rel="stylesheet"> tag
getStyles.styleTag()  // a <style> tag for inline styles
getStyles.path()      // root-relative path to the .css file
```

`getAll()` is also available to create an object with each result:

```js
import { getStyles } from '@enhance/arc-plugin-styles'

const styles = getStyles.all()
styles.link    // a <link rel="stylesheet"> tag
styles.style   // a <style> tag for inline styles
styles.path    // root-relative path to the .css file
```

## Roadmap

/_styleguide

## Development

### Experimental releases

Since this plugin is used in parent plugins (namely Enhance), it can be helpful to distribute a version via npm.

1. in a feature branch, create a commit and copy the SHA
1. set the `"version"` in package.json like `0.0.0-experimental-<SHA>`
1. publish with the experimental tag: `npm publish --tag experimental`
