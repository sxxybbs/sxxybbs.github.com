---
layout: post
category: linux
tags: linux  
title1: dnspod 动态域名解析
keywords: dnspod 动态域名解析
description: 前段时间一直采用花生壳做动态域名解析，由于是免费的所以很不稳定，估计是限制了解析的频率。有了dnspod的动态域名解析，真的很nice！
---

### 1.思路

1.获得自己家里面的真实ip地址(广域网ip，这个ip地址是运营商分配的，大家都知道拨号上网每次IP都有可能变动。所以需要实现动态域名解析)

2.通过dnspod的API调用，修改对应的解析的ip地址改为现在变换之后的ip地址

3.通过linux的crontab定时去调用dnspod的API，当ip发生了改变之后就自动修改解析的ip。

crontab的教程：<a href="http://blog.sxxybbs.com/2013/10/15/crontab.html" target="_blank">http://blog.sxxybbs.com/2013/10/15/crontab.html</a>

### 2.python实现

获得domain_id可以用 

	curl -k https://dnsapi.cn/Domain.List -d “login_email=xxx&login_password=xxx”

获得record_id类似 

	curl -k https://dnsapi.cn/Record.List -d “login_email=xxx&login_password=xxx&domain_id=xxx”

替换上你的Email，密码，域名ID，记录ID等参数，就可以运行了。 会在后台一直运行，每隔300秒检查一遍IP，如果修改了就更新IP。

	#!/usr/bin/env python
	#-*- coding:utf-8 -*-
	
	import httplib, urllib
	import socket
	import time
	
	params = dict(
	  login_email="email", # replace with your email
	  login_password="password", # replace with your password
	  format="json",
	  domain_id=100, # replace with your domain_od, can get it by API Domain.List
	  record_id=100, # replace with your record_id, can get it by API Record.List
	  sub_domain="www", # replace with your sub_domain
	  record_line="默认",
	)
	current_ip = None
	
	def ddns(ip):
	  params.update(dict(value=ip))
	  headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/json"}
	  conn = httplib.HTTPSConnection("dnsapi.cn")
	  conn.request("POST", "/Record.Ddns", urllib.urlencode(params), headers)
	
	  response = conn.getresponse()
	  print response.status, response.reason
	  data = response.read()
	  print data
	  conn.close()
	  return response.status == 200
	
	def getip():
	  sock = socket.create_connection(('ns1.dnspod.net', 6666))
	  ip = sock.recv(16)
	  sock.close()
	  return ip
	
	if __name__ == '__main__':
	  while True:
	      try:
	          ip = getip()
	          print ip
	          if current_ip != ip:
	              if ddns(ip):
	                  current_ip = ip
	      except Exception, e:
	          print e
	          pass
	      time.sleep(300)

运行python脚本，不要忘记‘&’在后台执行

	python 脚本名称  &

在验证的过程中出错了，不过还是写出来做个纪念吧。

### 3.shell实现

编写dnspod.sh如下，填写对应的邮箱，密码，domain_id，record_id

	curl -X POST https://dnsapi.cn/Record.Ddns -d 'login_email=XXX&login_password=XXX&format=json&domain_id=2927298&record_id=44461709&record_line=%E9%BB%98%E8%AE%A4'

下面就要用到crontab的用法，其中/5表示没五分钟执行一次dnspod.sh命令，dnspod.sh需要跟绝对路径：

	/5 * * * * * /dnspod.sh

能够成功实现。据说上面的python代码出错的原因是dnspod的API更新了引起的。








