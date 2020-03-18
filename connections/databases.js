const {
  databases
} = require('../config.js')
const _db = require('@/core/_databases')
const mysql = require('promise-mysql')
module.exports = async function () {
  for (let name in databases) {
    let db = await mysql.createPool(databases[name])
    _db[name] = db
  }
}