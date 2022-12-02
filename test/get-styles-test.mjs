import test from 'tape'
import { getStyles } from '../src/index.js'
const { all, styleTag, linkTag, path, } = getStyles

test('ESM getStyles utility functions', async (t) => {

  t.equal(typeof all, 'function', 'all is a function')
  t.equal(typeof styleTag, 'function', 'styleTag is a function')
  t.equal(typeof linkTag, 'function', 'linkTag is a function')
  t.equal(typeof path, 'function', 'path is a function')

  t.equal(typeof linkTag(), 'string', 'linkTag() returns a string')
  t.equal(typeof path(), 'string', 'path() returns a string')
  t.equal(typeof styleTag(), 'string', 'styleTag() returns a string')
  t.equal(typeof all(), 'object', 'get() returns an object')

  t.deepEqual(
    Object.keys(all()),
    [ 'style', 'link', 'path' ],
    'getAll has props',
  )

  t.end()
})
