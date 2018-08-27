const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const router = new Router();

// { 'GET /book': [Function: get_book],'POST /book': [Function: post_book] }
// { 'GET /hello/:name': [Function: fn_hello] }
function addMapping(router, mapping) {
  let type = { get: 'get', post: 'post', update: 'put', put: 'put', del: 'del', delete: 'del' };
  for (let string in mapping) {
    // 解析类型已经API地址
    let [method, path] = string.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');

    // console.log(method, type[method])
    if(type[method] && router[type[method]]) {
      console.log(type[method], path, mapping[string]);
      router[type[method]](path, mapping[string]);
    }
  }

}

/**
 * 递归获取制定目录下所有指定类型的页面
 * @param dirs // 指定目录
 * @param type // 指定类型
 * @returns {Array}
 */
function getAllFileOfPath(dirs, type) {
  const files = [];
  const getFiles = (dirs) => {
    try{
      const fileDir = fs.readdirSync(dirs);

      fileDir.map(file => {
        if(file.endsWith(type)) {
          files.push(dirs + '/' +  file)
        } else {
          if(!file.endsWith('.md')) {
            getFiles(dirs + '/' + file)
          }
        }
      })
    }catch(err) {
      console.error(err.message, '路径找不到')
      // console.error(err.stack, '路径找不到')
      // console.error(dirs, '路径找不到')
    }
  };
  getFiles(dirs);
  return files;
}

/**
 * 获取所有目录下文件的返回值
 * @param router
 * @param dirs
 */
function addControllers(router, dirs) {
  let apiPath = getAllFileOfPath(dirs, '.js');
  for (let f of apiPath) {
    // console.log(`process controller: ${f}...`);
    let mapping = require(f);
    console.log(mapping);
    addMapping(router, mapping);
  }
}

module.exports = function(dir) {
  let cwd = process.cwd();
  const ctrl_dirs = dir || path.join(cwd, './controllers/')
  const stat = fs.statSync(ctrl_dirs);
  if(stat.isDirectory(ctrl_dirs)) {
    addControllers(router, ctrl_dirs)
  } else {
    console.error('路径不存在！！！');
  }

  /*router.get('/', function(ctx) {
    console.log('ffffffffffffffffffffffffff')
    ctx.render('index')
  })*/

  return router.routes()
};