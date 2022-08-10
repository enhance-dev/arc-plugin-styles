// eslint-disable-next-line
require = require('esm')(module)

const { readFileSync, writeFileSync } = require('fs')
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
  // TODO: helpful error if @enhance-styles not set in arc
  return inventory.inv.static?.folder && arc['enhance-styles']?.length > 0
}

/**
 * Create configuration for enhance-styles creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {{stylesConfig: string, path: string}}
 */
function createConfig ({ arc, inventory }) {
  const pluginConfig = Object.fromEntries(arc['enhance-styles'] || [])
  const filename = pluginConfig?.filename || 'styles.css'
  const pathToStaticStyles = path.join(
    inventory.inv._project.cwd,
    inventory.inv.static.folder,
    filename,
  )

  let pathToConfig
  if (pluginConfig.config) {
    pathToConfig = path.join(
      inventory.inv._project.cwd,
      pluginConfig.config,
    )
  }
  else {
    pathToConfig = path.join(
      __dirname,
      '..',
      'styles',
      'config.json'
    )
  }

  let stylesConfig = readFileSync(pathToConfig, 'utf-8')

  return {
    stylesConfig,
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
  const styles = enhanceStyles(stylesConfig)
  writeFileSync(path, styles)
}

module.exports = { sandbox, deploy }
