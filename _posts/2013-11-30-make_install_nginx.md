---
layout: post
title1: centos6.3编译安装nginx1.4.4
category: nginx
tags: nginx
keywords: 编译安装nginx1.4.4
description: QUIT处理完当前请求后关闭,HUP平滑启动,USR1日志切割,USR2平滑升级,启动：/usr/local/nginx/sbin/nginx ,平滑重启：kill -HUP \`cat /usr/local/nginx/logs/nginx.pid\`,或者：/usr/local/nginx/sbin/nginx -s reload,关闭:kill -QUIT \`cat /usr/local/nginx/var/logs/nginx.pid\`
---

>[安装Nginx所需的pcre库]

	#wget http://sourceforge.net/projects/pcre/files/pcre/8.33/pcre-8.33.tar.gz
	# tar zxvf pcre-8.33.tar.gz
	# cd pcre-8.33/
	# ./configure
	# make && make install
	# cd ../

>[安装Nginx 1.4.4]

	#wget http://nginx.org/download/nginx-1.4.4.tar.gz
	# tar zxvf nginx-1.3.9.tar.gz
	# cd nginx-1.3.9/
	#编译auto/cc/gcc文件,删除或者注释如下两行取消nginx在debug模式下编译，可减少编译后的大小，减少编译时间
	1.#debug
	2.CFLAGS="$CFLGS -g"
	
	# ./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
	# make
	# make install
	# cd ../

>[nginx.conf配置文件]

	#/usr/local/nginx/conf/nginx.conf
	可以参考一下配置
	user  www www;
	worker_processes 8;
	↑ Nginx每个进程耗费10M~12M内存
	error_log  /logs/nginx_error.log  warn;
	pid        /usr/local/nginx/logs/nginx.pid;
	#Specifies the value for maximum file descriptors that can be opened by this process.
	worker_rlimit_nofile 51200;
	events
	{
	use epoll;
	worker_connections 51200;
	}
	http
	{
	include       mime.types;
	default_type  application/octet-stream;
	#charset  gb2312;
	server_names_hash_bucket_size 128;
	client_header_buffer_size 32k;
	large_client_header_buffers 4 32k;
	sendfile on;
	tcp_nopush     on;
	keepalive_timeout 60;
	tcp_nodelay on;
	fastcgi_connect_timeout 300;
	fastcgi_send_timeout 300;
	fastcgi_read_timeout 300;
	fastcgi_buffer_size 64k;
	fastcgi_buffers 4 64k;
	fastcgi_busy_buffers_size 128k;
	fastcgi_temp_file_write_size 128k;
	gzip on;
	gzip_min_length  1k;
	gzip_buffers     4 16k;
	gzip_http_version 1.0;
	gzip_comp_level 2;
	gzip_types       text/plain application/x-javascript text/css application/xml;
	gzip_vary on;
	limit_zone  crash  $binary_remote_addr  10m;
	↑ 定义一个叫“crash”的记录区，总容量为 10M，以变量 $binary_remote_addr 作为会话的判断基准（即一个地址一个会话），当区的大小为 1M 的时候，大约可以记录 32000 个会话信
	
	息（一个会话占用 32 bytes）
	server
	{
	listen       80;
	server_name  www.xxx.com;
	index index.html index.htm index.php;
	root  /wwwroot;
	#limit_conn   crash  5;
	↑ *此处已被#注释掉了，即不起作用*定义整个网站的限制。此处为在"crash"记录区中，以变量 $binary_remote_addr 作为会话的判断基准（即一个地址一个会话），限制网站全局目录，
	
	一个会话只能进行5个连接（即一个IP只能发起5个连接，多过5个，一律503错误）
	#nginx的状态
	 location /NginxStatus {
	                stub_status on;
	                access_log on;
	        }
	
	location ~ .*\.(php|php5)?$
	{
	#fastcgi_pass  unix:/tmp/php-cgi.sock;
	fastcgi_pass  127.0.0.1:9000;
	fastcgi_index index.php;
	include fcgi.conf;
	}
	location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
	{
	expires      30d;
	}
	location ~ .*\.(js|css)?$
	{
	expires      1h;
	}
	location /resource/ {
	limit_conn   crash  2;
	↑ 定义resource目录的限制。此处为在"crash"记录区中，以变量 $binary_remote_addr 作为会话的判断基准（即一个地址一个会话），限制resource目录，一个会话只能进行2个连接（即
	
	一个IP只能发起2个连接，多过2个，一律503错误）
	}
	log_format  access  '$remote_addr - $remote_user [$time_local] "$request" '
	'$status $body_bytes_sent "$http_referer" '
	'"$http_user_agent" $http_x_forwarded_for';
	access_log  /logs/access.log  access;
	sendfile on;
	tcp_nopush on;
	client_max_body_size 50m;
	↑ 网站程序中允许上传的最大size，这里设置成50M，这里只是nginx的限制，PHP本身限制2M
	}
	}

>[启动Nginx]

	# ulimit -SHn 51200
	# /usr/local/nginx/sbin/nginx
	[在不停止Nginx服务的情况下平滑变更Nginx配置]
	修改/usr/local/nginx/conf/nginx.conf配置文件后，请执行以下命令检查配置文件是否正确：
	# /usr/local/nginx/sbin/nginx -t
	如果屏幕显示以下两行信息，说明配置文件正确：
	the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
	the configuration file /usr/local/nginx/conf/nginx.conf was tested successfully

>[优化Linux内核参数]

	FastCGI worker进程数是否不够
	　　通过命令查看服务器上一共开了多少的 php-cgi 进程
	　　 ps -fe |grep "php" | grep -v "grep" | wc -l
	　　使用如下命令查看已经有多少个php-cgi进程用来处理tcp请求
	　　 netstat -anop | grep "php" | grep -v "grep" | wc -l
	-----------------------------------------------------------
	# vi /etc/sysctl.conf
	在文件末尾增加以下内容内核优化（仅做参考）：
	net.ipv4.tcp_fin_timeout = 30 #表示如果套接字由本端要求关闭，这个参数决定了它保持在FIN-WAIT-2状态的时间。
	net.ipv4.tcp_keepalive_time = 300 #表示当keepalive起用的时候，TCP发送keepalive消息的频度。缺省是2小时，改为xx分钟。
	net.ipv4.tcp_syncookies = 1    #表示开启SYN Cookies。当出现SYN等待队列溢出时，启用cookies来处理，可防范少量SYN攻击，默认为0，表示关闭；
	net.ipv4.tcp_tw_reuse = 1     #表示开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接，默认为0，表示关闭；
	net.ipv4.tcp_tw_recycle = 1   #表示开启TCP连接中TIME-WAIT sockets的快速回收，默认为0，表示关闭。
	net.ipv4.ip_local_port_range = 5000    65000   #表示用于向外连接的端口范围。缺省情况下很小：32768到61000，改为1024到65000。
	# /sbin/sysctl -p
	↑ 使配置立即生效

>[nginx的启动，关闭与重启]

	QUIT处理完当前请求后关闭
	HUP平滑启动
	USR1日志切割
	USR2平滑升级
	启动：/usr/local/nginx/sbin/nginx 
	平滑重启：kill -HUP `cat /usr/local/nginx/logs/nginx.pid`
	或者：/usr/local/nginx/sbin/nginx -s reload
	关闭:kill -QUIT `cat /usr/local/nginx/var/logs/nginx.pid`

>成功
