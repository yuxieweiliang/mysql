/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const { Client } = require('pg');
const pgConfig = require('../config/pgConfig.json')
const client = new Client(pgConfig.Postgre);

console.log('\n======================================')
console.log('开始初始化数据库...')

function readSql(url) {
  const PATH =  path.normalize(path.join(__dirname, url));
  return fs.readFileSync(PATH, 'utf8');
}

/**
 * 初始化 SQL 文件路径
 * 读取 .sql 文件内容
 */
const delete_table      = readSql('./delete_table.sql');
const create_type       = readSql('./create_type.sql');

const books             = readSql('./books.sql');
const book_sets         = readSql('./book_sets.sql');
const book_roles        = readSql('./book_roles.sql');
const book_set_other    = readSql('./book_set_other.sql');
const book_chapter      = readSql('./book_chapter.sql');

const users             = readSql('./users.sql');


;(async function() {
  try{
    await client.connect();
    console.log("数据库连接成功...\b", '开始执行 SQL 文件...\n');

    await client.query(delete_table);
    console.log('\x1b[31m',"... 删除表成功....................", '\x1b[37m');
    await client.query(create_type);
    console.log('\x1b[32m', "... 创建符合类型成功....................\n", '\x1b[37m');


    await client.query(books);
    console.log("     books             表创建成功....................");
    await client.query(book_roles);
    console.log("     book_roles        表创建成功....................");
    await client.query(book_sets);
    console.log("     book_sets         表创建成功....................");
    await client.query(book_set_other);
    console.log("     book_set_other    表创建成功....................");
    await client.query(book_chapter);
    console.log("     book_chapter      表创建成功....................");

    await client.query(users);
    console.log("     users             表创建成功....................");
  }catch(err) {
    console.log("创建失败....................", err);
  }

  await client.end()
})();


