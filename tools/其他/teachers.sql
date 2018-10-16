/*
 创建老师表
*/


/*
*  设置字符集
*  SET NAMES utf8;
*/

/*
*  来禁用外键约束.
*  SET FOREIGN_KEY_CHECKS = 0;
*/

/*
*  判断时候存在，若存在则执行删除表操作
*/
DROP TABLE IF EXISTS public.teachers;
/*
*  identity 自动增长
*  PRIMARY KEY 主键
*/
CREATE TABLE public.teachers (
  id integer NOT NULL,
  name character(100),
  subjects character(1),
  CONSTRAINT subjects PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.teachers
  OWNER TO postgres;
COMMENT ON TABLE public.teachers
  IS '这是一个教师信息表';

/*
*  来启动外键约束.
*  SET FOREIGN_KEY_CHECKS = 1;
*/

