/*
*  用户 - 信息
*  INCREMENT 增量 -> 可以把增量设置为 2 ，就会成为 1 3 5 ……
*  MINVALUE 最小值
*  MAXVALUE 最大值
*  START 开始值
*  CACHE 缓存
*/
CREATE SEQUENCE if NOT EXISTS public.users_user_id_seq
 INCREMENT 2
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

/**
*  创建用户表
*  user_id < 主键 >
*  user_sex 性别
*  user_name 名字
*  user_role 角色
*  user_auth 权限
*/
CREATE TABLE if NOT EXISTS public.users (
  user_id       int           NOT NULL DEFAULT nextval('users_user_id_seq') PRIMARY KEY,
  user_sex      enum_sex      DEFAULT NULL,
  user_name     varchar(13)   NOT NULL,
  user_role     varchar(13)   NOT NULL,
  user_auth     enum_type     DEFAULT NULL
) WITH (OIDS = FALSE);
ALTER SEQUENCE public.users_user_id_seq OWNED BY users.user_id;

ALTER TABLE public.users
  OWNER TO postgres;

COMMENT ON TABLE public.users
IS '用户 - 信息';

