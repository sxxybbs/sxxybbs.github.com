---
layout: post
category: linux
tags: linux
title1: linux 配置静态ip地址
keywords: linux,静态ip地址
description: Linux系统下如何设置IP地址？我们可以通过命令设定IP的方法，不过此方法的前提条件是用户需root权限。在Linux系统的 
/etc/sysconfig/network-script/ifcfg-eth0文件中存放着网卡IP地址配置的相关信息。
---

### 1.修改IP

>/etc/sysconfig/network-script/ifcfg-eth0

	DEVICE="eth0"
	BOOTPROTO="static"
	HWADDR="00:0C:29:C9:A1:4E"
	IPADDR="192.168.1.20"
	NETMASK="255.255.255.0"
	GETEWAY="192.168.1.1"
	NM_CONTROLLED="yes"
	ONBOOT="yes"
	TYPE="Ethernet"
	UUID="16967a2a-9f91-468e-b974-b880b4b5b976"

### 2.修改DNS

	echo 'nameserver 61.128.128.68'>/etc/resolv.conf

### 3.配置网关

	route add default gw 192.168.1.1

### 4.添加linux系统启动项

>vi /etc/rc.d/rc.local

系统重新启动后再用户登录之前会执行rc.local中的脚本，每行代表一个命令执行，比如我们把默认的网关配置写入rc.local中,

	#!/bin/sh
	#
	# This script will be executed *after* all the other init scripts.
	# You can put your own initialization stuff in here if you don't
	# want to do the full Sys V style init stuff.
	
	touch /var/lock/subsys/local
	route add default gw 192.168.1.20
	#ifconfig eth0 192.168.1.20 netmask 255.255.255.0 up

### 5.测试是否能上网

重启：`init 6`<br>

测试：`ping www.baidu.com`


