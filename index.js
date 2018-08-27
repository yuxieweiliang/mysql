const Koa = require('koa')
const bodyParser = require('koa-body')
const jsxEngine = require('./server/jsxer')
var views = require('./server/views');
const app = new Koa();

const port = 4000;




app.use(async function (ctx, next) {
  ctx.state = {
    session: this.session,
    title: 'app'
  };

  await ctx.render('index', {
    user: 'John'
  });
});


// 启动服务
app.listen(4000, () => {
  console.log(`网站启用端口在: ${port}`)
})

