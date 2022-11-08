import arc from '@architect/functions'
import getStyles from '../../../../../src/get-styles.mjs'

const handler = arc.http.async(
  async function() {
    return {
      html: /* html */`
<html>
<head>
  ${getStyles()}
</head>
<body class="font-sans p4 flex justify-around">
  <h1 class="text4">enhance-styles'd</h1>
</body>
</html>
      `.trim(),
    }
  },
)

export { handler }
