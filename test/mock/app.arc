@app
styl-mock

@static
fingerprint true

@http
get /

@plugins
enhance/arc-plugin-enhance-styles
  src ../..

@enhance-styles
filename utility-classes.css
config ./enhance-styles.json
