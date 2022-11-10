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

### Utility functions - `getStyles()`

A utility function is provided to access your generated stylesheet.

```js
import getStyles from '@enhance/arc-plugin-styles/get-styles'

const styles = getStyles()
styles.link    // a <link rel="stylesheet"> tag
styles.style   // a <style> tag for inline styles
styles.path    // root-relative path to the .css file
```

Furthermore, individual methods can be imported:

```js
import {
  getLinkTag,
  getStyleTag,
  getPath,
} from '@enhance/arc-plugin-styles/get-styles'

getLinkTag()   // a <link rel="stylesheet"> tag
getStyleTag()  // a <style> tag for inline styles
getPath()      // root-relative path to the .css file
```

## Roadmap

/_styleguide
