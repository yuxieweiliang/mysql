/*
 创建学生表
*/


/*
*  设置字符集
*  SET NAMES utf8;
*/

/*
*  来禁用外键约束.
*  SET FOREIGN_KEY_CHECKS = 0;
*/

DROP TABLE IF EXISTS books;
/*select 1 from sdafasdf;
*  identity: 整数 自动增长
*  PRIMARY KEY 主键
*  判断这张表是否存在，若存在，则跳过创建表操作
*/
CREATE TABLE public.books (
  id              integer             NOT NULL,
  name            character(100)      DEFAULT NULL,
  introduction    character(100)      DEFAULT NULL,
  author          character(100)      DEFAULT NULL,

  CONSTRAINT id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE public.books
  OWNER TO postgres;

COMMENT ON TABLE public.books
  IS '这是一个书籍信息表';

/*
*  来启动外键约束.
*  SET FOREIGN_KEY_CHECKS = 1;
*/

