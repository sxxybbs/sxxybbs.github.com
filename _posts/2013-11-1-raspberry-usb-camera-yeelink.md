---
layout: post
category: raspberry
tags: Raspberry
title1: 树莓派玩家5分钟内将树莓派-USB摄像头与Yeelink连接–最好玩的网页监控器
keywords: 树莓派usb摄像
description: 5分钟一点也不夸张, 在你熟悉Yeelink使用的情况下, 你真的只需几分钟就可以搭建一套在线图像监控, 神马入室小偷啥的, 还能逃过你的千里眼 当然, 要是使用motion来获取图像, 还能做到画面动作检测, 有兴趣的同学可以继续发挥哦. 废话少说, 来看看几分钟怎么做到的吧.
---

### 1.将USB连接树莓派上

查看是否连接：

    ls -l /dev/video0  
	crw-rw---T 1 root video 81, 0 Nov  1 20:01 /dev/video0

### 2.安装抓图软件fswebcam
	
	sudo apt-get install fswebcam

### 3.登录Yeelink

 在用户中心增加一个设备, 再为之增加一个图像传感器.

### 4.准备脚本yeelink.sh

内容为以下两行命令, 其中的ApiKey和URL请改为自己设备对应的信息.

	sudo fswebcam -d /dev/video0 -r 320x240 --bottom-banner --title "RaspberryPi @ Yeelink" --no-timestamp /root/raspberry.jpg
	curl --request POST --data-binary @"/root/raspberry.jpg" --header "U-ApiKey:aec1eaa87c070d32812f4d4" http://api.yeelink.net/v1.0/device/5815/sensor/9809/photos

### 5.添加进crontab中

	*/ * * * * /yeelink.sh

搞定, 至此我们的监控就开始运行了, 上网页上看看效果吧
http://www.yeelink.net/devices/1022