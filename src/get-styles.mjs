import { join } from 'node:path'
import { readFileSync } from 'node:fs'

/**
 * Utility for plugin consumers to grab a link tag or inline styles
 * @param {boolean} [inline] return <style> tag for inline CSS
 * @returns {string} <style> or <link> tag
 */
export default function getStyles(inline = false) {
  if (inline) {
    const stylesFilePath = join(
      process.cwd(),
      'node_modules',
      '@architect',
      'shared',
      'enhance-styles',
      'styles.css',
    )

    let css
    try {
      css = readFileSync(stylesFilePath, { encoding: 'utf-8' })
    } catch (error) {
      css = '/* enhance-styles placeholder */'
    }

    return `<style>${css}</style>`
  }
  else {
    return '<link rel="stylesheet" href="/enhance-styles.css">'
  }
}
