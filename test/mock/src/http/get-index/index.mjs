import arc from '@architect/functions'
import getStyles from '../../../../../src/get-styles.mjs'

const stylesFileName = 'utility-classes.css' // configured in app.arc

console.log('========================')
console.log(getStyles())
console.log('========================')

const handler = arc.http.async(
  async function() {
    return {
      json: { link: arc.static(stylesFileName) },
    }
  }
)

export { handler }
