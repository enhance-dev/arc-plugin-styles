import Head from '@architect/views/head.mjs'
// const { getStyles } = require('@architect/plugin-enhance-styles/get-styles')


export async function handler() {
  return {
    statusCode: 200,
    html: 'yolo'
  }
}

/*
export async function handler(req) {
  const styles = '<link rel="stylesheet" href="/_static/styles.css">'
  return {
    statusCode: 200,
    html: `${Head({ styles })}`
  }
}
*/