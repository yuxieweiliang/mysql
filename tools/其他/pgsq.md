create user dbuser with password '123456';
create user dbuser with password '123456';

# 此功能已于implemented in Postgres 9.1：
CREATE TABLE IF NOT EXISTS myschema.mytable (i integer);

# 低版本
CREATE OR REPLACE FUNCTION create_mytable ()
  RETURNS void AS
$func$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_catalog.pg_tables
              WHERE  schemaname = 'myschema'
              AND    tablename  = 'mytable') THEN
      RAISE NOTICE 'Table "myschema"."mytable" already exists.';
   ELSE
      CREATE TABLE myschema.mytable (i integer);
   END IF;
END
$func$ LANGUAGE plpgsql;

使用:
SELECT create_mytable();        -- call as many times as you want.



> # 设置中文字符集
create table t3(
name char(10),
age int(2),
sex enum("男", "女")
) default character set utf8;



