const Koa = require('koa')
const http = require('http')
const databaseConnection = require('./connections/databases')
const redisConnection = require('./connections/redis')
const sessionConf = require('./connections/session')
module.exports = async function ({
  port,
  entry
}) {
  const app = new Koa()
  // 批量连接数据库
  await databaseConnection()

  // 批量连接redis
  await redisConnection()

  // 配置ression
  await sessionConf(app)

  app.use(require(entry))
  const httpServer = http.createServer(app.callback())

  httpServer.listen(port, () => {
    console.log(`server is running`, port)
  })
  return httpServer
}