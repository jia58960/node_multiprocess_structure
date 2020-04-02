const Router = require('koa-router')
const router = new Router()
const config = require('@/config')
const Catalog = require('@/models/Catalog')
const {
  getUserList
} = require('@/models/User')

const {
  main
} = require('@/core/_redis')

router.all('*', async (ctx, next) => {
   let staticServer = ctx.cookies.get('mt')
   const servers = config.staticServers
   if (!servers.includes(staticServer)) {
     staticServer = ''
   }
   
   if (!staticServer) {
     staticServer = servers[Math.floor(Math.random() * servers.length)]
     ctx.cookies.set('mt', staticServer, {
       'maxAge': 14 * 864000 * 1000
     })
   }
   
   console.log(`静态服务器地址${staticServer}`)
   ctx.renderOptions('STATIC', 'http://' + staticServer)
   ctx.renderOptions('city', 'beijing')
   await next()
 })

router.get('/', async (ctx) => {
  const catalog =  await Catalog.getAll()
  await ctx.render('index', {
    catalog
  })
})
router.get('/list', async ctx => {
  await ctx.render('list')
})
// 验证数据库是否配置成功
router.get('/a', async (ctx) => {
  ctx.body = await getUserList()
  // ctx.body = 998

})

// 验证redis是否配置成功
router.get('/b', async (ctx) => {
  console.log(main)
  main.setAsync('name', 'jia58960')
  ctx.body = "设置成功"
})

router.get('/c', async (ctx) => {
  ctx.body = await main.getAsync('name')
})

router.get('/d', async (ctx) => {
  if (!ctx.session.count) {
    ctx.session.count = 0
  }
  ctx.session.count++;
  ctx.body = `欢迎您第${ctx.session.count}次访问本站`;
})

router.get('/a.html', async (ctx) => {
  console.log('渲染了')
  await ctx.render('index', {
    user: 'ethan'
  })
  // await ctx.writeCache('a.html', ctx.body)
})

module.exports = router.routes();