/*
*  书籍 - 章节
*  book_chapter_id             < 主键 >
*  book_chapter_title           章节名字
*  book_chapter_content         主要内容
*  book_chapter_discuss         讨论
*  book_chapter_leave           留言
*  book_chapter_page            页码
*  book_chapter_create_time     创建时间
*  book_chapter_update_time     更新时间
*/
CREATE TABLE if NOT EXISTS public.book_chapters (
  book_chapter_id               SERIAL          NOT NULL PRIMARY KEY,
  book_chapter_title            varchar         NOT NULL,
  book_chapter_content          varchar         NOT NULL,
  book_chapter_discuss          varchar         NOT NULL,
  book_chapter_leave            varchar         NOT NULL,
  book_chapter_page             varchar         NOT NULL,
  book_chapter_create_time      timestamp        DEFAULT (now()),
  book_chapter_update_time     timestamp        DEFAULT (now())
) WITH (OIDS = FALSE);

/*  ALTER TABLE <tablename> OWNER TO <username>  将这张表赋给当前用户  */
ALTER TABLE public.book_chapters
  OWNER TO postgres;

COMMENT ON TABLE public.book_chapters
IS '书籍 - 章节';

