import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import arc from '@architect/functions'

export const handler = arc.http.async(async function () {
  // Just return the config for now
  const configPath = join(
    process.cwd(),
    'node_modules',
    '@architect',
    'shared',
    'enhance-styles',
    'config.json',
  )
  const json = JSON.parse(readFileSync(configPath, { encoding: 'utf-8' }))
  // TODO: create an HTML style guide
  return { json }
})
