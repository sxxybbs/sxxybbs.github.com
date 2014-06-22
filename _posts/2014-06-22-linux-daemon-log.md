---
layout: post
title1: linux浅谈守护进程和日志
category: linux
tags: linux
keywords: linux守护进程,linux日志
description: 七上八下回忆下关于linux守护进程和日志的相关知识。
---
<p>上周服务器突然出现了点故障，突然mysql无法链接失败，由于对日志不是很熟悉所以就想找个时间温习温习下。回家花了点时间把Linux关于日志的章节看了篇，回想起了一些还是蛮有收获。今天随便继续翻阅下，顺道记录也把Linux守护进程一章看了下。下面是内容简单知识，简单而精悍。在继续观看之间还是先养下眼睛吧。</p>
<p><img src="/assets/img/beauty/xiaohua-.jpg"></p>

<h3>linux daemon守护进程</h3>

<p>先来看看Linux下的daemon(守护进程)和server的关系，长驻在内存中的进程，且可以提供一些系统或网络功能，这个就是服务(server)。提供服务总是需要进程的运行，我们把实现这个server的程序称为daemon，举个例子：实现循环例行性工作调度服务(server)的程序为crond，所以我们称crond为daemon。觉得搅的在读两遍。</p>
<p>daemon的分类：<br/>
1.stand alone，独立启动服务。优势：反应较快，比如www，ftp等。劣势：长期呆在内存中暂用资源。<br/>
2.super daemon，一个特殊的daemon来管理，一般为xinetd。优势：能够统一管理，释放为使用的内存资源。劣势：由于是客户端有链接才唤醒相应的服务到内存中，所以反应稍微慢，比如telnet。</p>
<p>可以通过查看/etc/servers去了解服务与端口的对应。启动daemon的进程通常最末会加上一个d，例如：sshd，httpd，vsftpd。stand alone daemon启动脚本放置在/etc/init.d/这个目录中，super daemon的配置文件放在/etc/xinetd.d/*内,后者启动的方式为:/etc/ini.d/xinetd restart</p>
<p>关于service启动stand alone daemon,其实质是调用了/etc/ini.d/中对应的服务来启动的,例如:service httpd restart。相当于:/etc/init.d/httpd restart。可以自己去分析下service这个脚本文件，which service.</p>
<p>super daemon的配置文件/etc/xinetd.conf，个别文件也可能在/etc/xinetd.d/*内。配置文件还可以设置连接客户端的链接与否，具有类似防火墙的功能。若想统一管理防火墙的功能，可以通过/etc/hosts.{allow,deny}，如安装了wrappers时还可以使用额外的spawn功能。如果想开机设置某个服务可以通过chkconfig等命令来完成</p>
<p><img src="/assets/img/beauty/xiaohua-1.jpg"></p>

<h3>Linux 日志记录部分<h3>

<p>日志文件可以记录时间的时间，地址，何人，何事四大信息，因此系统发现有故障的时候必然要查看文件日志。日志文件一般情况下都放在/var/log文件夹下，其中messages记录的信息很重要。日志文件记录主要的服务与程序为：syslogd,klogd,log因各个Linux的版本不一样有微小的差异。syslogd的配置文件/etc/rsyslog.conf，去查看下相应的内容吧。内容语法大概就是:服务.等级 记载设备或者文件。</p>
<p>如果我们同时管理了多台Linux那是不是需要我们管理人员分别登陆每一台查看对应的日志呢，其实不是的。Linux提供了日志文件服务器的功能，可以通过修改/etc/sysconfig/rsyslog中的配置文件来开启日志文件服务器。采用netstat -tnulp | grep 'syslog'来查看是否开启了。日志文件的轮替logrotate，logrotate是通过crontab来实现的，具体的可以查看/etc/cron.daily/logrorate,而logrotate的配置文件可以查看/etc/logrorate.conf和/etc/logrorate.d/*内，建议去查看下相应的语法。举一个实例：</p>
<p>自定义的日志轮替,为了安全起见我们设置文件的chattr +a属性,添加之后连root用户也没法修改该文件,只能在文件末尾添加内容。</p>
	
	1.添加chattr +a属性
	chattr +a /var/log/test.log
	2.添加/etc/logrorate.d/test配置文件,vi /etc/logrorate.d/test
	
	#代码,其中很多可以使用/etc/logrotate.conf中的默认值
	/var/log/test.log{
		monthy <==每个月进行一次
		size=10M <==文件容量大于10M则开始处理
		rotate 4 <==保留4个
		compress <==进行压缩
		sharedscripts <==在开始轮替之前去掉属性
			/usr/bin/chattr -a /var/log/test.log
		endscript
		sharedscripts
		postrotate <==轮替之后的操作
			/usr/bin/killall -HUP syslogd
			/usr/bin/chattr +a /var/log/test.log
		endscript			
	
	}

