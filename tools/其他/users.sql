/*
*  删除表
*/
DROP TABLE IF EXISTS public.users;
/*
*  删除枚举类型
*  因为暂时没有找到，判断在已有的情况下就不创建，所以只好先删除表，咱删除枚举
*  否则枚举类型已存在，再创建会报错
*/
DROP TYPE IF EXISTS enum_type;
DROP TYPE IF EXISTS enum_sex;

/*
*  创建书籍表, 如果不存在， 则创建
*  INCREMENT 增量 -> 可以吧增量设置为 2 ，就会成为 1 3 5 ……
*  MINVALUE 最小值
*  MAXVALUE 最大值
*  START 开始值
*  CACHE 缓存
*/
CREATE SEQUENCE if NOT EXISTS  public.users_user_id_seq
 INCREMENT 2
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

/**
*  创建枚举类型数据
*  enum_type 用户类型
*  enum_sex 性别
*/
CREATE TYPE enum_type AS enum('Readers', 'Author', 'Administrators', 'Group_Admin', 'Root');
CREATE TYPE enum_sex AS enum('male', 'female');

CREATE TABLE if NOT EXISTS public.users (
  user_id int NOT NULL DEFAULT nextval('users_user_id_seq') PRIMARY KEY,
  sex enum_sex DEFAULT NULL,
  name varchar(13) NOT NULL,
  user_auth    enum_type DEFAULT NULL,
  author          character(100)      DEFAULT NULL
) WITH (OIDS = FALSE);
ALTER SEQUENCE public.users_user_id_seq OWNED BY users.user_id;

ALTER TABLE public.users
  OWNER TO postgres;

COMMENT ON TABLE public.users
IS '这是一个用户信息表';


/*
DROP SEQUENCE if EXISTS "public"."users_coltype_seq";
CREATE SEQUENCE "public"."users_coltype_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;
ALTER TABLE users ADD COLUMN IF NOT EXISTS coltype int4 DEFAULT nextval('users_coltype_seq')  NOT NULL;
ALTER SEQUENCE public.users_coltype_seq OWNED BY users.coltype;

CREATE TYPE if EXISTS enum_type AS enum('Readers', 'Author', 'Administrators', 'Group_Admin', 'Root');
CREATE TYPE if EXISTS enum_sex AS enum('male', 'female');

DROP SEQUENCE if EXISTS "public"."testseq_id_seq";
CREATE SEQUENCE "public"."testseq_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

DROP TABLE if EXISTS "public"."testtable";
CREATE TABLE "public"."testtable" (
"id" int4 DEFAULT nextval('testseq_id_seq'::regclass) NOT NULL, -- 表数据关联SEQUENCE，每次插入取nextval('testseq_id_seq')<pre name="code" class="sql"><pre name="code" class="sql">nextval('testseq_id_seq'
"create_date" timestamp(6),
"age" int4,
"name" varchar(100),
"grade" float4
)
WITH (OIDS=FALSE)
;

ALTER TABLE "public"."testtable" ADD PRIMARY KEY ("id");

-- 插入数据，不需要写主键nextval('testseq_id_seq');
INSERT into "public"."testtable"(name) values('111'); -- 值数据（varchar）用单引号








*/