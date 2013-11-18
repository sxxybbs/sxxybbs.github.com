---
layout: post
category: php
tags: php
title1: php xml 留言板
keywords: xml留言板
description:
---

### 1.xml文件结构设计

>xml.xml文件

	<?xml version="1.0" encoding="utf-8"?>
	<threads>
	</threads>

	
### 2.前台留言页面

>xml.html

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>我要留言</title>
	</head>
	<body>
	<form action="xml.php" method="post">
	<input type="hidden" name="action" value="save" />
	标题：<input type="text" name="title"><br>
	内容: <textarea name="content" cols="50" rows="10"></textarea><br>
	<input type="submit" value="submit" />
	</form>
	</body>
	</html>

### 3.php处理页面

>xml.php

	<?php
	header("Content-type:text/html;charset=utf-8");
	
	//留言处理
	if($_POST['action'] == 'save'){
	$guestbook = new DomDocument();//创建一个新的DOM对象
	$guestbook->load('xml.xml');//读取xml文件
	$threads = $guestbook->documentElement;//获得xml结构的根
	//创建一个新的节点
	$thread = $guestbook->createElement('thread');
	$threads->appendChild($thread);
	
	//在新的thread节点上创建title标签
	$title = $guestbook->createElement('title');
	$thread->appendChild($title);
	$title->appendChild($guestbook->createTextNode($_POST['title']));
	
	
	//在新的thread节点上创建content标签
	$content = $guestbook->createElement('content');
	$thread->appendChild($content);
	$content->appendChild($guestbook->createTextNode($_POST['content']));
	
	
	//将xml数据写入文件
	$fp = @fopen('xml.xml','w');
	if(fwrite($fp,$guestbook->saveXML())){
		echo "留言成功<br><a href='xml.php?action=list'>查看所有的留言</a><br><a href='xml.html'>继续留言</a>";
	}else{
		echo "留言失败<br><a href='xml.php?action=list'>查看所有的留言</a><br><a href='xml.html'>继续留言</a>";
	}
	fclose($fp);
	}
	//查看所有的留言
	else{
	//打开用于存储留言的XML文件
	$guestbook = simplexml_load_file(dirname(__FILE__).'/xml.xml');
	//循环读取thread标签
	foreach($guestbook->thread as $th){
		echo "<span style='color:#0F0'>".$th->title."</span><br>";
		echo "<span style='color:#00F'>".$th->content."</span><br>";
		echo "<span style='color:#F00'>---------------------------------------------------------------------</span><br>";	
	}
	}
	?>

