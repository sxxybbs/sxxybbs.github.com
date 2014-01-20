---
layout: post
title1: debian安装配置源
category: linux
tags: linux
keywords: debian配置源
description: 在安装debian系统后想通过putty来链接，发现默认情况下debian没有安装ssh，下面做一个笔记
---

### 安装debian。

<p>采用的虚拟机，下载iso镜像文件默认安装</p>

### 配置DNS
	
	nano /etc/resolv.conf//默认没有这个文件需要创建

	nameserver 8.8.8.8
	
### 配置ip上网

	nano /etc/network/interfaces//修改配置文件

	auto lo
	iface lo inet loopback
	auto eth0
	allow-hotplug eth0
	iface eth0 inet static
	address 192.168.1.21
	netmask 255.255.255.0
	gateway 192.168.1.1
	
	service networking restart
	
	ping www.baidu.com //测试能否上网

### 配置源

	nano /etc/apt/sources.list//配置文件

	# 网易163更新服务器：
	deb http://mirrors.163.com/debian/ squeeze main non-free contrib
	deb http://mirrors.163.com/debian/ squeeze-proposed-updates main non-free contrib
	deb-src http://mirrors.163.com/debian/ squeeze main non-free contrib
	deb-src http://mirrors.163.com/debian/ squeeze-proposed-updates main non-free contrib
	
	# sohu 更新服务器：
	deb http://mirrors.sohu.com/debian/ lenny main non-free contrib
	deb http://mirrors.sohu.com/debian/ lenny-proposed-updates main non-free contrib
	deb-src http://mirrors.sohu.com/debian/ lenny main non-free contrib
	
	
	#保存后更新源
	apt-get update

### 安装ssh

	apt-get install ssh
	安装之后默认启动

### 测试

<p>用putty链接成功</p>

	




