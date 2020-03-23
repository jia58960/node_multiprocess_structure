const Koa = require('koa')
const http = require('http')
const databaseConnection = require('./connections/databases')
const redisConnection = require('./connections/redis')
const sessionConf = require('./connections/session')
const ejsRender = require('./render/ssr')
module.exports = async function (config) {
  const app = new Koa()
  // 批量连接数据库
  await databaseConnection()

  // 批量连接redis
  await redisConnection()

  // 配置ression
  await sessionConf(app)

  //ssr渲染
  await ejsRender(app, config)

  // 引入文件入口
  app.use(require(config.entry))

  const httpServer = http.createServer(app.callback())
  httpServer.listen(config.port, () => {
    console.log(`server is running`, config.port)
  })
  return httpServer
}