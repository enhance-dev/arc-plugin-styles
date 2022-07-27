// eslint-disable-next-line
require = require('esm')(module)

const { writeFileSync } = require('fs')
const path = require('path')
const enhanceStyles = require('@enhance/styles/index.mjs').default

const sandbox = {
  start (params) {
    verify(params)
    generateAndSave(params)
  },
}

const deploy = {
  start (params) {
    verify(params)
    generateAndSave(params)

    // always return cloudformation
    return params.cloudformation
  },
}

/**
 * Verify the Arc project is configured for enhance-styles
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {boolean} is valid
 */
function verify ({ arc, inventory }) {
  // TODO: error if inventory doesn't have static or static.folder
  return inventory.inv.static?.folder && arc.styles?.length > 0
}

/**
 * Run enhance-styles and save result
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 */
function generateAndSave ({ arc, inventory }) {
  let filename = 'styles.css'
  if (
    arc.styles.length > 0
    && arc.styles[0]
    && arc.styles[0][0] === 'filename'
  ) {
    filename = arc.styles[0][1]
  }

  const pathToStaticStyles = path.join(
    inventory.inv._project.cwd,
    inventory.inv.static.folder,
    filename,
  )
  // TODO: provide enhance-styles config
  const styles = enhanceStyles(JSON.stringify({}))

  writeFileSync(pathToStaticStyles, styles)
}

module.exports = { sandbox, deploy }
