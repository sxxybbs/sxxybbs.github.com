---
layout: post
category: google
tags: Google 
title1: goagent代理使用教程
keywords: goagent,代理,免费翻墙软件
description: 今天在使用goagent时出现"403 thats an erroryour client does not have permission to get url /2 from this server. thats all we know."导致无法翻墙了，找不到原因，于是乎只能删除重新安装一次了。以前的goagent版本3.0.2，现在安装版本3.0.6，发现还是不稳定，难道乎要开会了。
---

### 1.goagent介绍

<p>goagent是国内很多朋友常用的免费代理工具，也是使用最广泛的谷歌应用之一，今天我们就来分享下goagent下载以及使用的相关事宜。 首先介绍一下goagent，它是使用Python和Google App EngineSDK编写的，可以在 Windows，Mac，Linux，Android，iPod Touch，iPhone，iPad，webOS，OpenWrt，Maemo 等平台上使用。</p><br>

<p>goagent虽然比较好用，但goagent代理传输中的数据是没有加密的，由于Google App Engine的IP段（位于美国）被国内封锁了，使用GAE托管程序的goagent通常用的是谷歌中国在北京数据中心的IP地址。如果你对代理的数据安全很看重，就别选择goagent，要选择那些能加密数据的代理工具，如果对于代理安全性没有什么特别要求，使用goagent即可。</p><br>

<p>为方便大家，这里再分享几款安全性非常出色的代理工具，全部完全免费，采用高强度加密代理，可保障用户安全，而且代理速度很快，使用方法比goagent更为简单，需要的朋友可以<a href='http://www.goagent8.info/tool.rar'>【下载】</a></p>

### 2.goagent下载使用方法

>1.goagent官方下载地址是： https://code.google.com/p/goagent/ ，要下载最新goagent版本的朋友，可以收藏该地址。如果该网址打不开，可能是被河蟹了，可借助上面提供的代理工具来访问。

>2.下载了 goagent 后，我们需要申请 Google Appengine 并创建 appid ，申请的详细方法见教程： https://code.google.com/p/goagent/wiki/InstallGuide

>3.然后我们修改 local\proxy.ini 中的[gae]下的 appid=你的appid (多appid请用|隔开)

>4.双击 server\uploader.bat ，上传成功后即可使用了(地址127.0.0.1:8087)

>5.如果你使用chrome浏览器，请安装SwitchySharp插件，然后导入这个设置： https://goagent.googlecode.com/files/SwitchyOptions.bak

>6.firefox浏览器请安装FoxyProxy，Firefox需要导入证书，更多说明可见其官方下载地址，里面有非常详细的说明。

>7.goagent对用户是有流量限制的，目前为每人每天1GB，如果流量不够大家可以多申请几个号码，或者使用上面提供的代理工具，那几款代理工具是没有流量限制的。


### 3.goagent常见问答

1. goagent提示Error code 错误怎么办？

>如果出现了一些错误，可参考下面这些常见错误的提示，更多错误提示，可到官方帮助页面了解。

>401: Unauthorized 一般是你处于内网环境中，需要设置proxy.ini里面的proxy段落。还需要检查：Internet属性——》连接（connections）——》局域网设置（LAN settings）——》代理服务器（Proxy server）里面打勾，地址和端口应该是127.0.0.1：8087，如果不是可以在proxy.ini中查到

>404: Not Found 一般是proxy.ini里面appid没有填对，或者服务端没有部署成功。

>409: 一般是您处于内网或者校园网环境，建议您换外网再次上传即可。

>503: Service Unavailable 一般是流量用完了，请更换appid。


2.如何对goagent进行修改？

>客户端代码直接改local/proxy.py,改完重启goagent.exe即可；服务端改server/wsgi.py,改完用uploader.bat上传即可。
