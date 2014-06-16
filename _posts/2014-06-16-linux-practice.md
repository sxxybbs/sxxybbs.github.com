---
layout: post
title1: linux练习笔记
category: linux
tags: linux
keywords: linux练习笔记
description: 温故而知新，可以为师矣。刚开始学习linux的时候记录的学习笔记，拿出来记录下，以免以后忘记啦。
---
<p>要想学习linux还是记得去买一本linux书吧。这篇文章主要记录了最初踏入linux学习的初级笔记，记录下来以后好重复的复习，温故而知新，可以为师矣。</p>
Linux练习笔记<br/>
第一章：初步进入linux的字符界面<br/>
1.runlevel<br/>
2.init 2<br/>
3.shutdown <br/>
4.reboot<br/>
5.halt<br/>
6.shutdown –h now   shutdown –h 45<br/>
7.reboot –r now ‘system will reboot now’<br/>
8.man ls|more <br/>
9.init –help<br/>
10.whereis ls<br/>
11.whoami<br/>
12.which ls<br/>
13.ls –al | grep ‘.bash*’<br/>
14.ls –al;du –hs<br/>
15.ls –al /kongning&&du –hs<br/>
16.cat $(locate httpd.conf)<br/>
17.cat `locate httpd.conf`<br/>
18.alias OK=’ls -al’;OK<br/>
19.unalias OK<br/>
20.ls /etc|more<br/>
21.rpm –qa|grep a|more<br/>
22.echo ‘hello world’>a<br/>
23.cat <a<br/>
24.ls /kongning 2>a<br/>
25.echo ‘上面是一个错误重定向,这是一个追加’ >>a<br/>
26.echo ‘同时实现输出重定向和错误重定向’&>a<br/>
27.ls .bash*<br/>
28.echo $PS1;echo $PATH<br/>
29.set<br/>
30.set nu vi编辑器<br/>
31.set ic; / ! <br/>