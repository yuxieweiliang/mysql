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

DROP TABLE IF EXISTS students;
/*
*  identity 自动增长
*  PRIMARY KEY 主键
*  判断这张表是否存在，若存在，则跳过创建表操作
*/
CREATE TABLE public.students (
  id integer NOT NULL,
  name character(100),
  subjects character(1),
  CONSTRAINT id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE public.students
  OWNER TO postgres;
COMMENT ON TABLE public.students
  IS '这是一个学生信息表';

/*
*  来启动外键约束.
*  SET FOREIGN_KEY_CHECKS = 1;
*/

