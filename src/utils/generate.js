const { writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')
const TEMP_DIR_NAME = 'tmp'

/**
 * Run enhance-styles and save result
 * @param {object} config
 * @param {null|string} config.configPath styles config path, if provided
 * @param {string} config.cwd project working dir
 * @param {string} config.fileName output fileName .css
 * @param {string} config.stylesConfig stringified JSON Enhance Styles config
 * @param {boolean} write should write to disk
 * @returns {Promise<{generatedStyles: string, filePath: null|string}>}
 */
async function generateAndSave (
  { configPath, cwd, fileName, stylesConfig },
  write = true,
) {
  const { default: enhanceStyles } = await import('@enhance/styles')
  const generatedStyles = enhanceStyles(stylesConfig)

  let filePath = null
  if (write) {
    const outputDir = join(cwd, TEMP_DIR_NAME)
    filePath = join(outputDir, fileName)

    mkdirSync(outputDir, { recursive: true })
    writeFileSync(filePath, generatedStyles)
    if (configPath) {
      // cache user config, if provided, to inform style guide display
      writeFileSync(join(outputDir, 'config.json'), stylesConfig)
    }
  }

  return { generatedStyles, filePath }
}

module.exports = generateAndSave
