---
layout: post
title1: centos6.3编译安装mysql5.6.14
category: mysql
tags: mysql
keywords: 编译安装mysql5.6.14
description: mysql最新的版本都需要cmake编译安装，估计以后的版本也会采用这种方式，所以特地记录一下安装步骤及过程，以供参考。
---

<p>mysql最新的版本都需要cmake编译安装，估计以后的版本也会采用这种方式，所以特地记录一下安装步骤及过程，以供参考。</p>
  
<p>注意：此安装是默认centos下已经安装了最新工具包，比如GNU make, GCC, Perl, libncurses5-dev，如果在编译安装过程中发现有缺失的工具包，先yum install 单独下载安装再继续即可。如下是lnmp环境需要的包，可以根据实际情况选择安装</p>

	yum -y install gcc gcc-c++ autoconf libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel

以下安装中涉及的几点需要提前说明的问题：

1. 所有下载的文件将保存在 /usr/local/src 目录下
2. mysql将以mysql用户运行，而且将加入 service 开机自动运行 
3. mysql将被安装在 /usr/local/mysql/ 目录下
4. mysql默认安装使用 utf8 字符集 
5. mysql的数据和日志文件保存在 /var/mysql/ 对应目录下 
6. mysql的配置文件保存于/var/mysql/my.cnf  

### 1.需要的软件包

- wget http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.14.tar.gz 
- wget http://www.cmake.org/files/v2.8/cmake-2.8.12.1.tar.gz 
- wget http://ftp.gnu.org/gnu/bison/bison-3.0.tar.gz 

### 2.安装cmake和bison

	#cd /usr/local/src  
	#tar zxvf cmake-2.8.12.1.tar.gz 
	#cd cmake-2.8.12.1 
	#./bootstrap 
	#gmake
	#gmake install 
	#cd ../  
	//可能会报错Please specify one using environment variable MAKE.
	解决办法：yum -y install make 根据不同的系统可能缺少一些必要的包直接yum即可。
	
	
	#tar zxvf bison-3.0.tar.gz 
	#cd bison-3.0
	#./configure 
	#make
	#make install
	#cd ../

### 3.编译安装mysql5.6.14

	#/usr/sbin/groupadd mysql 
	#/usr/sbin/useradd -g mysql mysql
	#tar zxvf mysql-5.6.14.tar.gz
	#cd mysql-5.6.14.tar.gz
	#cmake -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_UNIX_ADDR=/tmp/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -
	
	DWITH_EXTRA_CHARSETS:STRING=utf8,gbk -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_READLINE=1 -DENABLED_LOCAL_INFILE=1 -
	
	DMYSQL_DATADIR=/var/mysql/data
	#make 
	#make install
	#chmod +w /usr/local/mysql
	#chown -R mysql.mysql /usr/local/mysql
	#ln -s /usr/local/mysql/lib/libmysqlclient.so.18 /usr/lib/libmysqlclient.so.18  
	#mkdir -p /var/mysql
	#mkdir -p /var/mysql/data
	#mkdir -p /var/mysql/log
	#chown -R mysql.mysql /var/mysql   
	#cd support-files/
	#cp my-default.cnf /var/mysql/my.cnf 
	//下面行来自mysql 5.5.28中的配置 最新版中只有一个my-default.cnf
	#cp my-large.cnf /var/mysql/my.cnf (注意:my-large.cnf适用于1G内存左右的服务器，可以根据自己配置情况选用my-large.cnf 或 my-huge.cnf 等不同配置) 
	#cp mysql.server /etc/init.d/mysqld

### 4.配置启动MySQL 5.6.14

> 1.若有需要请先修改 mysql 的配置/var/mysql/my.cnf

> 2.mysql 初始化安装
 
	#/usr/local/mysql/scripts/mysql_install_db --defaults-file=/var/mysql/my.cnf --basedir=/usr/local/mysql --datadir=/var/mysql/data --user=mysql
	//默认的my.cnf在/etc/my.cnf,datadir在/var/lib/mysql目录下
	//WARNING: Default config file /etc/my.cnf exists on the system说明已经存在了my.cnf

> 3.将 mysql 加入开机启动 

	#chmod +x /etc/init.d/mysqld
	#vi /etc/init.d/mysqld 
	（编辑此文件，查找并修改以下变量内容:大概46，47行） 
	basedir=/usr/local/mysql
	datadir=/var/mysql/data 
	#chkconfig --add mysqld
	#chkconfig --level 345 mysqld on

> 4.启动mysql 

	#service mysqld start
	报错：Starting MySQL. ERROR! The server quit without updating PID file (/var/lib/mysql/localhost.localdoma
	//解决方法：mv /etc/my.cnf /etc/my.cnf.old

> 5.设置环境变量 

	# vi /etc/profile添加一行就 ，在运行mysql的时候就不用输入很长的路经了 
	export PATH=$PATH:/usr/local/mysql/bin 设置好之后，用下行命令是设置立即生效 
	# source /etc/profile

> 6.进入mysql修改密码

	#mysql
	>use mysql;
	>select user,password,host from user;//查看一共有6个删除多余的
	>delete from user where host!='localhost' or user!='root';
	>update user set Password=password('123456') where User='root';
	>flush privileges;

> 7.成功