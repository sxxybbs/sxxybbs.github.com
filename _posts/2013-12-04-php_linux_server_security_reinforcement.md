---
layout: post
category: linux
tags: linux php mysql
title1: Linux下PHP网站安全加固方案
keywords: linux运维加固 
description: 本文详细总结了PHP网站在Linux服务器上面的安全配置，包含PHP安全、mysql数据库安全、web服务器安全、木马查杀和防范等，很好很强大很安全。
---

### php安全配置

1. 确保运行php的用户为一般用户，如www

2. php.ini参数设置


	disable_functions = passthru,exec,system,chroot,chgrp,chown,shell_exec,proc_open,proc_get_status,ini_alter,ini_restore,dl,openlog,syslog,readlink,symlink,popepassthru,stream_socket_server,fsocket,phpinfo #禁用的函数

	expose_php = off            #避免暴露PHP信息

	display_errors = off        #关闭错误信息提示

	register_globals = off      #关闭全局变量

	enable_dl = off             #不允许调用dl

	allow_url_include = off     #避免远程调用文件

	session.cookie_httponly = 1 #http only开启

	upload_tmp_dir = /tmp       #明确定义upload目录

	open_basedir = ./:/tmp:/home/wwwroot/ #限制用户访问的目录

>open_basedir参数详解

<p>open_basedir可将用户访问文件的活动范围限制在指定的区域，通常是其家目录的路径，也可用符号"."来代表当前目录。注意用open_basedir指定的限制实际上是前缀,而不是目录名。</p>
<p>举例来说: 若"open_basedir = /home/wwwroot", 那么目录"/home/wwwroot"和"/home/wwwroot1"都是可以访问的。所以如果要将访问限制在仅为指定的目录，请用斜线结束路径名。</p>

注意：

<p>从网上获取的资料来看，open_basedir会对php操作io的性能产生很大的影响。研究资料表明，配置了php_basedir的脚本io执行速度会比没有配置的慢10倍甚至更多，请大家自己衡量</p>

<p>open_basedir也可以同时设置多个目录, 在Windows中用分号分隔目录,在任何其它系统中用冒号分隔目录。当其作用于Apache模块时，父目录中的open_basedir路径自动被继承。</p>


### MySQL安全设置

>1. MySQL版本的选择

在正式生产环境中，禁止使用4.1系列的MySQL数据库。至少需要使用5.1.39或以上版本。

>2. 网络和端口的配置

在数据库只需供本机使用的情况下，使用–skip-networking参数禁止监听网络 。

>3. 确保运行MySQL的用户为一般用户，如mysql，注意存放数据目录权限为mysql

	vi /etc/my.cnf
	user = mysql

>4. 开启mysql二进制日志，在误删除数据的情况下，可以通过二进制日志恢复到某个时间点

	vi /etc/mysql.cnf
	log_bin = mysql-bin
	expire_logs_days = 7

>5. 认证和授权

(1) 禁止root账号从网络访问数据库，root账号只允许来自本地主机的登陆。

	mysql>grant all privileges on *.* to root @localhost identified by 'password' with grant option;

	mysql>flush priveleges;

(2) 删除匿名账号和空口令账号

	mysql>USE mysql;
	mysql>delete from user where User=;
	mysql>delete from user where Password=;
	mysql>delete from db where User=;

### web服务器安全

确保运行Nginx或者Apache的用户为一般用户，如www，注意存放数据目录权限为www

>防止sql注入

	if ( $query_string ~* ".*[\;'\<\>].*" ){

		return 404;

	}

>关闭存放数据上传等目录的PHP解析

	location ~* ^/(attachments|data)/.*\.(php|php5)${
	
	    deny all;
	
	}


>针对Apache：关闭图片目录/上传等目录的PHP解析

	<Files ~ ".php">

	    order allow,deny

	    Deny from all

	</Files>


### 木马查杀和防范

>php木马快速查找命令

	grep -r --include=*.php '[^a-z]eval($_POST' /home/wwwroot/

	grep -r --include=*.php 'file_put_contents(.*$_POST\[.*\]);' /home/wwwroot/

>利用find mtime查找最近两天或者发现木马的这几天，有哪些PHP文件被修改

	find -mtime -2 -type f -name \*.php

### 防范：

>1. 做好之前的安全措施，比如禁用相关PHP函数等

>2. 改变目录和文件属性

	find -type f -name \*.php -exec chomd 644 {} \;
	find -type d -exec chmod 755 {} \;
	chown -R www.www /home/wwwroot/www.xxx.cn

>3. 为防止跨站感染，需要做虚拟主机目录隔离

(1) nginx的简单实现方法

	利用nginx跑多个虚拟主机，习惯的php.ini的open_basedir配置：
	open_basedir = ./:tmp:/home/wwwroot/
	注：/home/wwwroot/是放置所有虚拟主机的web路径
	黑客可以利用任何一个站点的webshell进入到/home/wwwroot/目录下的任何地方，这样对各个虚拟主机的危害就很大
	例如： /data/www/wwwroot目录下有2个虚拟主机
	修改php.ini
	open_basedir = ./:/tmp:/home/wwwroot/www.xxx.cn:/home/wwwroot/back.xxx.cn
	这样用户上传webshell就无法跨目录访问了。

(2) Apache的实现方法，控制跨目录访问

	在虚拟机主机配置文件中加入
	php_admin_value open_basedir "/tmp:/home/wwwroot/www.xxx.cn"

原文转自：http://blog.linuxeye.com/351.html


