---
layout: post
category: jquery
tags: jquery
title1: Jquery jcarousellite使用
keywords: Jquery jcarousellite使用
description: Jquery jcarousellite使用
---
jCarousel Lite is a jQuery plugin that carries you on a carousel ride filled with images and HTML content. Put simply, you can navigate images and/or HTML in a carousel-style widget. It is super light weight, at about 2 KB in size, yet very flexible and customizable to fit most of our needs.

	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="http://www.gmarwaha.com/jquery/jcarousellite/js/jcarousellite_1.0.1.min.js"></script>
	<body>
	<button class="prev"><<<</button>
	<button class="next">>>></button>
	<div class="anyClass">
	    <ul>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
			<li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	        <li> <img src="http://img0.bdstatic.com/img/image/6979213b07eca806538fbb8fe0495dda144ad348253.jpg" alt="" width="200" height="200"> </li>
	    </ul>
	</div>
	<script>
	$(function() {
	    $(".anyClass").jCarouselLite({
	        btnNext: ".prev",
	        btnPrev: ".next",
			scroll: 4,
			visible:5,
	    });
	});
	</script>


参数说明：

<p>btnPrev     string 上一个按钮的class名, 比如  btnPrev: ".prev"</p>

<p>btnNext     string 下一个按钮的class名, 比如  btnPrev: ".prev"</p>

<p>btnGo       array  自定义滚动位置,类似幻灯片效果置,有选项卡,按照数组顺序,依次为按钮1按钮2按钮N,如以下,class名为1的按钮是第一个按钮：[".1", ".2"]</p>

<p>mouseWheel  bool   鼠标滑是否可以轮控制上下滚动,可选：false,true,默认false</p>

<p>auto        int    指定多少秒内容定期自动滚动。默认为空(null),是不滚动,如果设定的,单位为毫秒,如1秒为1000</p>

<p>speed       int    滑动的速度,可以尝试800 1000 1500,设置成0将删除效果</p>

<p>easing      string 缓冲效果名称,如：easing: "bounceout",需要jquery中的easing pluin（缓冲插件实现）,只适用于jq1.2</p>

<p>vertical    bool   是否垂直滚动,可选：false,true,默认false</p>

<p>circular    bool   是否循环滚动,默认为true,如果为false,滚动到最后一个将停止滚动</p>

<p>visible     int    可见数量,可以为小数，如2.5为2.5个li</p>

<p>start       int    开始的地方,默认是0</p>

<p>scroll      int    每次滚动的li数量</p>

<p>beforeStart func   滚动开始时回调的函数,可以传入对象参数 beforeStart: function(a) { alert("开始的对象是:" + a)}</p>

<p>afterEnd    func   滚动结束时回调的函数,使用方法同上</p>

<p>http://www.gmarwaha.com/jquery/jcarousellite/</p>
