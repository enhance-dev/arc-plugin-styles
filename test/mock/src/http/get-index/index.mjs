import arc from '@architect/functions'

const stylesFileName = 'utility-classes.css' // configured in app.arc

const handler = arc.http.async(
  async function() {
    return {
      json: { link: arc.static(stylesFileName) },
    }
  }
)

export { handler }
