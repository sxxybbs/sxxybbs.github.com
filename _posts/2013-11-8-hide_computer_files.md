---
layout: post
title1: 建立O盘，隐藏你放在电脑的秘密
keywords: 隐藏磁盘,保密文件方法
description: 建立O盘，隐藏你放在电脑的秘密。
---

### 1.方法

新建个文本文件复制以下代码：

	@ECHO OFF?
	    MD E:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}>NUL
	    IF EXIST O:\NUL GOTO DELETE
	    SUBST O: E:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}
	    START
	    O:\
	    GOTO END
	    :delete
	    SUBST /D O:
	    :END

然后把txt改成cmd双击，看看是不是多了个o盘，把文件放进去，再双击，o盘隐藏了。要用时双击cmd文件o盘就显示了。然后把这个cmd的文件放入自己的u盘中携带。