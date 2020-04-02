const ejs = require('koa-ejs');
const minify = require('html-minifier').minify
const fs = require('promise-fs')
const path = require('path')
module.exports = async function (app, config) {
  ejs(app, {
    root: config.tmplRoot,
    layout: false,
    viewExt: 'ejs',
    cache: false
  })

  const render = app.context.render
  // 重写render方法
  app.context.render = async function (name, options) {
    await render.call(this, name, {
      ...this._renderOption,
      ...options
    })
    
    if (config.minifyTmpl && this.body) {
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
  
  app.context.writeCache = async function (name, content) {
    const filePath = path.resolve(config.cacheDir, name)
    await fs.writeFile(filePath, content)
  }

  app.context.renderOptions = function (key, val) {
    if (!this._renderOption) {
      this._renderOption = {}
    }
    this._renderOption[key] = val
  }
}