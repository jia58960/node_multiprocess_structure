const Koa = require('koa')
const {
  databases
} = require('./config')
const _db = require('@/core/_databases')
const mysql = require('promise-mysql')
module.exports = async function ({
  port,
  entry
}) {
  const app = new Koa()
  // 批量连接数据库并将句柄存储至中转模块
  for (let name in databases) {
    let db = await mysql.createPool(databases[name])
    _db[name] = db
  }

  app.use(require(entry))
  app.listen(port, () => {
    console.log(`server is running`, port)
  })
}