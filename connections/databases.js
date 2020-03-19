const {
  databases
} = require('../config.js')

const _db = require('@/core/_databases')
const mysql = require('promise-mysql')

module.exports = async function () {
  for (let name in databases) {
    let db = await mysql.createPool(databases[name])
    // 检测数据库连接是否成功
    await db.query('SHOW TABLES')
    _db[name] = db
  }
}