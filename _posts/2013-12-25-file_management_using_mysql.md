---
layout: post
title1: mysql数据库管理中文件的使用
category: mysql
tags: mysql
keywords: mysql数据库管理中文件的使用
description: 当要向表中输入大量的数据时，如果从MySql监视器上一条一条的通过键盘来输入记录的话，那么会非常的费时费力的。所以下面介绍mysql数据库管理中文件的使用。
---

### 对csv文件的使用

>导入：LOAD DATA INFILE 文件名 INTO TABLE 表名 选项；

>导出：SELECT * INTO OUTFILE 文件名 选项 FROM 表名；

选项:

1. FIELDS TERMINATED BY 分隔符(默认[\t],即tab字符)
2. LINES TERMINATED BY 换行符（默认为[\n]）
3. INGORE 最初跳过的行 LINES(默认为0)

例子：

	mysql>LOAD DATA INFILE 'c:/data/t.csv' INTO TABLE tab1 FIELDS TERMINATED BY '，';
	
	mysql>SELECT * INTO OUTFILE 'c:/data/t.c' FIELDS TERMINATED BY '，' FROM tab1;

### sql文件系列

>SOUCE 文件名

	mysql>SOUCE 'c:/data/t.sql'

请注意SOUCE并非SQL命令，因此在命令行的最后不能以逗号结束。


>mysql 数据库名  -u用户名 -p密码 -e "mysql监视器下的命令"

	mysql -uroot -p123 -e "SOUCE c:/data.t.sql"

请注意-t后的命令需要使用“”括起来，而非单引号。这里的mysql监视器下的命令是指在mysql监视器下运行的命令，这条命令在命令行中执行而不是在mysql监视器中执行。

>将mysql命令以批处理方式运行

在window环境中，将在命令行窗口运行的命令，保存为扩展名为[.bat]的批处理文件，然后双击就会自动的执行了。

	mysql home -uroot -p123 -e "SELECT * INTO OUTFILE 'c:/data/t.csv' FIELDS TERMINATED BY '，' FROM tab1"

将数据库home中的表tab1保存到t.csv的批处理文件

### 文件中保留mysql的执行结果

	1.采用重定向
	mysql -uroot -p123 -e "SOUCE c:/data/t.sql">log.txt
	mysql>SELECT * FROM tab1>tab	

	2.使用tee和notee将命令之间的sql语句的执行结果保留到log1.txt中
	mysql>tee log1.txt
	mysql>use home;
	mysql>select * from tab1;
	mysql>notee

### 数据库的备份和恢复

>mysql -uroot -p123 home>1.sql [--default-character-set=utf8]

>mysqladmin -uroot -p123 CREATE home1

>mysql -uroot -p123 home1<1.sql [--default-character-set=utf8]

注意：如果在数据库进行备份和恢复的过程中出现错误，那么是字符编码不匹配可能是主要的原因之一，所以最好在执行命令的时候注意字符选项。




	

