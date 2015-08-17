---
layout: post
category: nginx
tags: nginx 
title1: nginx限制ip访问
keywords: nginx,限制ip访问
description: nginx中针对一些IP和IP段限制访问。
---

### 1.建立ip.blacklist文件

>vi ip.blacklist

	deny 192.168.1.11;
	deny 10.2.3.0/24;
	allow all;

### 2.配置nginx.conf

在nginx的配置文件nginx.conf中加入:

	include ip.blacklist;

ip.blacklist中的格式可以为：

>allow 1.1.1.1;

>deny 1.1.1.0/24;

>deny all;

>allow all;
