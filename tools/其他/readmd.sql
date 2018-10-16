-- ----------------------------------------------------------------------
-- 转存sql文件时，每个表的导入都是如下创建方式，
-- 先判断是否存在，若存在，则删除这张表，重新创建，以下示例均为demo：
-- ----------------------------------------------------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `s_id` varchar(40) NOT NULL,
  `s_name` varchar(255) default NULL,
  `s_age` varchar(255) default NULL,
  `s_msg` varchar(255) default NULL,
  PRIMARY KEY  (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- 创建学生
-- ----------------------------
INSERT INTO `student` VALUES ('1', '早晨', '22', '电风扇');

-- ----------------------------
-- 判断这张表是否存在，若存在，则跳过创建表操作，
-- ----------------------------
CREATE TABLE IF NOT EXISTS `student` (
 `s_id` varchar(40) NOT NULL,
`s_name` varchar(255) default NULL,
`s_age` varchar(255) default NULL,
`s_msg` varchar(255) default NULL,
PRIMARY KEY (`s_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;



































