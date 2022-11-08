@app
styl-mock

@static
folder ./dist
fingerprint true

@http
get /

@plugins
enhance/arc-plugin-styles
  src ../..

@enhance-styles
filename utility-classes.css
config styles-config.json
