---
layout: post
title1: centos6.3编译安装php5.3.18
category: php
tags: php
keywords: 编译安装php5.3.18
description: php 5.3.18 源码中已经内嵌了 php-fpm，不用象以前的php版本一样专门打补丁了，只需要在configure的时候添加编译参数即可。关于php-fpm的编译参数有 –enable-fpm –with-fpm-user=www –with-fpm-group=www –with-libevent-dir=libevent位置。但是，php 5.3.18 下的php-fpm 不再支持 php-fpm 以前具有的 /usr/local/php/sbin/php-fpm (start|stop|reload)等命令，需要使用信号控制
---

>1.安装libiconv-1.14.tar.gz

	#wget  http://ftp.gnu.org/pub/gnu/libiconv/libiconv-1.14.tar.gz
	# tar zxvf libiconv-1.14.tar.gz
	# cd libiconv-1.14/
	# ./configure --prefix=/usr/local
	# make
	# make install
	# cd ../

>2.安装libmcrypt-2.5.8.tar.gz

	#wget http://nchc.dl.sourceforge.net/project/mcrypt/Libmcrypt/2.5.8/libmcrypt-2.5.8.tar.gz
	# tar zxvf libmcrypt-2.5.8.tar.gz
	# cd libmcrypt-2.5.8/
	# ./configure
	# make
	# make install
	# cd libltdl/
	# ./configure --enable-ltdl-install
	# make
	# make install
	# cd ../../

>3.安装mhash-0.9.9.9.tar.gz

	#wget http://nchc.dl.sourceforge.net/project/mhash/mhash/0.9.9.9/mhash-0.9.9.9.tar.gz
	# tar zxvf mhash-0.9.9.9.tar.gz
	# cd mhash-0.9.9.9/
	# ./configure
	# make
	# make install
	# cd ../

	//创建连接文件
	#ln -s /usr/local/lib/libmcrypt.la /usr/lib/libmcrypt.la
	#ln -s /usr/local/lib/libmcrypt.so /usr/lib/libmcrypt.so
	#ln -s /usr/local/lib/libmcrypt.so.4 /usr/lib/libmcrypt.so.4
	#ln -s /usr/local/lib/libmcrypt.so.4.4.8 /usr/lib/libmcrypt.so.4.4.8
	#ln -s /usr/local/lib/libmhash.a /usr/lib/libmhash.a
	#ln -s /usr/local/lib/libmhash.la /usr/lib/libmhash.la
	#ln -s /usr/local/lib/libmhash.so /usr/lib/libmhash.so
	#ln -s /usr/local/lib/libmhash.so.2 /usr/lib/libmhash.so.2
	#ln -s /usr/local/lib/libmhash.so.2.0.1 /usr/lib/libmhash.so.2.0.1
	#ln -s /usr/local/bin/libmcrypt-config /usr/bin/libmcrypt-config

>4.安装mcrypt-2.6.8.tar.gz

	wget http://acelnmp.googlecode.com/files/mcrypt-2.6.8.tar.gz
	# tar zxvf mcrypt-2.6.8.tar.gz
	# cd mcrypt-2.6.8/
	#/sbin/ldconfig
	# ./configure --prefix=/usr/local
	# make
	# make install
	# cd ../

>5.安装libxml2

	#wget http://ftp.gnome.org/pub/GNOME/sources/libxml2/2.6/libxml2-2.6.30.tar.gz
	#tar zxvf  libxml2-2.6.30
	#cd libxml2-2.6.30
	#./configure  --prefix=/usr/local
	#make
	#make install
	#cd ../

>6.安装openssl

	#wget http://www.openssl.org/source/openssl-1.0.1e.tar.gz
	#tar zxvf openssl-1.0.1e.tar.gz
	#cd openssl-1.0.1e
	#./config --prefix=/usr/local/ --openssldir=/usr/local/openssl -g3 shared zlib-dynamic enable-camellia
	# make && make install
	# cd ../

>7.安装libcurl

	#wget http://curl.haxx.se/download/curl-7.33.0.tar.gz
	#
	tar zxvf curl-7.33.0.tar.gz
	#cd curl-7.33.0
	#./configure --prefix=/usr/local
	#make && make install
	#cd ../

>8.安装gd-2.0.35.tar.gz

<p>安装前先必须安装jpeg,libpng,zlib,freetype</p>

	安装jpeg
	#wget http://www.ijg.org/files/jpegsrc.v9.tar.gz
	#tar zxvf jpegsrc.v9.tar.gz
	#cd jpeg-9
	#./configure --prefix=/usr/local/jpeg9 --enable-shared --enable-static
	#make && make install
	#cd ../
	
	安装libpng
	#wgt http://prdownloads.sourceforge.net/libpng/libpng-1.6.7.tar.gz
	#tar zxvf libpng-1.6.7.tar.gz
	#cd libpng-1.6.7
	#./configure --prefix=/usr/local
	#cd scripts/
	#mv makefile.linux ../makefile
	#cd ../
	#make && make install
	#cd ../
	
	
	安装zlib
	#wget http://optimate.dl.sourceforge.net/project/libpng/zlib/1.2.8/zlib-1.2.8.tar.gz
	#tar zxvf zlib-1.2.8.tar.gz
	#cd zlib-1.2.8
	#./configure --prefix=/usr/local
	#make && make install
	#cd ../
	
	安装freetype
	#wget http://prdownloads.sourceforge.net/freetype/freetype-2.1.10.tar.gz 
	#tar zxvf freetype-2.1.10.tar.gz
	#cd freetype-2.1.10
	#./configure --prefix=/usr/local/freetype
	#make
	#make install
	#cd ../
	
	安装gd
	#wget https://google-desktop-for-linux-mirror.googlecode.com/files/gd-2.0.35.tar.gz
	#tar -zxvf gd-2.0.35.tar.gz  
	#cd gd/2.0.35  
	#./configure --prefix=/usr/local/gd -with-jpeg=/usr/local/jpeg9 -with-freetype=/usr/local/freetype -with-png=/usr/local -with-zlib=/usr/local  
	#make  
	#make install
	#cd ../../

>9.安装php

	//http://www.php.net/releases/ 下载其他的版本
	#wget wget http://www.php.net/get/php-5.3.18.tar.gz/from/cn2.php.net/mirror
	Linux下如何校验文件：
	#md5sum php-5.3.18.tar.gz
	#sha256sum php-5.3.18.tar.gz
	
	#tar zxvf php-5.3.18.tar.gz
	#cd php-5.3.18
	#./configure --prefix=/usr/local/php/  -with-config-file-path=/usr/local/php/etc  -with-mysql=/usr/local/mysql -with-mysqli=/usr/local/mysql/bin/mysql_config -with-
	
	iconv-dir=/usr/local -with-freetype-dir=/usr/local/freetype -with-jpeg-dir=/usr/local/jpeg9 -with-png-dir=/usr/local  -with-zlib  -enable-fpm  -with-gd=/usr/local/gd
	-with-mcrypt=/usr/local -with-openssl -enable-zip -enable-sockets  -enable-mbregex -enable-xml -enable-safe-mode -enable-bcmath -enable-shmop -with-mhash -with-curl -
	
	with-xmlrpc -enable-soap -enable-gd-native-ttf -enable-mbstring -with-curlwrappers -enable-inline-optimization
	#make
	  
	//libpng16.so.16: cannot open shared object file: No such file or directory  
	解决：cp ../../libpng-1.6.77/libpng16.so.16 /usr/lib重新make
	#make test//会报错或者警告不用管直接make install，也会出现警告不用管，要安装的都已经安装好了的
	#make install  
	#cp php.ini-development  /usr/local/php/etc/php.ini 
	
	//修改php-fpm.conf
	#;pid=run/php-fpm.pid(25行)去掉注释
	#;error_log=run/php-fpm.log(32行)去掉注释启动的时候有产生php-fpm.pid可以平滑启动php-fpm
	
	//成功安装启动php  
	#/usr/local/php/sbin/php-fpm 

>10.安装扩展

	[编译安装PHP5扩展模块]
	# wget https://vps.googlecode.com/files/memcache-2.2.5.tgz
	# tar zxvf memcache-2.2.5.tgz
	# cd memcache-2.2.5/
	# /usr/local/php/bin/phpize
	# ./configure --with-php-config=/usr/local/php/bin/php-config
	# make
	# make install
	# cd ../
	
	# wget http://blog.s135.com/soft/linux/nginx_php/eaccelerator/eaccelerator-0.9.6.1.tar.bz2
	# tar jxvf eaccelerator-0.9.6.1.tar.bz2
	# cd eaccelerator-0.9.6.1/
	# /usr/local/php/bin/phpize
	# ./configure --enable-eaccelerator=shared --with-php-config=/usr/local/php/bin/php-config
	# make
	# make install
	# cd ../
	
	【编译PDO——MYSQL】
	#tar zxvf PDO_MYSQL-1.0.2.tgz
	#cd PDO_MYSQL-1.0.2/
	#/usr/local/php/bin/phpize
	#./configure --with-php-config=/usr/local/php/bin/php-config --with-pdo-mysql=/usr/local/mysql
	#make
	#make install
	
	
	[修改php.ini文件]
	手工修改：
	# vi /usr/local/php/etc/php.ini
	将 " extension_dir = "./" "
	修改为" extension_dir = "/usr/local/php/lib/php/extensions/no-debug-non-zts-20090626/"然后再下面添加
	extension = "memcache.so"
	extension = "pdo_mysql.so"
	
	[配置eAccelerator加速PHP]
	# mkdir -p /usr/local/eaccelerator_cache
	# vi /usr/local/php/etc/php.ini
	按shift+g键跳到配置文件的最末尾，加入以下配置信息：
	[eaccelerator]
	zend_extension="/usr/local/php/lib/php/extensions/no-debug-non-zts-20060613/eaccelerator.so"
	eaccelerator.shm_size="128"
	eaccelerator.cache_dir="/usr/local/eaccelerator_cache"
	eaccelerator.enable="1"
	eaccelerator.optimizer="1"
	eaccelerator.check_mtime="1"
	eaccelerator.debug="0"
	eaccelerator.filter=""
	eaccelerator.shm_max="0"
	eaccelerator.shm_ttl="300"
	eaccelerator.shm_prune_period="120"
	eaccelerator.shm_only="0"
	eaccelerator.compress="1"
	eaccelerator.compress_level="9"
	
	
	优化Linux内核参数 ,仅做参考
	# vi /etc/sysctl.conf
	18725816655
	↑ 修改配置文件
	将    "kernel.shmmax = **********"
	修改为        "kernel.shmmax = 134217728"
	# /sbin/sysctl -p
	↑ 执行此命令使配置生效

>10.启动关闭

<p>php 5.3.18 源码中已经内嵌了 php-fpm，不用象以前的php版本一样专门打补丁了，只需要在configure的时候添加编译参数即可。</p>

<p>关于php-fpm的编译参数有 –enable-fpm –with-fpm-user=www –with-fpm-group=www –with-libevent-dir=libevent位置。但是，php 5.3.18 下的php-fpm 不再支持 php-fpm 以前具有的 /usr/local/php/sbin/php-fpm (start|stop|reload)等命令，需要使用信号控制：</p>

	master进程可以理解以下信号
	INT, TERM 立刻终止
	QUIT 平滑终止
	USR1 重新打开日志文件
	USR2 平滑重载所有worker进程并重新载入配置和二进制模块
	示例：
	php-fpm 关闭：
	kill -INT `cat /usr/local/php/var/run/php-fpm.pid`
	php-fpm 重启：
	kill -USR2 `cat /usr/local/php/var/run/php-fpm.pid`
	查看php-fpm进程数：
	ps aux | grep -c php-fpm

>11.成功
