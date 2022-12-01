const test = require('tape')
const { styles } = require('../')
const { getAll, getStyleTag, getLinkTag, getPath, } = styles

test('getStyles utility functions', async (t) => {

  t.equal(typeof getAll, 'function', 'get is a function')
  t.equal(typeof getStyleTag, 'function', 'getStyleTag is a function')
  t.equal(typeof getLinkTag, 'function', 'getLinkTag is a function')
  t.equal(typeof getPath, 'function', 'getPath is a function')

  t.equal(typeof getLinkTag(), 'string', 'getLinkTag() returns a string')
  t.equal(typeof getPath(), 'string', 'getPath() returns a string')
  t.equal(typeof getStyleTag(), 'string', 'getStyleTag() returns a string')
  t.equal(typeof getAll(), 'object', 'get() returns an object')

  t.deepEqual(
    Object.keys(getAll()),
    [ 'style', 'link', 'path' ],
    'getAll has props',
  )

  t.end()
})
