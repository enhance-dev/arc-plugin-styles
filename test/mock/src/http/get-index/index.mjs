import arc from '@architect/functions'
import { styles } from '../../../../../src/index.js'

const handler = arc.http.async(async function () {
  return {
    html: /* html */ `
<html>
<head>${styles.getAll().style}</head>
<body class="font-sans text-2">
  <div class="p4 grid flow-row justify-center gap1">
    <h1 class="text4">enhance-styles'd</h1>

    <textarea rows="50" class="font-mono">
PATH: ${styles.getPath()}

LINK TAG: ${styles.getLinkTag()}

STYLE TAG:
${styles.getStyleTag()}
    </textarea>
  </div>
</body>
</html>
      `.trim(),
  }
})

export { handler }
