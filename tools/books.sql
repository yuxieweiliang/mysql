/*
*  创建书籍表
*  book_id  < 主键 >
*  book_name 书名
*  book_author 作者
*  book_introduction 简介
*/
CREATE TABLE if NOT EXISTS public.books (
  book_id               SERIAL              NOT NULL PRIMARY KEY,
  book_name             varchar(16)         NOT NULL,
  book_author           varchar(100)      DEFAULT NULL,
  book_introduction     varchar(500)      DEFAULT NULL,
  book_settings         varchar[]      DEFAULT NULL
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.books
  OWNER TO postgres;

COMMENT ON TABLE public.books
IS '书籍 - 基础信息表';

