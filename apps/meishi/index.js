const Router = require('koa-router')
const router = new Router()
router.get('/a', async (ctx) => {
  ctx.body = "meishi"
})

module.exports = router.routes();