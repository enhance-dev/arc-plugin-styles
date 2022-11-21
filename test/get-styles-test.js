const test = require('tape')

test('getStyles utility functions', async (t) => {
  const {
    default: getStyles,
    getStyleTag,
    getLinkTag,
    getPath,
  } = await import('../src/get-styles.mjs')

  t.equal(typeof getStyles, 'function', 'getStyles is a function')
  t.equal(typeof getStyleTag, 'function', 'getStyleTag is a function')
  t.equal(typeof getLinkTag, 'function', 'getLinkTag is a function')
  t.equal(typeof getPath, 'function', 'getPath is a function')
  t.equal(typeof getLinkTag(), 'string', 'getLinkTag() returns a string')
  t.equal(typeof getPath(), 'string', 'getPath() returns a string')
  t.equal(typeof getStyleTag(), 'string', 'getStyleTag() returns a string')
  t.equal(typeof getStyles(), 'object', 'getStyles() returns an object')

  t.deepEqual(
    Object.keys(getStyles()),
    [ 'style', 'link', 'path' ],
    'getStyles has props',
  )

  t.end()
})
