---
layout: post
category: lnmp
tags: Mysql php nginx
description: 心血来潮倒想用Raspberry Pi搭建一个lnmp环境，在借助dnspod做一个动态域名解析（还没有验证），那必须毫不犹豫的折腾一下了。
---

### 安装过程
    sudo apt-get install mysql-server mysql-client
    sudo apt-get install php5
    sudo apt-get install php5-fpm php5-mysql php5-curl php5-gd php5-idn php-pear php5-imagick php5-imap php5-mcrypt php5-memcache php5-ming php5-ps php5-pspell php5-recode php5-snmp php5-sqlite php5-tidy php5-xmlrpc php5-xsl
    sudo apt-get install nginx

### 友情提示

 1.安装mysql的时候会提示设置密码。必须使用MyIASM，在my.cnf中添加default-datastore-engine=MyIASM

 2.使用php5-fpm作为nginx的php扩展替代php-fastcgi，fpm对于nginx和apache兼容性较好。

 3.有域名的朋友。可以去dnspod 注册账号，然后把NS 转过去。配合下面的python代码，做个动态域名，话说真的很nice

  获得domain_id可以用 curl -k https://dnsapi.cn/Domain.List -d “login_email=xxx&login_password=xxx”

  获得record_id类似 curl -k https://dnsapi.cn/Record.List -d “login_email=xxx&login_password=xxx&domain_id=xxx”

  替换上你的Email，密码，域名ID，记录ID等参数，就可以运行了。 会在后台一直运行，每隔300秒检查一遍IP，如果修改了就更新IP。

###python代码
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

最后别忘记放在后台运行哦，呵呵。

    python 脚本名称  &
