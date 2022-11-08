import { join } from 'node:path'
import { readFileSync } from 'node:fs'

// * utility for plugin consumers to grab a link tag or inline styles
export default function getStyles() {
  const tmpDir = new URL('../tmp', import.meta.url).pathname;
  console.log('tmpDir', tmpDir)

  const here = join(process.cwd(), 'tmp')
  console.log('here', here)

  // TODO: check for styles in node_modules/@architect/enhance-styles

  const checkPath = join(here, 'styles.css')
  let css = '/* enhance-styles placeholder */'

  try {
    console.log('checkPath', checkPath)
    css = readFileSync(checkPath, { encoding: 'utf-8' })
  } catch (error) {
    console.log('no css found')
  }

  return `<style>${css}</style>`
}
