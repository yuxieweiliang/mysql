/*
*  创建书籍表
*  book_role_id             < 主键 >

*  book_role_name           名字
*  user_role_sex            性别
*  user_role_date_of_birth  出生日期
*  book_introduction        简介

*  book_role_identity       身份： 主角，女一号，路人甲
*  book_role_camp           阵营
*  book_role_weapons        武器
*/
CREATE TABLE if NOT EXISTS public.book_roles (
  book_role_id               SERIAL              NOT NULL PRIMARY KEY,

  book_role_name             varchar(13)         NOT NULL,
  user_role_sex              enum_sex            DEFAULT NULL,
  user_role_date_of_birth    date                DEFAULT (now()),
  book_role_introduction     character(100)      DEFAULT NULL,

  book_role_identity      varchar(13)         NOT NULL,
  book_role_camp             varchar(13)         NOT NULL,
  book_role_weapons          varchar(13)         NOT NULL
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.book_roles
  OWNER TO postgres;

COMMENT ON TABLE public.book_roles
IS '书籍 - 角色';

