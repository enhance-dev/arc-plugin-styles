import arc from '@architect/functions'
import enhanceStyles from '@enhance/styles'

// * utility for plugin consumers to grab a link tag or inline styles
export default function getStyles(filename, config) {
  filename = filename || 'styles.css'
  return {
    link: `<link rel="stylesheet" href="${arc.static(filename)}">`,
    style: `<style>${enhanceStyles(config)}</style>`
  }
}
