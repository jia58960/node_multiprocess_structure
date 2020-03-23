const render = require('koa-ejs');
const minify = require('html-minifier').minify
module.exports = async function (app, config) {
  render(app, {
    root: config.tmplRoot,
    layout: false,
    viewExt: 'ejs',
    cache: false
  })
  if (config.minifyTmpl) {
    const render = app.context.render
    // 重写render方法
    app.context.render = async function (...args) {
      await render.call(this, ...args)
      if (this.body) {
        this.body = minify(this.body, {
          collapseWhitespace: true,
          collapseInlintTagWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,

          minifyCSS: true,
          minifyJS: true
        })
      }
    }
  }
}
