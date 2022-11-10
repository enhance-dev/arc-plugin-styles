import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import arc from '@architect/functions'
const CSS_FILENAME = 'generated.css'

export const handler = arc.http.async(async function () {
  const stylesPath = join(
    process.cwd(),
    'node_modules',
    '@architect',
    'shared',
    'enhance-styles',
    CSS_FILENAME,
  )

  const css = readFileSync(stylesPath, { encoding: 'utf-8' })

  return {
    body: css,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'text/css; charset=utf8',
      'Expires': '0',
    },
    statusCode: 200,
  }
})
