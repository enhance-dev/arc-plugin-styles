const { readFileSync, writeFileSync, mkdirSync } = require('node:fs')
const path = require('node:path')
const defaultConfig = require('@enhance/styles/config.json')
const TEMP_DIR_NAME = 'tmp'

const hydrate = {
  async copy ({ arc, copy, inventory }) {
    const params = { arc, inventory }
    if (verify(params)) {
      const config = createConfig(params)
      const { filePath } = await generateAndSave(config)

      // console.log(
      //   'Saved CSS',
      //   `to ${filePath}`,
      // )

      await copy({
        source: TEMP_DIR_NAME, // relative to the project root
        target: '@architect/shared/enhance-styles',
      })
    }
  }
}

const sandbox = {
  async watcher (params) {
    if (verify(params)) {
      const { fileName } = params
      const config = createConfig(params)

      if (config.configPath && config.configPath === fileName) {
        await generateAndSave(config)
      }
    }
  }
}

/**
 * Verify the Arc project is configured for enhance-styles
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {boolean} is valid
 */
function verify ({ arc, inventory }) {
  const hasShared = inventory.inv.shared?.src
  const hasConfig = arc['enhance-styles']?.length > 0

  if (!hasShared) { console.warn('  Enhance Styles: Architect shared must be enabled') }
  if (!hasConfig) { console.warn('  Enhance Styles: @enhance-styles config required') }

  return hasShared && hasConfig
}

/**
 * Create configuration for enhance-styles creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns {{cwd: string, fileName: string, configPath: null|string, stylesConfig: string,}}
 */
function createConfig ({ arc, inventory }) {
  const pluginConfig = Object.fromEntries(arc['enhance-styles'] || [])
  const cwd = inventory.inv._project.cwd
  // const fileName = pluginConfig?.filename || 'styles.css'
  const fileName = 'styles.css'

  let stylesConfig = null
  let configPath = null

  if (pluginConfig.config) {
    configPath = path.join(
      cwd,
      pluginConfig.config,
    )
    stylesConfig = readFileSync(configPath, 'utf-8')
  }
  else {
    stylesConfig = JSON.stringify(defaultConfig)
  }

  return {
    cwd,
    fileName,
    configPath,
    stylesConfig,
  }
}

/**
 * Run enhance-styles and save result
 * @param {object} config
 * @param {string} config.cwd project working dir
 * @param {string} config.fileName output fileName .css
 * @param {string} config.stylesConfig stringified JSON Enhance Styles config
 * @param {boolean} write should write to disk
 * @returns {Promise<{generatedStyles: string, filePath: null|string}>}
 */
async function generateAndSave ({ cwd, fileName, stylesConfig }, write = true) {
  const { default: enhanceStyles } = await import('@enhance/styles')
  const generatedStyles = enhanceStyles(stylesConfig)

  let filePath = null
  if (write) {
    const outputDir = path.join(cwd, TEMP_DIR_NAME)
    filePath = path.join(outputDir, fileName)

    mkdirSync(outputDir, { recursive: true })
    writeFileSync(filePath, generatedStyles)
  }

  return { generatedStyles, filePath }
}

module.exports = { hydrate, sandbox }
