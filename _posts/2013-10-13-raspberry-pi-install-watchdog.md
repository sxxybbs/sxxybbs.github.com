---
layout: post
category: linux
tags: linux 
title1: 给Raspberry pi 安装看门狗程序让它永不死机 
keywords: 看门狗
description: 树莓派跑论坛后总想做点什么来保护它，今天看到一个运用觉得还不错。给Raspberry pi 安装看门狗程序让它永不死机 
---

#### 你还在担心树莓派死机吗？给他装个看门狗吧！



### 什么是看门狗程序？

看门狗程序就是一个健康监控程序，每间隔一定时间（默认10秒)检查一次是否在设定的健康工作范围内，如果超过即启动硬件复位程序，让设备重新启动，恢复健康。

### 树莓派支持硬件自动复位？

是的，开源的BCM2708芯片让树莓派拥有了硬件看门狗芯片功能，加上linux内核编译好了的bcm2708_wdog模块，树莓派通过watchdog程序实现硬件看门狗功能，达到自动复位功能。

### 看门狗能做些什么？

比如CPU占用过高假死一定时间，系统严重报错无法响应，CPU温度过高…各种状态均可<br>

接下来一步一步指导如何实现看门狗功能<br>

首先让硬件的看门狗模块运行起来

	modprobe bcm2708_wdog
	vi /etc/modules
	#加入一行 "bcm2708_wdog" 

接下来安装看门狗守护进程，他的功能就是每间隔一定时间向看门狗硬件模块发送一个状态，如果失败，则触发硬件看门狗让树莓派重启


	apt-get install watchdog 
	apt-get install chkconfig 
	chkconfig watchdog on 
	#chkconfig是设定看门狗程序随系统启动自动运行 

在开始运行watchdog之前，先配置一下这个程序

	vi /etc/watchdog.conf 
	取消掉 watchdog-device = /dev/watchdog 前的注释#号，让他监控的设备指向CPU的硬件看门狗 
	取消掉 max-load-1 = 24 前的注释#号，当1分钟load进程超过24个的时候（一般5个就是超高负载了，再<FONT face="Courier New">高可以认为是死机，这在遭遇DDOS攻击的时候很容易遇到）就触发重启</FONT>

还可以设置如温度到了多少度就重启，如 取消掉

temperature-device =

max-temperature = 120

前的注释#号，改为

temperature-device = /sys/class/thermal/thermal_zone0/temp

max-temperature = 75000

（温度一般不超过85度就不会损坏芯片，/sys/class/thermal/thermal_zone0/temp记录的是实时的温度，单位为千分之一摄氏度，所以75000就是75℃）

还可以设置内存耗尽就重启，如min-memory =1 前的注释#号去掉

还可以设置监控的间隔，如 interval = 1 前的注释#号去掉，该1为任意数字，单位是秒，默认是10秒一次健康检查

更多设置查阅watchdog文档

接下来我们让watchdog程序运行起来

	/etc/init.d/watchdog start

让我们来测试一下死机后会不会自动重启吧

	:(){:|:&};:

运行这一串字符会让系统内核立马崩溃，等等看，是不是10秒后他就自动重启了。
利用看门狗程序，结合raspberry pi 的CPU硬件看门狗模块，实现了raspberry pi永不死机。 
