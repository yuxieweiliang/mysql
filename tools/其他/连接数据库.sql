-- 连接数据库 mysql 是连接数据库命令行的工具
-- -h 服务器地址 -u 用户 -p 密码
> mysql -h localhost -u xueyufei -p rq-al+Ax=1a>z

-- 查看随机生成的密码地址 -> 安装数据库时，随机生成的root用户的密码
-- !!! 如果密码中有 '!' 需要使用引号括起来
> grep password /var/log/mysqld.log
# A temporary password is generated for root@localhost: "rq-al+Ax=1a>z"

-- 显示帮助
> \q

-- 返回命令行
> \q

-- 清屏，清空控制台
ctrl + l

-- 端口号：3306；
-- 进程名：mysqld；
-- 传输协议：tcp；
-- 主配置文件：/ect/my.conf
-- 数据库目录：/var/lib/musql/
-- 用户：mysql
-- 用户组：mysql

-- 查看当前进程的所有者
> grep mysql /ect/password
-- 查看当前进程的所有组
> grep mysql /ect/group

-- 设置开机启动，进程名和服务名都叫 mysqld
> systemctl enable mysqld



-- 显示数据库已有的库 -> 初次使用需要修改密码，否则会报错
show databases;

-- 修改验证密码的策略以及密码复杂度
-- validate_password_policy 0 “只验证长度”
-- 0 长度
-- 1 长度，数字，大/小写，特殊字符
-- 2 长度，数字，大/小写，特殊字符 字典文件
-- validate_password_length 只验证长度 默认 >= 8
set global validate_password_policy = 0;
set global validate_password_length = 6;

-- 第一次修改密码，需要修改验证密码的策略以及密码复杂度
alter user root@"localhost" identtifiled by "123456";

-- 退出
> quit
> show databases;

-- 如果想在数据库命令行中使用系统命令，需要加system
> system ls /var/lib/mysql/


















