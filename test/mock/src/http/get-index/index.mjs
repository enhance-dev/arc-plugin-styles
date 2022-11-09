import arc from '@architect/functions'
import getStyles from '../../../../../src/get-styles.mjs'

const handler = arc.http.async(
  async function() {
    const INLINE = true

    return {
      html: /* html */`
<html>
<head>${getStyles(INLINE)}</head>
<body class="font-sans text-2">
  <div class="p4 grid flow-row justify-center gap1">
    <h1 class="text4">enhance-styles'd</h1>

    <textarea class="font-mono">
      ${getStyles()}
    </textarea>

    <textarea rows="25" class="font-mono">
      ${getStyles(INLINE)}
    </textarea>
  </div>
</body>
</html>
      `.trim(),
    }
  },
)

export { handler }
