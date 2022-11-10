const { join } = require('node:path')
const { get } = require('tiny-json-http')
const test = require('tape')
const sandbox = require('@architect/sandbox')

const workingDirectory = join(process.cwd(), 'test', 'mock')
const port = 6661
const stylesConfigBase = 24 // configured in mock/enhance-styles.json
const url = (path) => `http://localhost:${port}${path}`

test(`Start Arc Sandbox in ${workingDirectory}`, async t => {
  t.plan(1)
  await sandbox.start({
    quiet: true,
    cwd: workingDirectory,
    port,
  })
  t.pass('Sandbox started with enhance-styles plugin')
})

test('Sandbox working and styles resolving', async t => {
  t.plan(6)

  const rootRequest = await get({ url: url('/') })
  const htmlBody = rootRequest?.body
  t.ok(htmlBody, 'Sandbox root works' )
  t.ok(htmlBody.indexOf('<head><style>') > 0, 'Inline style tag is present')
  t.ok(htmlBody.indexOf('/* enhance-styles placeholder */') < 0, 'Placeholder CSS not present')

  const cssRequest = await get({ url: url('/enhance-styles.css') })
  const css = cssRequest.body
  t.ok(css, '.css available via HTTP')
  t.ok(css.indexOf(`html {font-size: ${stylesConfigBase}px;}`) > 0, 'Styles configured.')

  const styleGuideRequest = await get({ url: url('/_styleguide') })
  const styleGuide = styleGuideRequest.body
  t.ok(styleGuide, 'Style guide is available.')
})

test('Shut down Sandbox', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('Shut down Sandbox')
})
