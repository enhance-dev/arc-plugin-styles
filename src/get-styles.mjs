import { join } from 'node:path'
import { readFileSync } from 'node:fs'
const CSS_FILENAME = 'generated.css'
const PATH = '/enhance-styles.css'
let css = null

/**
 * Utility for plugin consumers to grab a link tag or inline styles
 * @returns {{style: string, link: string, path: string}}
 */
export default function getStyles() {
  return {
    style: getStyleTag(),
    link: getLinkTag(),
    path: getPath(),
  };
}

/** @returns {string} <style> tag with all generated utility classes */
export const getStyleTag = function () {
  if (!css) {
    const stylesFilePath = join(
      process.cwd(),
      'node_modules',
      '@architect',
      'shared',
      'enhance-styles',
      CSS_FILENAME,
    );

    css = readFileSync(stylesFilePath, { encoding: 'utf-8' })
  }

  return `<style>${css}</style>`
}

/** @returns {string} <link> tag with reference to generated stylesheet */
export const getLinkTag = function () {
  return `<link rel="stylesheet" href="${PATH}">`
}

/** @returns {string} root-relative path to stylesheet */
export const getPath = function () {
  return PATH
}
