require = require('esm')(module) //eslint-disable-line
const { writeFileSync } = require('fs')
const path = require('path')
const enhanceStyles = require('@enhance/styles/index.mjs').default

const sandbox = {
  async start ({ arc, inventory }) {
    await verify(arc)
    await generate(arc, inventory.inv)
  }
}

const deploy = {
  async start ({ arc, cloudformation, inventory }) {
    await verify(arc)
    await generate(arc, inventory.inv)
    return cloudformation // no need to modify cfn because set.http above did that
  }
}

/**
 * verify the @styles is valid
 */
async function verify (arc) {
  return true
}

/**
 * run esbuild to generate the @styles code
 */
async function generate (arc, inventory) {
  const pathToStatic = process.env.ARC_STATIC_BUCKET
  const pathToStaticStyles = path.join(pathToStatic, 'styles.css')
  const styles = enhanceStyles(JSON.stringify({}))
  writeFileSync(pathToStaticStyles, styles)
}

module.exports = { sandbox, deploy }
