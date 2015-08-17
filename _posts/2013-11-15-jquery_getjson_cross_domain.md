---
layout: post
category: php
tags: php json
title1: $.getJSON()跨域获取JSON数据
keywords: $.getJSON()跨域获取JSON数据
description: $.getJSON()跨域获取JSON数据
---

假设在服务器上有文件 http://test.unmi.cc/json.php 文件，它的内容为：

	[代码1]
	<?php
	header('Content-type: application/json');
	 
	$user = array (
	    "name"  => "Unmi",
	    "blog" => "http://unmi.cc"
	);
	 
	echo json_encode($user);
	?>

要是在同一个域上要取该文件的内容，那好办，比如同为 test.unmi.cc 域上的 ajax.html 文件中写上：

	[代码2]
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>
	$(function(){
	    $.getJSON("json.php", /*跨域时换成 "http://test.unmi.cc/json.php"*/
	        function(data){
	            alert(data.name);
	        }
	    )
	});
	</script>

<p>那么可以弹出 data.name 为 “Unmi".</p>
<p>但如果 ajax.html 是放在另一个域上，比如说 ajax.html 是在本地，再来取 http://test.unmi.cc/json.php 的 json 数据时，这时候在 Firebug 中你可以看到其实也会用 ajax 来请求 http://test.unmi.cc/json.php 的数据，但是 XHR 里的 Response 是空的，字节数是对的。也就是说对 http://test.unmi.cc/json.php 的 http 请求/响应是完成了的，但基于安全性考虑，浏览器会拒绝处理响应数据。</p>

<p>不少资料上会说，在 jQuery 使用 $.getJSON() 请求数据时，如果判断到请求的数据不在同一个域上会自动采用 JSONP (JSON with Padding) 的方式进行跨域请求，但是还忽略了两点：</p>

>一是需要发送 callback=? 或 jsoncallback=? 请求参数

>二是这时候还需要服务端的支持，送出的数据就不是 JSON 数据，而是由 callback 或  jsoncallback 参数指定名称的 javascript 函数调用，参数才是 JSON 数据

<p>所以要完成 $.getJSON() 的跨域调用服务端和客户端必须分别改造成：</p>

<p>服务端 http://test.unmi.cc/json.php</p>

	[代码3]
	<?php
	header('Content-type: application/javascript');
	 
	$user = array (
	    "name"  => "Unmi",
	    "blog" => "http://unmi.cc"
	);
	 
	echo $_GET['callback']."(".json_encode($user).")";
	?>

客户端   ajax.html 文件内容：

	[代码4]
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>
	$(function(){
	    $.getJSON("http://test.unmi.cc/json.php?callback=?"
	        function(data){
	            alert(data.name);
	        }
	    )
	});
	</script>

<p>这样就可以得到预期的结果，就是这里多了个 callback，也可以使用 jsoncallback。</p>
<p>我们用 Firebug 来观察上面代码在进行跨域请求时，并未发出 XHR 请求，而是使用了< script src="">去请求的脚本，它发出的请求是：</p>

>http://test.unmi.cc/json.php?callback=jQuery172018016521480994097_1338136926617&_=1338136926659

得到的响应数据是：

>jQuery172018016521480994097_1338136926617({"name":"Unmi","blog":"http:\/\/unmi.cc"});

上面的 callback=? 参数并不是说发送了参数值为 ?，再说 ? 号也得转义才成，? 号只是个点位符，会由 jQuery 来生成一个方法名，如这里的:

>jQuery172018016521480994097_1338136926617

<p>如果把 [代码4] 放在与 http://test.unmi.cc/json.php 的同一个域上去执行，那么它发出的请求与响应会是与跨域时一样的，但它却会以 XHR 方式来请求数据，而不是 < script src=""> 方式。</p>
<p>$.getJSON() 跨域调用的原理，基本上在 jQuery 里涉及到 ajax 跨域的调用都是通过 < script src=""> 来完成的，不知有没有用 < iframe src=""> 的。解释 $.getJSON() 在跨域时，其实就是指定的 $.ajax() 里的 dataType 为 jsonp，进而和 $.getScript 的实现原理是一样的：</p>

	[代码5]
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = s.url;
	head.appendChild(script);

<p>记得在  $.getJSON() 如果是跨域时获得的是一段 JavaScript 调用代码，函数名由  callback 指定，该函数由 jQuery 生成，JSON 数据作为参数传给该 callback 函数，最后这个 JSON 数据也会传递到 success 函数中去，所以我们能够像 $getJSON() 获取本域的 JSON 数据那样使用。</p>

<p>不用便捷的  $.getJSON() 而采用基础的 $.ajax() 函数来作跨域调用就得写成：</p>

	[代码6]
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>
	$(function(){
	      $.ajax({
	       url: "http://test.unmi.cc/json.php",
	       dataType:'jsonp',
	       success: function(data){
	          alert(data.name);
	       }
	   });
	});
	</script>

<p>只告诉它 dataType 为  jsonp 即可，它同样是发出类似</p>

>http://test.unmi.cc/json.php?callback=jQuery172018016521480994097_1338136926617&_=1338136926659


的请求，callback 参数名是默认的。

<p>再加上两个 $.ajax 跨域获取 JSON 数据时两个重要的选项，比如下面的代码：</p>

	[代码7]
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script>
	$(function(){
	      $.ajax({
	       url: "http://test.unmi.cc/json.php",
	       dataType:'jsonp',
	       jsonp:'jsonpcallback',
	       jsonpCallback:'jsonCallbackFunction123',
	       success: function(data){
	          alert(data.name);
	       }
	   });
	});
	</script>

执行后发出的请求是：

>http://test.unmi.cc/json.php?jsonpcallback=jsonCallbackFunction123&_=1338139076306

响应是：

>jsonCallbackFunction123({"name":"Unmi","blog":"http:\/\/unmi.cc"});

<p>与上面对照一下就能看出来 jsonp 用来指定传送函数名的请求参数名，而不是默认的 callback，jsonpCallback 指定回调函数的名数，而不用默认 jQuery 随机生成的那一长串的函数名称。</p>

<p>而且，因为回调函数名是已知的，所以你可以自己定义那个 jsonCallbackFunction123 函数，原型是：</p>

>function jsonCallbackFunction123(data) { ... },

<p>即使自定义了这个回调函数，由  success 指定的函数同样会得到调用，会在 jsonCallbackFunction123 之后被调用。</p>

<p>关于 $.getJSON() 可以看官方的说明 http://api.jquery.com/jQuery.getJSON/，其中有一个取 flickr 上照片的例子。</p>

<p>顺便引入一个可在线测试各种 JavaScript 框架的网站 http://jsfiddle.net/praveen_prasad/tnaWd/，支持各版本的 jQuery, Mootools, Prototype, YUI, Glow, Dojo, Processing, ExtJS, Raphael, RightJS, ThreeJS, Zepto, Enyo, Shipyar, MooFx 和 Knockout。</p>

<p>试用一下，进到 http://jsfiddle.net/praveen_prasad/tnaWd/，选择框架为 jQuery 1.7.2, 事件为 onLoad 或 onDomReady，然后在 Javascript 框中贴入代码：</p>

	//[代码8]
	//$(function(){  
	    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?",
	        function(data){
	          $.each(data.items, function(i,item){
	            $("<img/>").attr("src", item.media.m).appendTo("body");
	            if ( i == 3 ) return false;
	          });
	    });
	//});

再点击上边的 Run 按钮，一会儿就能看到 Result 框中显示四个可爱的猫咪图片。

<p>参考：1. Using JQuery, AJAX and JSONP to do cross-domain calls with PHP</p>


