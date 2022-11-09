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
config styles-config.json
