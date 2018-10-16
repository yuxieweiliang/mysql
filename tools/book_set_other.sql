/*
*  书籍 - 设定 - 其他
*  book_set_other_id             < 主键 >
*  book_set_other_name           字段名称
*  book_set_other_value          字段值
*/
CREATE TABLE if NOT EXISTS public.book_set_others (
  book_set_other_id               SERIAL          NOT NULL PRIMARY KEY,
  book_set_other_name            varchar         NOT NULL,
  book_set_other_value              varchar[]       DEFAULT NULL
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.book_set_others
  OWNER TO postgres;

COMMENT ON TABLE public.book_set_others
IS '书籍 - 设定 - 其他';

