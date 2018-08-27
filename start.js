const fs = require('fs')
const path = require('path')
const pg = require('pg');
const pgConfig = require('./config/pgConfig.json')
const client = new pg.Client(pgConfig.Postgre);
const INIT_DB_FILE = path.join(__dirname, './tools/cAuth.sql')
const INIT = path.join(__dirname, './tools/aaa.sql')
var PG = function(){
  console.log("准备向****数据库连接...");
};
// 读取 .sql 文件内容
const content = fs.readFileSync(INIT_DB_FILE, 'utf8')
const con = fs.readFileSync(INIT, 'utf8')


PG.prototype.getConnection = function(){
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err);
    }



    client.query(con, function (err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      console.log("hbdfxt数据库连接成功...", result);
    });
  });
};

var pgclient = new PG();// 引用上述文件
pgclient.getConnection();
