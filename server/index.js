const { resolve } = require('path')
const Koa = require('koa')
const bodyParser = require('koa-body')
const jsxEngine = require('./middleware/jsxer')
const controllers = require('./middleware/router');// 路由
const app = new Koa();
const port = 4000;

/**
 * jsx 模板
 */
app.use(jsxEngine({
  views: process.cwd() + '/views',
  extension: 'jsx',
  beautify: true // 是否美化
}));

/**
 * body
 */
app.use(bodyParser({
  multipart: true
}));

app.use(controllers(resolve(__dirname, 'controllers')))

// 启动服务
app.listen(4000, () => {
  console.log(`网站启用端口在: ${port}`)
})


