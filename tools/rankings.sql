/*
*  创建书籍表
*  book_id  < 主键 >
*  book_name 书名
*  book_author 作者
*  book_introduction 简介
*/
CREATE TABLE if NOT EXISTS public.rankings (
  rankings_id              SERIAL         NOT NULL PRIMARY KEY,
  rankings_title           varchar(20)    NOT NULL,
  rankings_content         varchar[]      DEFAULT NULL
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.rankings
  OWNER TO postgres;

COMMENT ON TABLE public.rankings
IS '书籍 - 基础信息表';

