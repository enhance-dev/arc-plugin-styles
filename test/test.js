const { join } = require('node:path')
const { unlinkSync } = require('node:fs')
const { get } = require('tiny-json-http')
const test = require('tape')
const sandbox = require('@architect/sandbox')

const workingDirectory = join(process.cwd(), 'test', 'mock')
const port = 6661
const stylesFileName = 'utility-classes.css' // configured in mock/app.arc
const url = (path) => `http://localhost:${port}${path}`

test(`Start Arc Sandbox in ${workingDirectory}`, async t => {
  t.plan(1)
  await sandbox.start({
    // quiet: true,
    cwd: workingDirectory,
    port,
  })
  t.pass('Sandbox started with enhance-styles plugin')
})

test('Sandbox working and styles resolving', async t => {
  const rootRequest = await get({ url: url('/') })
  const stylesPath = rootRequest?.body?.link
  t.ok(stylesPath, `Sandbox root works; styles path: "${stylesPath}"` )

  const cssRequest = await get({ url: url(stylesPath) })
  const css = cssRequest.body
  t.ok(css, 'Got styles!')

  // TODO: test that styles are configured
  t.end()
})

test(`Cleanup ${stylesFileName}`, t => {
  t.plan(1)
  unlinkSync(join(workingDirectory, 'public', stylesFileName))
  t.pass('Test files cleaned up')
})

test('Shut down Sandbox', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('Shut down Sandbox')
})
