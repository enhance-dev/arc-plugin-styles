import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import arc from '@architect/functions'

export const handler = arc.http.async(async function () {
  const stylesPath = join(
    process.cwd(),
    'node_modules',
    '@architect',
    'shared',
    'enhance-styles',
    'styles.css',
  )
  const css = readFileSync(stylesPath, { encoding: 'utf-8' })
  return { css }
})
