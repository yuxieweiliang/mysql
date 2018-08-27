/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const pg = require('pg');
const pgConfig = require('../config/pgConfig.json')
const client = new pg.Client(pgConfig.Postgre);

console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const STUDENTS = path.join(__dirname, './students.sql')
const TEACHERS = path.join(__dirname, './teachers.sql')


console.log(pgConfig.Postgre)
console.log(`准备读取 SQL 文件：${STUDENTS}`)

// 读取 .sql 文件内容
const students = fs.readFileSync(STUDENTS, 'utf8')
const teachers = fs.readFileSync(TEACHERS, 'utf8')
;(async function() {
  try{
    const connect = await client.connect();
    if(connect) console.log("准备向****数据库连接...");

    console.log('开始执行 SQL 文件...')

    // 执行 .sql 文件内容
    const stus = await client.query(students);
    if(stus) console.log("students表创建成功...");

    const teas = await client.query(teachers);
    if(teas) console.log("teachers表创建成功...");

    await client.end()

  }catch(error) {
    console.error('could not connect to postgres', err);
  }

})();


