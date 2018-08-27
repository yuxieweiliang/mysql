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