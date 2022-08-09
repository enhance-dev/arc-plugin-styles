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

### getStyles
Call the `getStyles` function to get either a link tag or a style tag for your utility css file.

It takes two arguments, the name of your output utility css file and a configuration object for enhance styles.
```
const stylesFileName = 'utility-classes.css'
const config = {
  base: 20,
  scale: {
    ratio: 'goldenRatio',
    steps: 12
  },
  fonts: {
    sans: "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif",
    serif: "Georgia,Cambria,Times New Roman,Times,serif",
    mono: "Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace"
  },
  base: 20,
  steps: 8,
  theme: {
    light: "#fff",
    dark: "#222",
    primary: "#1f74d6",
    secondary: "#7327ce",
    success: "#2cdd93",
    info: "#2196f3",
    warning: "#ffeb3b",
    error: "#e21893"
  }
}
const styles = getStyles(stylesFileName, config)
console.log(styles)

```
