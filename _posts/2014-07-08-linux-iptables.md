---
layout: post
title1: iptables简单实例
category: linux
tags: linux
keywords: iptables简单实例,iptables封锁ip或者ip段,iptables解除封锁ip或者ip段
description: 一个简单的iptables实例,实例演示的内容为,iptables封锁ip或者ip段,iptables解除封锁ip或者ip段。
---
<p>一直觉得linux的iptables和复杂，也就没有仔细去研究。但是下面的实例是非常简单明了的，就一两句命令就可以让你的服务器封锁固定的ip或者ip段，当你想去掉的时候也可以通过下面的命令去解除被封锁的ip或者ip段。<br/>
如果没有硬件防火墙，有个iptables也还是能起到小小的作用的，在介绍之前让你先养养眼睛吧。<br/><img src='/assets/img/beauty/20140708142126.jpg'></p>

<h3>命令实例</h3>

1.屏蔽单个IP的命令

	iptables -I INPUT -s 192.168.9.198 -j DROP
	


