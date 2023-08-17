import arc from '@architect/functions'
import { getStyles } from '../../../../../src/index.js'

const handler = arc.http(async function () {
  return {
    html: /* html */ `
<html>
<head>${getStyles.all().style}</head>
<body class="font-sans text-2">
  <div class="p4 grid flow-row justify-center gap1">
    <h1 class="text4">enhance-styles'd</h1>

    <textarea rows="50" class="font-mono">
PATH: ${getStyles.path()}

LINK TAG: ${getStyles.linkTag()}

STYLE TAG:
${getStyles.styleTag()}
    </textarea>
  </div>
</body>
</html>
      `.trim(),
  }
})

export { handler }
