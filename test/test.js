const { join } = require('path')
const { unlinkSync } = require('fs')
const test = require('tape')
const { get } = require('tiny-json-http')
const sandbox = require('@architect/sandbox')
const workingDirectory = join(process.cwd(), 'test', 'mock')
const port = 6661
const url = (path, port) => `http://localhost:${port}${path}`

test('Start sandbox', async t => {
  t.plan(1)
  await sandbox.start({
    cwd: workingDirectory,
    port
  })
  t.pass('Sandbox started')
})

test('Test for style tag link', async t => {
  t.plan(1)
  const result = await get({
    url: url('/', port),
    port
  })
  const page = result?.body
  t.ok(page, `Got styles \n ${page}` )
})

test('cleanup', t => {
  t.plan(1)
  unlinkSync(join(workingDirectory, 'public', 'styles.css'))
  t.pass('Test files cleaned up')
})

test('Shut down Sandbox', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('Shut down Sandbox')
})
