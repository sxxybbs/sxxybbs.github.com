---
layout: post
category: jquery
tags: jquery
title1: javascript模拟发包
keywords: js模拟发包
description: javascript模拟浏览器发包
---

### 1.get请求发包

	var img=document.createElement('img');
	img.src='XXX';
	document.body.appendChild(img);

### 2.post请求发包

	方式1：
	var f=document.createElement('form');
	f.action='';
	f.method='post'
	document.body.appendChild('f');
	var il=document.createElement('input');
	il.name='name';
	il.value='name';
	f.appentChild(il);
	var il1=document.createElement('input');
	il1.name='passwd';
	il1.value='passwd';
	f.appendChild(il1);
	f.submit();

	方式2：
	var dd=document.createElement('div');
	document.body.appendChild(dd);
	dd.innerHTML="<form method='' action='' id='xssform'><input type='hidden' name='' value=''><input type='hidden' name='' value=''></form>";
	document.getElementById('xssform').submit();

### 3.ajax请求发包

	var url='XXX';
	var poststr='name=value&name1=value1';
	var ajax=null;
	if(window.XMLHttpRequest){
		ajax=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		ajax=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		return;
	}
	ajax.open('POST',url,true);
	ajax.setRequestheader('Content-Type','application/x-www-form-urlencoded');
	ajax.send(poststr);
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4&&ajax.status==200){
			alert('Done');
		}
	}