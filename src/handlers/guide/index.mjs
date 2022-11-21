import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import arc from '@architect/functions'
const CONFIG_FILENAME = 'config.json'

export const handler = arc.http.async(async function () {
  // Just return the config for now
  const configPath = join(
    process.cwd(),
    'node_modules',
    '@architect',
    'shared',
    'enhance-styles',
    CONFIG_FILENAME,
  )
  const json = JSON.parse(readFileSync(configPath, { encoding: 'utf-8' }))
  // TODO: create an HTML style guide
  return { json }
})
