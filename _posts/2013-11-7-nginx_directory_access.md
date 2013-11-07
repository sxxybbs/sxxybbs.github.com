---
layout: post
category: nginx
tags: nginx 
title1: nginx限制ip访问目录
keywords: nginx,目录访问
description: 很多时候我们不希望其他的人访问网站的后台，所以我们可能会配置nginx，要求只能自己的ip地址才能访问网站后台，其他来源的ip禁止访问。这样安全性方便自然提升了不少。
---

### 1.限制private目录访问

	location /pricate {
		allow 192.168.1.0/24;
		deny all;
	}
	location ~ \.php$ {
                fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include /etc/nginx/fastcgi_params;
        }


这个时候实验会发现，private目录下的php之外的文件确实只有192.168.1.0这个网段的机器访问，但是php文件却依然可以访问，这是为什么哪？<br>
<p></p>
因为nginx的匹配方式是正则表达式优先级比较高。因此PHP解析用的是正则表达式进行匹配，而要限制的目录不是用正则表达式，所以，就算是限制了目录，因为PHP还是能被最先匹配到，所以，还是解析PHP了。
<br><p></p>
因此，如果要想解决问题的话，需要把目录也写成正则匹配，而且要放在PHP的前面，否则就会先匹配PHP。

### 2.限制private目录下的php文件的访问

	location ~ ^/private/ {
		allow 192.168.1.0/24;
		deny all;
	}
	
	location ~ \.php$ {
	                fastcgi_pass unix:/var/run/php5-fpm.sock;
	                fastcgi_index index.php;
	                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	                include /etc/nginx/fastcgi_params;
	        }

改成这样以后，会发现php文件提示打开、保存，我点了保存以后，下载
回来的文件就是明文的源代码。这又是为什么哪？<br>

<p></p>

在location中使用正则表达式去匹配的话，第一个匹配上的就不会再去匹配别的规则了，因此下面的那个匹配php文件的规则实际上被忽略了，因此php文件访问的时候就提示是打开还是保存了。

### 3.完整的实现

把解析php的代码也放入private目录中

	location ~ ^/private/ {
			allow 192.168.1.0/24;
			deny all;
			fastcgi_pass unix:/var/run/php5-fpm.sock;
		    fastcgi_index index.php;
		    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		    include /etc/nginx/fastcgi_params;
		}
	
	location ~ \.php$ {
		    fastcgi_pass unix:/var/run/php5-fpm.sock;
		    fastcgi_index index.php;
		    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		    include /etc/nginx/fastcgi_params;
		        }

这样当匹配到private目录中的php文件是只进入location ~ ^/private/中，同时也可以解析php文件了。网站其他的php解析对应匹配到下面的location中，也不会影响到网站的其他部分。
