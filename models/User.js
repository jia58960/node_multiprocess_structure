const {
  web
} = require('@/core/_databases')
async function getUserById(id) {
  const rows = await web.query("SELECT * FROM user_table WHERE ID = ?", [id])
  return rows[0]
}

async function getUserByName(name) {
  const rows = await web.query("SELECT * FROM user_table WHERE name = ?", [name])
  return rows[0]
}

async function getUserList() {
  const rows = await web.query("SELECT Host,User FROM user")
  return rows
}

module.exports = {
  getUserById,
  getUserByName,
  getUserList
}