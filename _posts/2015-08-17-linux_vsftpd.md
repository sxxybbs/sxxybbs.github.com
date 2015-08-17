---
layout: post
title1: vsftpd虚拟用户搭建
category: linux
tags: linux
keywords: vsftpd虚拟用户搭建
description: vsftpd虚拟用户搭建。
---
<p><br/><img src='/assets/img/beauty/2015081701.jpg'></p>

<h3>vsftpd虚拟用户搭建</h3>
1.安装环境

	yum -y install vsftpd


2.添加用户名和密码，一行用户名一行密码/etc/vsftpd/virtual.txt

	yonghuming
	mima


3.将明文的用户名和密码进行加密保存在/etc/vsftpd/virtual.db中，最初没有这个文件，加密之后自动生产这个文件

	db_load -T -t hash -f ./virtual.txt ./virtual.db

4.创建虚拟用户的目录文件/etc/vsftpd/virtual_conf 这是放所有的虚拟用户的的配置文件，每个用户名对应一个文件。因为有yonghuming这个虚拟用户，我们建立一个yonghuming这么一个文件，文件内容如下：

	guest_enable=YES
	guest_username=myftp #真实的系统用户名
	local_root=/wwwroot/yonghuming #虚拟用户的家目录
	write_enable=YES
	anon_umask=022
	virtual_use_local_privs=YES
	anon_world_readable_only=NO
	anon_upload_enable=YES
	anon_mkdir_write_enable=YES
	anon_other_write_enable=YES

5.在主配置文件中引入虚拟的配置文件。在修改主配置文件之前最好做一个备份。

	anonymous_enable=no 第12行，静止匿名用户登陆。
	chroot_local_user=YES 打开注释让虚拟用户登陆之后在自己家目录。
	user_config_dir=/etc/vsftpd/virtual_conf 最后一行加上虚拟用户的单独配置文件目录
	
	
6.修改pam认证文件；在修改之前做好备份。64位。删除所有添加如下代码：

	auth required /lib64/security/pam_userdb.so db=/etc/vsftpd/virtual
	account required /lib64/security/pam_userdb.so db=/etc/vsftpd/virtual
	
7.重新启动vsftpd。

	/etc/init.d/vsftpd restart
	
8.成功

	
	
