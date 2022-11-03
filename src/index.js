const { readFileSync, writeFileSync } = require('node:fs')
const path = require('node:path')

const sandbox = {
  async start (params) {
    if (verify(params)) {
      const config = createConfig(params)
      await generateAndSave(config)
    }
  },
  async watcher (params) {
    if (verify(params)) {
      const { filename } = params
      const config = createConfig(params)

      if (filename === config.pathToConfig) {
        await generateAndSave(config)
      }
    }
  }
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
  const hasStatic = inventory.inv.static?.folder
  const hasConfig = arc['enhance-styles']?.length > 0

  if (!hasStatic) { console.warn('  Enhance Styles: Architect static must be enabled') }
  if (!hasConfig) { console.warn('  Enhance Styles: @enhance-styles config required') }

  return hasStatic && hasConfig
}

/**
 * Create configuration for enhance-styles creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {{stylesConfig: string, path: string, pathToConfig: null|string}}
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
      '..',
      'styles',
      'config.json'
    )
  }

  let stylesConfig = readFileSync(pathToConfig, 'utf-8')

  return {
    stylesConfig,
    path: pathToStaticStyles,
    pathToConfig,
  }
}

/**
 * Run enhance-styles and save result
 * @param {object} config
 * @param {object} config.stylesConfig
 * @param {string} config.path
 */
async function generateAndSave ({ stylesConfig, path }) {
  const { default: enhanceStyles } = await import('@enhance/styles')
  const styles = enhanceStyles(stylesConfig)
  writeFileSync(path, styles)
}

module.exports = { sandbox, deploy }
