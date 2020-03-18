const Router = require('koa-router')
const router = new Router()
const {
  getUserById
} = require('@/models/User')
router.get('/a', async (ctx) => {
  // ctx.body = await getUserById('0de11349fbce49a4bcefa382d9b1bb0e')
  ctx.body = 998
})

module.exports = router.routes();