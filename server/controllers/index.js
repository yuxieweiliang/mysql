/**
 * Created by xueyufei on 2018/8/14.
 */
module.exports = {
  'GET student/ffff/': async function() {

  },
  'GET /': async function(ctx) {
    console.log('-------------------------------------------')
    await ctx.render('index',{})
  },
  post1: function() {},
  post2: function() {},
}