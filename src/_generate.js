const { writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')
const TEMP_DIR_NAME = '.enhance'
const CSS_FILENAME = 'generated.css'
const CONFIG_FILENAME = 'config.json'

/**
 * Run enhance-styles and save result
 * @param {object} config
 * @param {string} config.cwd project working dir
 * @param {string} config.stylesConfig stringified JSON Enhance Styles config
 * @param {boolean} write should write to disk
 * @returns {Promise<{generatedStyles: string, filePath: null|string}>}
 */
async function generateAndSave ({ cwd, stylesConfig }, write = true) {
  const { default: enhanceStyles } = await import('@enhance/styles')
  const generatedStyles = enhanceStyles(stylesConfig)

  let filePath = null
  if (write) {
    const outputDir = join(cwd, TEMP_DIR_NAME)
    filePath = join(outputDir, CSS_FILENAME)

    mkdirSync(outputDir, { recursive: true })
    writeFileSync(filePath, generatedStyles)
    writeFileSync(join(outputDir, CONFIG_FILENAME), stylesConfig)
  }

  return { generatedStyles, filePath }
}

module.exports = generateAndSave
