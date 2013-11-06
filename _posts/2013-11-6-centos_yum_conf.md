---
layout: post
category: linux
tags: linux
title1: centos yum 配置源
keywords: centos,yum
description: 在默认安装的源来自国外，速度会有所下降，这里简单的把源配置为国内的，相对来说比较稳定，以163的yum源为例。
---

### 1.下载repo文件

	wget http://mirrors.163.com/.help/CentOS6-Base-163.repo

### 2.备份并替换系统的repo文件

>[root@localhost ~]# cd /etc/yum.repos.d/

>[root@localhost ~]# mv CentOS-Base.repo CentOS-Base.repo.bak

>[root@localhost ~]# mv /root/CentOS6-Base-163.repo CentOS-Base.repo

### 3.执行yum源更新

>[root@localhost ~]# yum clean all

>[root@localhost ~]# yum makecache

>[root@localhost ~]# yum update

### 4.测试安装centos常用的软件包及工具

 	yum -y install gcc gcc-c++ autoconf libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel ncurses ncurses-devel curl curl-devel