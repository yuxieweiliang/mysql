>  # 新增
向数据库中插入新数据: INSERT INTO

>  # 查询
从数据库中提取数据: SELECT * FROM test1

>  # 更新
更新数据库中的数据: UPDATE
UPDATE user_tbl SET name = '李四' WHERE name = '张三';

>  # 删除
从数据库中删除数据:  DELETE
DELETE FROM user_tbl WHERE name = '李四' ;

>  # 床架一个数据库
创建新数据库: CREATE DATABASE

>  #
修改数据库: ALTER DATABASE

>  #
创建新表: CREATE TABLE
CREATE TABLE user_tbl(name VARCHAR(20), signup_date DATE);

>  #
插入数据: INSERT INTO
INSERT INTO user_tbl(name, signup_date) VALUES('张三', '2013-12-22');

> #
选择记录: SELECT FROM
SELECT * FROM user_tbl;

>  #
变更（改变、添加列）数据库表: ALTER TABLE
ALTER TABLE user_tbl ADD email VARCHAR(40);
# 向数据表 user_tbl 中添加 email 字段

>  #
删除表: DROP TABLE

>  #
创建索引（搜索键）: CREATE INDEX

>  #
删除索引: DROP INDEX

>  #
更新结构:
ALTER TABLE user_tbl ALTER COLUMN signup_date SET NOT NULL;

>  #
栏位更名: ALTER TABLE [表名] RENAME COLUMN [旧列名] TO [新列名];
ALTER TABLE user_tbl RENAME COLUMN signup_date TO signup;

>  #
删除栏位:
ALTER TABLE user_tbl DROP COLUMN email;

>  #
表格更名:
ALTER TABLE user_tbl RENAME TO backup_tbl;

>  #
删除表格:
DROP TABLE IF EXISTS backup_tbl;



书:
角色介绍 / 地理位置 / 时代背景 /

角色:
book_role_character_desig: 角色设计

book:
{book_settings: ['1', '2']}

book_sets:
[{
    id: 1,
    title: '宠物',
    setting_doc: [10, 20],
    setting_other: ['a10', 'b20'],
    setting_doc_config: ['name', 'introduction']
  },{
    id: 2,
    title: '兵器',
    setting_doc: ['1a', '2b'],
    setting_other: ['12b', '11a'],
    setting_doc_config: ['name', 'introduction', 'grade']
  },
]

book_setting_doc:
[
{id: 10,   name: '', introduction: '', grade: '', age: '', color: ''},
{id: 20,   name: '', introduction: '', grade: '', age: '', color: ''},
{id: '2b', name: '', introduction: '', grade: '', age: '', color: ''},
{id: '1a', name: '', introduction: '', grade: '', age: '', color: ''},
]

book_set_other:
[
{id: 'a10',   key: '', value: ''},
{id: 'b20',   key: '', value: ''},
{id: '12b', key: '', value: ''},
{id: '11a', key: '', value: ''},
]

{
  title: '宠物',
  content: {
    name: '蒂娜',
    introduction: ''
  }
}


book_chapter:
{
  book_chapter_id: 0,
  book_chapter_title: '',
  book_chapter_content: '',
  book_chapter_discuss: '', # 讨论
  book_chapter_leave: '', # 留言
  book_chapter_page: '',
  book_chapter_create_time: '',
  book_chapter_update_time: '',
}



rankings:
{
  rankings_id: 0,
  rankings_title: '',
  rankings_content: [],
}
rankings_details:
{
  rankings_details_id: 0,
  rankings_details_name: '',
  rankings_details_value: '',
  rankings_details_index: 0,
}

































