const { readFileSync } = require('node:fs')
const { join } = require('node:path')
const defaultConfig = require('@enhance/styles/config.json')

/**
 * Create configuration for enhance-styles creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {{configPath: null|string, cwd: string, fileName: string, stylesConfig: string}}
 */
function createConfig ({ arc, inventory }) {
  const pluginConfig = Object.fromEntries(arc['enhance-styles'] || [])
  const cwd = inventory.inv._project.cwd
  // const fileName = pluginConfig?.filename || 'styles.css'
  const fileName = 'styles.css'

  let stylesConfig = null
  let configPath = null

  if (pluginConfig.config) {
    configPath = join(cwd, pluginConfig.config)
    stylesConfig = readFileSync(configPath, 'utf-8')
  }
  else {
    stylesConfig = JSON.stringify(defaultConfig)
  }

  return {
    cwd,
    configPath,
    fileName,
    stylesConfig,
  }
}

module.exports = createConfig
