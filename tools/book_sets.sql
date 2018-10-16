/*
*  书籍 - 设定
*  book_role_id             < 主键 >
*  book_role_name           角色名字
*  user_role_sex            角色性别
*  user_role_date_of_birth  出生日期
*  book_introduction        简介
*/
CREATE TABLE if NOT EXISTS public.book_sets (
  book_set_id               SERIAL          NOT NULL PRIMARY KEY,
  book_set_title            varchar         NOT NULL,
  book_set_doc              varchar[]       DEFAULT NULL,
  book_set_doc_config       varchar[]       DEFAULT NULL,
  book_set_other            varchar[]       DEFAULT NULL,
  book_set_create_date      timestamp       DEFAULT (now())
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.book_sets
  OWNER TO postgres;

COMMENT ON TABLE public.book_sets
IS '书籍 - 设定';

