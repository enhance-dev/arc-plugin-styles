#`plugin-enhance-styles`
Plugin for generating enhance CSS utility classes.

## Install
`npm i @enhance/plugin-enhance-styles`

## Usage
In your `app.arc` file:
``` architect
@app
enhnc-styl

# Define you plugins pragma
@plugins
# Add the enhance-styles plugin module
enhance/plugin-enhance-styles
```

# Define the styles pragma
@enhance-styles
# Optionally add a path to the config.json file to use
./config.json
``` 
> Update the config.json file to include your settings.
> See the [enhance-styles documentation](https://github.com/enhance-dev/enhance-styles)

You will now be able to load a utility css file from 
`<link rel="stylesheet" href="_styles/index.css">`