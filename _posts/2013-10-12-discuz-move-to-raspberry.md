---
layout: post
category: discuz
tags: discuz 
title1: 用树莓派当做家庭服务器跑discuz
keywords: discuz原创搬家
description: 一直采用的租用虚拟机在跑论坛，最近越来越慢了，都没有心情看他了。在家里看到有一个闲着的树莓派，就想法直接用他来跑论坛吧，想到这里于是就开始动起来了。下面是论坛的搬家教程，最后也给出来搬家之后采用树莓派跑论坛的效果地址。由于没有调优一直按F5还会出现502，等有空了在慢慢调优下。
---

#### 步骤1

>备份网站全部数据库

#### 步骤2

>备份网站的所有程序

#### 步骤3

>下载相应版本的install安装包（如果已经有就不需要重新下载了）

#### 步骤4

>重新安装discuz X2.5运行 /install (这里会叫你删除/data/install.lock文件)在安装的过程中，填写自己数据库的用户名和密码，注意要保持和备份数据库名称和表前缀一致。

#### 步骤5

>由于重新安装了，现在服务器上添加了一个数据库，删除这个数据库，把备份的数据库导入，因为数据库名和表前缀一致，所以直接导入就可以了。 

#### 步骤6

>登陆后台admin.php 重新更改域名设置。（如果登陆不了可能是由于你之前设置了cookie的作用域，删除cookie的作用域，在config/config_global.php中）。

#### 步骤7

>更新css和缓存

#### 步骤8

>重新配置.htaccess 这里需要看后台的相应的规则，我已自己的为例：

>Nginx Web Server

>第一步：修改conf文件，找到站点.conf文件.大概在/usr/local/nginx/conf/vhost下

>第二步：替换include n.conf为一下配置的伪静态代码

	rewrite ^([^\.]*)/topic-(.+)\.html$ $1/portal.php?mod=topic&topic=$2 last;
	rewrite ^([^\.]*)/article-([0-9]+)-([0-9]+)\.html$ $1/portal.php?mod=view&aid=$2&page=$3 last;
	rewrite ^([^\.]*)/forum-(\w+)-([0-9]+)\.html$ $1/forum.php?mod=forumdisplay&fid=$2&page=$3 last;
	rewrite ^([^\.]*)/thread-([0-9]+)-([0-9]+)-([0-9]+)\.html$ $1/forum.php?mod=viewthread&tid=$2&extra=page%3D$4&page=$3 last;
	rewrite ^([^\.]*)/group-([0-9]+)-([0-9]+)\.html$ $1/forum.php?mod=group&fid=$2&page=$3 last;
	rewrite ^([^\.]*)/space-(username|uid)-(.+)\.html$ $1/home.php?mod=space&$2=$3 last;
	rewrite ^([^\.]*)/blog-([0-9]+)-([0-9]+)\.html$ $1/home.php?mod=space&uid=$2&do=blog&id=$3 last;
	rewrite ^([^\.]*)/(fid|tid)-([0-9]+)\.html$ $1/index.php?action=$2&value=$3 last;
	rewrite ^([^\.]*)/([a-z]+[a-z0-9_]*)-([a-z0-9_\-]+)\.html$ $1/plugin.php?id=$2:$3 last;
	if (!-e $request_filename) {
	        return 404;
	}

>第三步：重新启动nginx 以lnmp为例命令：/root/lnmp restart

至此整个搬家过程完成。

效果查看地址：[http://www.sxxybbs.com](http://www.sxxybbs.com)
