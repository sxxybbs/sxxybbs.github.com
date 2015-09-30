---
layout: post
title1: mysql主从复制
category: mysql
tags: mysql
keywords: mysql主从复制
description: mysql主从复制。
---
<p><br/><img src='/assets/img/beauty/2015093002.jpg'></p>

<h3>mysql主从复制</h3>

<p>window下mysql主从服务器，可用于读写分享，数据库热备份</p>
1.配置需求前提条件：<br/>
  1）主从服务器装有mysql<br/>
  2）主从服务器能互通访问<br/>
  3）从服务器有访问主服务器帐号权限<br/>
测试环境：<br/>
1.两台window服务器（只有一部机子可以装多个mysql 或虚拟机测试）<br/>
2.主从服务器装5.0版本的mysql<br/><br/>


<p>修改主服务器配置my.ini</p>

	[client]  
	port　　=　3306  
	[mysqld]  
	server-id　　　　=　1  #服务器ID号，整数值，保证唯一标识一台服务器  
	port　　　　　　　　=　3306   
	binlog-do-db　　　　=tes2　#需要同步数据库名  
	binlog-ignore-db=mysql #不需要同步的数据库名，可以配置多个  
	binlog-ignore-db=information_schema#不需要同步的数据库名  
	log-bin=mysql-bin  #打开二进制日志  

<p>修改之后重启mysql</p>

<p>给主服务器创建一个用户：</p>

	mysql>grant replication slave,reload,super on *.* to slave@192.168.3.34 identified by 'slave' ;
	mysql>flush privileges;
	mysql>show master status; 

	
<p>修改从服务器配置my.ini</p>	

	[client]   
	port　　　　　　　　=　3306   
	socket　　　　　　　　=　/tmp/mysql.sock   
	[mysqld]   
	server-id　　　　=　2   
	master-host　　　　=　192.168.1.60  #主服务器IP  
	master-connect-retry=60 #同步时间60秒  
	port　　　　　　　　=　3306  

修改之后重启mysql

	mysql mysql -u[用户名] -p[密码]
	mysql>change master to master_host='192.168.3.169',master_user='slave',master_password='slave';
	mysql> start slave;
	mysql> show slave status\G
	
如果出现：<br/>
Slave_IO_Running: Yes<br/>
Slave_SQL_Running: Yes<br/>
以上两项都为Yes，那说明没问题了。<br/>
在主服务上操作下，看看从服务器是否已经发生了修改。<br/>

 
	
	
