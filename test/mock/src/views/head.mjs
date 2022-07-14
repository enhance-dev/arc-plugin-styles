export default function Head(state) {
  const { styleLink = '', inlineStyles = '' } = state
  return `
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Enhance styles</title>
  ${styleLink}
</head>
  `
}