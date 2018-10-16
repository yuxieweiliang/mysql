/*
*  删除枚举类型
*  因为暂时没有找到，判断在已有的情况下就不创建，所以只好先删除表，咱删除枚举
*  否则枚举类型已存在，再创建会报错
*/
DROP TYPE IF EXISTS enum_type;
DROP TYPE IF EXISTS enum_sex;

/**
*  创建枚举类型数据
*  enum_type 用户类型
*  enum_sex 性别
*/
CREATE TYPE enum_type AS enum('Readers', 'Author', 'Administrators', 'Group_Admin', 'Root');
CREATE TYPE enum_sex AS enum('male', 'female');