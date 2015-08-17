---
layout: post
category: raspberry
tags: Raspberry
title1: 树莓派通过usb摄像头实现网络监控功能
keywords: 树莓派usb监控
description: 树莓派通过usb摄像头实现网络监控功能
---

### 1.安装USB摄像头

查看是否连接：

    ls -l /dev/video0  
	crw-rw---T 1 root video 81, 0 Nov  1 20:01 /dev/video0

### 2.安装mplayer 
	
	sudo apt-get install mplayer 

### 3.安装motion

	sudo apt-get install motion

### 4.配置motion

	sudo vi /etc/motion/motion.conf

找到”control_localhost on “和”webcam_localhost on“这两行，改为以下两行后，保存退出 

>control_localhost off 

>webcam_localhost off 	

### 5.运行motion软件，输入 

	motion -n

### 6.配置网页查看监控

>配置网页：http://192.168.1.8:8080 

>监控网页：http://192.168.1.8:8081
