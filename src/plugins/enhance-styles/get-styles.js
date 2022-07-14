const enhanceStyles = require('@enhance/styles')

module.exports = function getStyles() {
  return process.env.ARC_LOCAL
    ? `<link rel="stylesheet" href="/_static/styles.css">`
    : `
<style>
${enhanceStyles()}
</style>
    `
}
