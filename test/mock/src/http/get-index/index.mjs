import arc from '@architect/functions'
import getStyles, {
  getLinkTag,
  getStyleTag,
  getPath,
} from '../../../../../src/get-styles.mjs'

const handler = arc.http.async(async function () {
  const styles = getStyles()

  return {
    html: /* html */ `
<html>
<head>${styles.style}</head>
<body class="font-sans text-2">
  <div class="p4 grid flow-row justify-center gap1">
    <h1 class="text4">enhance-styles'd</h1>

    <textarea rows="50" class="font-mono">
PATH: ${getPath()}

LINK TAG: ${getLinkTag()}

STYLE TAG:
${getStyleTag()}
    </textarea>
  </div>
</body>
</html>
      `.trim(),
  }
})

export { handler }
