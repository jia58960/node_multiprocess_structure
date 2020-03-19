const session = require('koa-session')
const fs = require('fs')
const path = require('path')
module.exports = async function (app) {
  app.keys = fs.readFileSync(path.resolve(__dirname, '../.keys')).toString().split(/\r\n|\r|\n/).filter(line => line);
  console.log(app.keys)
  const CONFIG = {
    maxAge: 2 * 3600 * 1000,
    autoCommit: true, // 自动提交修改
    httpOnly: true,
    renew: true, // 自动延长
    signed: true
  }
  app.use(session(CONFIG, app))
}