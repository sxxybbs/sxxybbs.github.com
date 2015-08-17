---
layout: post
title1: win服务器和linux同步,linux与linux文件同步
category: linux
tags: linux
keywords: win服务器和linux同步,linux与linux文件同步,php博客
description: win服务器和linux同步，linux与linux文件同步。
---
<p>文件备份有多种方法,比如：ftp，nfs，samba，rsync，scp 等。今天主要介绍下rsync同步，之所有用它是由于他具有增量备份的功能。<br/><img src='/assets/img/beauty/2015081401.png'></p>

<h3>win服务器和linux同步,linux与linux文件同步</h3>
1.服务器安装rsync
查看/usr/bin/rsync 是否安装。如果没有yum -y install rsync


2.配置服务端
创建配置文件：
/etc/rsyncd.conf 没有的话请创建

	pid file = /var/run/rsyncd.pid
	uid = root
	gid = root
	use chroot = no
	log file = /var/log/rsyncd.log
	max connections = 36000
	lock file = /var/run/rsyncd.lock
	hosts allow = 218.13.205.27,58.261.24.8
	[web]
	path=/home/www/
	comment = web
	ignore errors = yes
	read only = no
	secrets file = /home/rsync/rsync.ps


3.建立用户密码文件，并且设置为只读

	/home/rsync/rsync.ps
	ke45u:Ak=+35

	chmod 600 rsync.ps

4.创建忽略文件

	/home/rsync/all.list
	*.tar.gz
	backupdb/
	pma/
	logs/
	mrtg/
	mrtgv/
	blog/
	zblog/

客户端：
windoes版本：
https://www.itefix.net/cwrsync

1.客户端创建用户密码文件/home/rsync/rsync.ps 和 忽略文件/home/rsync/all.list

	#!/bin/sh
	rsync -auvz --password-file=/home/rsync/rsync.ps --exclude-from '/home/rsync/all.list' ke45u@123.345.67.7::web /home/www/

前面是源地址
如果是win服务器地址需要写成/cygdrive/d/test固定形式、/cygdrive/盘符

