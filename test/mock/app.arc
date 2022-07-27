@app
styl-mock

@static
fingerprint true

@http
get /

@plugins
arc-plugin-enhance-styles
  src ../..

@enhance-styles
filename utility-classes.css
