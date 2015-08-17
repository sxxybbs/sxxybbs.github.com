---
layout: post
category: dedecms
tags: dedecms  
title1: DedeCms中arclist标签无法调用副栏目文章的解决办法
keywords: DedeCms中arclist标签无法调用副栏目文章的解决办法
description: 最近发现dedecms中的文章在选择幅栏目后，在其对应的幅栏目列表中可以显示该文章，但在arclist 标签中却无法显示该文章，网上找了很多，解决办法都一样，但写法却写错了，导致arclist标签在使用了flag属性时会失效的问题。修正后的写法如下。
---

打开/include/taglib/arclist.lib.php，我目前用的最新版 5.7 SP1，代码约位于295-296行。查找以下两行代码。

	if($CrossID=='') $orwheres[] = ' arc.typeid IN ('.GetSonIds($typeid).')';
    else $orwheres[] = ' arc.typeid IN ('.GetSonIds($typeid).','.$CrossID.')';

将其替换成以下代码。

	if($CrossID=='') $orwheres[] = ' (arc.typeid IN ('.GetSonIds($typeid).') OR arc.typeid2 IN ('.GetSonIds($typeid).')) '; 
	else $orwheres[] = ' (arc.typeid IN ('.GetSonIds($typeid).','.$CrossID.') OR arc.typeid2 IN ('.GetSonIds($typeid).','.$CrossID.')) ';

OK，这样就改完了，保存后如果你是生成静态的，请生成相关的。如果是动态的，请更新系统缓存。然后就可以看到效果了。