// eslint-disable-next-line
require = require('esm')(module)

const { writeFileSync } = require('fs')
const path = require('path')
const enhanceStyles = require('@enhance/styles/index.mjs').default

const sandbox = {
  start (params) {
    verify(params)
    generateAndSave(createConfig(params))
  },
}

const deploy = {
  start (params) {
    verify(params)
    generateAndSave(createConfig(params))

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
  // TODO: helpful error if inventory doesn't have static or static.folder
  return inventory.inv.static?.folder && arc['enhance-styles']?.length > 0
}

/**
 * Create configuration for enhance-styles creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {object} config
 */
function createConfig ({ arc, inventory }) {
  const pluginConfig = Object.fromEntries(arc['enhance-styles'])
  const filename = pluginConfig?.filename || 'styles.css'
  const pathToStaticStyles = path.join(
    inventory.inv._project.cwd,
    inventory.inv.static.folder,
    filename,
  )

  // TODO: read pluginConfig.config, return as stylesConfig

  return {
    stylesConfig: {},
    path: pathToStaticStyles,
  }
}

/**
 * Run enhance-styles and save result
 * @param {object} config
 * @param {object} config.stylesConfig
 * @param {string} config.path
 */
function generateAndSave ({ stylesConfig, path }) {
  const styles = enhanceStyles(JSON.stringify(stylesConfig))
  writeFileSync(path, styles)
}

module.exports = { sandbox, deploy }
