---
layout: post
category: linux
tags: linux shell  
title1: shell编程基础
keywords: shell编程基础
description: 通常情况下，从命令行每输入一次命令能够得到系统的一次响应。但是如果一个接一个的去输入命令，那么效率会很低，而使用shell程序或者shell脚本可以很好的解决这个问题。shell程序是解释执行的不需要编译成目的程序。
---

### 一.语法基本介绍

1.开头

>\#!/bin/bash

2.注释

>\#

3.执行

>如果脚本是可执行的，输入完整的脚本名，或者用bash 完整的脚本名，或者bash<完整的脚本名

### 二：shell变量

**1.环境变量**

>PATH，HOME，UID，PWD，PS，用set命令可以查看环境变量

**2.用户定义的变量**

>\#AS=123

>\#echo $AS  ->  123

只读变量：

>\#readonly A=1

>\#echo $A  ->  1

用户定义的变量都是当前shell的局部变量，不能被shell运行的其他命令或shell程序利用，
用export说明的变量在shell以后运行的命令和程序中可以访问。


**3.位置参数**

位置参数是一种在调用shell程序的命令行中按照各自的位置决定的变量，是在程序名之后输入的参数。位置参数之间用空格分隔，shell取第一个位置参数替换程序文件中的$1,第二个位置参数为$2，以此类推。$0是一个特殊的变量，它的内容是当前这个shell程序的文件名，所以$0不是位置参数，在当前所有的位置参数的时候是不包括$0的。

**4.预定义变量**

预定义变量和环境变量类似，也是shell一开始时就定义了的变量。常用的预定义变量：

>$#:位置参数的数量

>$*:所有位置参数的内容

>$?:命令执行后返回的状态

>$$：当前进程的进程号

>$!:后台运行的最后一个进程号

>$0:当前执行的进程名

**5.参数置换的变量**

1).变量=${参数-word}  变量等于是否设置参数，有则等于参数，无则等于word

2).变量=${参数=word}  变量等于是否设置参数，有则等于参数，无则等于word，同时把word赋值给参数，在shell程序中不能用这种方式，因为位置参数不能赋值。

3).变量=${参数？word} 变量等于是否设置参数，有则等于参数，无则显示word的内容，然后退出，如果省略word则显示标准信息，这种方法通常用在出错提示。

4).变量=${参数+word}  变量等于是否设置参数，有则等于word的值，否则不进行置换。

### 三：变量表达式

test [表达式]

表达式所代表的操作符有字符串操作符，数字操作符，逻辑操作符，文件操作符。

**1.字符串比较**

作用：测试字符串是否相等，长度是否为0，字符串是否为null

常用的字符串比较符：

=：比较两个字符串是否相等，相等则为'是'

!=：比较两个字符串是否相等，不相等则为'是'

-n:比较字符串的长度是否大于0，如果大于0则为'是'

-z：比较字符串的长度时候等于0，如果等于0则为'是'

例子：

	#STR1=abc
	#test $STR1='abc'
	#echo $?

输出：0,0表示字符串STR1等于abc


**2.数字比较**

-eq等于，-ne不等于， -ge大于等于， -le小于等于，-gt大于，-lt小于

例子：

	#A=123
	#test $A -ge 66
	#echo $?

输出：0，则为真

**3.逻辑测试**

！非，-a（and）都为真则真，-o(or)一个为真则为真

**4.文件操作**

-d为目录,-f为文件,-L符号链接,-r可读,-w可写,-x可执行,-s文件存在且长度非0,!测试条件的否定

例子：

	#cat /dev/null > empty
	#test -s empty
	#test ! -s empty
	#echo $?

输出：0，因为empty为null

**5.进行test测试的标准方法**

bash在使用test测试时用方括号将整个test测试括起来

例子：

	#INT1=4
	#[$INT1 -ge 5]
	#echo $?

输出：1，则为假

### 四：bash的内部命令

>echo,eval,exec,export,readonly,read,shift,wait,exit

### 五：shell的流程控制

**1.if条件语句**

格式1：

	if 命令行1
	then
	命令行2
	fi

格式2：

	if 命令行1
	then
	命令行2
	else
	命令行3
	fi

例子test.sh：

	#!/bin/bash
	#filename:test.sh
	echo 'do you want to continue:Y or N'
	read ANSWER
	if [ $ANSWER = N -o $ANSWER = n ]
	then
	exit
	fi

另外可以见shell实现useradd的文档。

**2.case条件**

格式：

	case string in
	exp-1)
	        若干个命令1
	;;
	exp-2)
	        若干个命令2
	;;
	...
	*)
	        若干个命令
	
	esac

例子:

	#!/bin/bash
	#filename:case.sh
	echo which one is true?
	echo A:1+1=2
	echo B:1+1=3
	echo C:1+1=4
	read ONE
	case $ONE in
	A)
	        echo TRUE
	;;
	B)
	        echo WRONG
	;;
	C)        
	        echo WRONG
	;;
	*)
	        echo WRONG
	;;
	esac

**3.循环控制**

1).for循环

格式：如果缺少[in 数值列表]，则参数为位置参数的值

	for 变量名 [in 数值列表]
	do
	        若干命令行
	done

2).while循环

格式：while循环是用命令的返回状态值来控制循环的

	while
	        若干个命令行1
	do
	        若干个命令行2
	done

例子：计算1到5的平方根

	#!/bin/bash
	#filename:while.sh
	INT1=1
	while [ $INT! -le 5 ]
	do
	        AN='expr $INT! \* $INT1'
	        echo $AN
	        INT1='exor $INT1 + 1'
	done

3).until循环

格式:与while循环相反，返回的状态值为假时执行

	until
	        若干命令行1
	do
	        若干命令行2
	done


### 六：函数

例子：

	#!/bin/bash
	#filename:function.sh
	iscontinue(){
	while true
	do
	        echo -n 'continue?([Y/N])'
	read ANSWER
	        case $ANSWER in
	[Yy])         return 0;;
	[Nn])        return 1;;
	*)        echo 'Answer Y or N' 
	        esac        
	done
	
	}
	#调用函数iscontinue
	iscontinue
