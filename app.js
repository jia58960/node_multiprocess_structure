const Koa = require('koa')
const http = require('http')
const databaseConnection = require('./connections/databases')
module.exports = async function ({
  port,
  entry
}) {
  const app = new Koa()
  // 批量连接数据库并将句柄存储至中转模块
  await databaseConnection()

  app.use(require(entry))
  const httpServer = http.createServer(app.callback())

  httpServer.listen(port, () => {
    console.log(`server is running`, port)
  })
  return httpServer
}