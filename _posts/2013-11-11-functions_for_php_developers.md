---
layout: post
category: php
tags: php 
title1: 8 个必备的PHP功能开发
keywords: 8 个必备的PHP功能开发
description: 做过PHP开发的程序员应该清楚，PHP中有很多内置的功能，掌握了它们，可以帮助你在做PHP开发时更加得心应手，本文将分享8个开发必备的PHP功能，个个都非常实用，希望各位PHP开发者能够掌握。 
---

### 一.1、传递任意数量的函数参数 
 
我们在.NET或者JAVA编程中，一般函数参数个数都是固定的，但是PHP允许你使用任意个数的参数。下面这个示例向你展示了PHP函数的默认参数：

	// 两个默认参数的函数  
	function foo($arg1 = ”, $arg2 = ”) {  
	echo “arg1: $arg1\n”;  
	echo “arg2: $arg2\n”;  
	}  
	foo(‘hello’,'world’);  
	/* 输出: 
	arg1: hello 
	arg2: world 
	*/  
	foo();  
	/* 输出: 
	arg1: 
	arg2: 
	*/  
	下面这个示例是PHP的不定参数用法，其使用到了 func_get_args()方法：  
	// 是的，形参列表为空  
	function foo() {  
	// 取得所有的传入参数的数组  
	$args = func_get_args();  
	foreach ($args as $k => $v) {  
	echo “arg”.($k+1).”: $v\n”;  
	}  
	}  
	foo();  
	/* 什么也不会输出 */  
	foo(‘hello’);  
	/* 输出 
	arg1: hello 
	*/  
	foo(‘hello’, ‘world’, ‘again’);  
	/* 输出 
	arg1: hello 
	arg2: world 
	arg3: again 
	*/  

### 2、使用glob()查找文件 

大部分PHP函数的函数名从字面上都可以理解其用途，但是当你看到 glob() 的时候，你也许并不知道这是用来做什么的，其实glob()和scandir() 一样，可以用来查找文件，请看下面的用法：

	// 取得所有的后缀为PHP的文件  
	$files = glob(‘*.php’);  
	print_r($files);  
	/* 输出: 
	Array 
	( 
	[0] => phptest.php 
	[1] => pi.php 
	[2] => post_output.php 
	[3] => test.php 
	) 
	*/  

你还可以查找多种后缀名：

	// 取PHP文件和TXT文件  
	$files = glob(‘*.{php,txt}’, GLOB_BRACE);  
	print_r($files);  
	/* 输出: 
	Array 
	( 
	[0] => phptest.php 
	[1] => pi.php 
	[2] => post_output.php 
	[3] => test.php 
	[4] => log.txt 
	[5] => test.txt 
	) 
	*/

你还可以加上路径：

	$files = glob(‘../images/a*.jpg’);  
	print_r($files);  
	/* 输出: 
	Array 
	( 
	[0] => ../images/apple.jpg 
	[1] => ../images/art.jpg 
	) 
	*/ 

如果你想得到绝对路径，你可以调用 realpath() 函数： 

	$files = glob(‘../images/a*.jpg’);  
	// applies the function to each array element  
	$files = array_map(‘realpath’,$files);  
	print_r($files);  
	/* output looks like: 
	Array 
	( 
	[0] => C:\wamp\www\images\apple.jpg 
	[1] => C:\wamp\www\images\art.jpg 
	) 
	*/  

### 3、获取内存使用情况信息

PHP的内存回收机制已经非常强大，你也可以使用PHP脚本获取当前内存的使用情况，调用memory_get_usage() 函数获取当期内存使用情况，调用memory_get_peak_usage() 函数获取内存使用的峰值。参考代码如下： 

	echo “Initial: “.memory_get_usage().” bytes \n”;  
	/* 输出 
	Initial: 361400 bytes 
	*/  
	// 使用内存  
	for ($i = 0; $i < 100000; $i++) {  
	$array []= md5($i);  
	}  
	// 删除一半的内存  
	for ($i = 0; $i < 100000; $i++) {  
	unset($array[$i]);  
	}  
	echo “Final: “.memory_get_usage().” bytes \n”;  
	/* prints 
	Final: 885912 bytes 
	*/  
	echo “Peak: “.memory_get_peak_usage().” bytes \n”;  
	/* 输出峰值 
	Peak: 13687072 bytes 
	*/  

### 4、获取CPU使用情况信息 

获取了内存使用情况，也可以使用PHP的 getrusage()获取CPU使用情况，该方法在windows下不可用。

	print_r(getrusage());  
	/* 输出 
	Array 
	( 
	[ru_oublock] => 0 
	[ru_inblock] => 0 
	[ru_msgsnd] => 2 
	[ru_msgrcv] => 3 
	[ru_maxrss] => 12692 
	[ru_ixrss] => 764 
	[ru_idrss] => 3864 
	[ru_minflt] => 94 
	[ru_majflt] => 0 
	[ru_nsignals] => 1 
	[ru_nvcsw] => 67 
	[ru_nivcsw] => 4 
	[ru_nswap] => 0 
	[ru_utime.tv_usec] => 0 
	[ru_utime.tv_sec] => 0 
	[ru_stime.tv_usec] => 6269 
	[ru_stime.tv_sec] => 0 
	) 
	*/  

这个结构看上出很晦涩，除非你对CPU很了解。下面一些解释： 
>ru_oublock: 块输出操作

>ru_inblock: 块输入操作

>ru_msgsnd: 发送的message

>ru_msgrcv: 收到的message

>ru_maxrss: 最大驻留集大小

>ru_ixrss: 全部共享内存大小

>ru_idrss:全部非共享内存大小

>ru_minflt: 页回收

>ru_majflt: 页失效

>ru_nsignals: 收到的信号

>ru_nvcsw: 主动上下文切换

>ru_nivcsw: 被动上下文切换

>ru_nswap: 交换区

>ru_utime.tv_usec: 用户态时间 (microseconds)

>ru_utime.tv_sec: 用户态时间(seconds)

>ru_stime.tv_usec: 系统内核时间 (microseconds)

>ru_stime.tv_sec: 系统内核时间?(seconds)
 
要看到你的脚本消耗了多少CPU，我们需要看看“用户态的时间”和“系统内核时间”的值。秒和微秒部分是分别提供的，您可以把微秒值除以100万，并把它添加到秒的值后，可以得到有小数部分的秒数。 

	// sleep for 3 seconds (non-busy)  
	sleep(3);  
	$data = getrusage();  
	echo “User time: “.  
	($data['ru_utime.tv_sec'] +  
	$data['ru_utime.tv_usec'] / 1000000);  
	echo “System time: “.  
	($data['ru_stime.tv_sec'] +  
	$data['ru_stime.tv_usec'] / 1000000);  
	/* 输出 
	User time: 0.011552 
	System time: 0 
	*/  

sleep是不占用系统时间的，我们可以来看下面的一个例子： 

	// loop 10 million times (busy)  
	for($i=0;$i<10000000;$i++) {  
	}  
	$data = getrusage();  
	echo “User time: “.  
	($data['ru_utime.tv_sec'] +  
	$data['ru_utime.tv_usec'] / 1000000);  
	echo “System time: “.  
	($data['ru_stime.tv_sec'] +  
	$data['ru_stime.tv_usec'] / 1000000);  
	/* 输出 
	User time: 1.424592 
	System time: 0.004204 
	*/  

这花了大约14秒的CPU时间，几乎所有的都是用户的时间，因为没有系统调用。 
系统时间是CPU花费在系统调用上的上执行内核指令的时间。下面是一个例子： 

	$start = microtime(true);  
	// keep calling microtime for about 3 seconds  
	while(microtime(true) – $start < 3) {  
	}  
	$data = getrusage();  
	echo “User time: “.  
	($data['ru_utime.tv_sec'] +  
	$data['ru_utime.tv_usec'] / 1000000);  
	echo “System time: “.  
	($data['ru_stime.tv_sec'] +  
	$data['ru_stime.tv_usec'] / 1000000);  
	/* prints 
	User time: 1.088171 
	System time: 1.675315 
	*/  

我们可以看到上面这个例子更耗CPU。 

### 5、获取系统常量 

PHP 提供非常有用的系统常量 可以让你得到当前的行号 (__LINE__)，文件 (__FILE__)，目录 (__DIR__)，函数名 (__FUNCTION__)，类名(__CLASS__)，方法名(__METHOD__) 和名字空间 (__NAMESPACE__)，很像C语言。


<p>我们可以以为这些东西主要是用于调试，当也不一定，比如我们可以在include其它文件的时候使用?__FILE__ (当然，你也可以在 PHP 5.3以后使用 __DIR__ )，下面是一个例子。 </p>
	
	// this is relative to the loaded script’s path  
	// it may cause problems when running scripts from different directories  
	require_once(‘config/database.php’);  
	// this is always relative to this file’s path  
	// no matter where it was included from  
	require_once(dirname(__FILE__) . ‘/config/database.php’);  

下面是使用 __LINE__ 来输出一些debug的信息，这样有助于你调试程序：

	// some code  
	// …  
	my_debug(“some debug message”, __LINE__);  
	/* 输出 
	Line 4: some debug message 
	*/  
	// some more code  
	// …  
	my_debug(“another debug message”, __LINE__);  
	/* 输出 
	Line 11: another debug message 
	*/  
	function my_debug($msg, $line) {  
	echo “Line $line: $msg\n”;  
	}  

### 6、生成唯一的id 

很多朋友都利用md5()来生成唯一的编号，但是md5()有几个缺点：1、无序，导致数据库中排序性能下降。2、太长，需要更多的存储空间。其实PHP中自带一个函数来生成唯一的id，这个函数就是uniqid()。下面是用法：

	// generate unique string  
	echo uniqid();  
	/* 输出 
	4bd67c947233e 
	*/  
	// generate another unique string  
	echo uniqid();  
	/* 输出 
	4bd67c9472340 
	*/  

 
该算法是根据CPU时间戳来生成的，所以在相近的时间段内，id前几位是一样的，这也方便id的排序，如果你想更好的避免重复，可以在id前加上前缀，如： 

	// 前缀  
	echo uniqid(‘foo_’);  
	/* 输出 
	foo_4bd67d6cd8b8f 
	*/  
	// 有更多的熵  
	echo uniqid(”,true);  
	/* 输出 
	4bd67d6cd8b926.12135106 
	*/  
	// 都有  
	echo uniqid(‘bar_’,true);  
	/* 输出 
	bar_4bd67da367b650.43684647 
	*/  

### 7、序列化 

PHP序列化功能大家可能用的比较多，也比较常见，当你需要把数据存到数据库或者文件中是，你可以利用PHP中的serialize() 和 unserialize()方法来实现序列化和反序列化，代码如下：
	
	// 一个复杂的数组  
	$myvar = array(  
	‘hello’,  
	42,  
	array(1,’two’),  
	‘apple’  
	);  
	// 序列化  
	$string = serialize($myvar);  
	echo $string;  
	/* 输出 
	a:4:{i:0;s:5:”hello”;i:1;i:42;i:2;a:2:{i:0;i:1;i:1;s:3:”two”;}i:3;s:5:”apple”;} 
	*/  
	// 反序例化  
	$newvar = unserialize($string);  
	print_r($newvar);  
	/* 输出 
	Array 
	( 
	[0] => hello 
	[1] => 42 
	[2] => Array 
	( 
	[0] => 1 
	[1] => two 
	) 
	[3] => apple 
	) 
	*/  

如何序列化成json格式呢，放心，php也已经为你做好了，使用php 5.2以上版本的用户可以使用json_encode() 和 json_decode() 函数来实现json格式的序列化，代码如下：

	// a complex array  
	$myvar = array(  
	‘hello’,  
	42,  
	array(1,’two’),  
	‘apple’  
	);  
	// convert to a string  
	$string = json_encode($myvar);  
	echo $string;  
	/* prints 
	["hello",42,[1,"two"],”apple”] 
	*/  
	// you can reproduce the original variable  
	$newvar = json_decode($string);  
	print_r($newvar);  
	/* prints 
	Array 
	( 
	[0] => hello 
	[1] => 42 
	[2] => Array 
	( 
	[0] => 1 
	[1] => two 
	) 
	[3] => apple 
	) 
	*/  

### 8、字符串压缩 

当我们说到压缩，我们可能会想到文件压缩，其实，字符串也是可以压缩的。PHP提供了 gzcompress() 和gzuncompress() 函数： 

	$string =  
	“Lorem ipsum dolor sit amet, consectetur  
	adipiscing elit. Nunc ut elit id mi ultricies  
	adipiscing. Nulla facilisi. Praesent pulvinar,  
	sapien vel feugiat vestibulum, nulla dui pretium orci,  
	non ultricies elit lacus quis ante. Lorem ipsum dolor  
	sit amet, consectetur adipiscing elit. Aliquam  
	pretium ullamcorper urna quis iaculis. Etiam ac massa  
	sed turpis tempor luctus. Curabitur sed nibh eu elit  
	mollis congue. Praesent ipsum diam, consectetur vitae  
	ornare a, aliquam a nunc. In id magna pellentesque  
	tellus posuere adipiscing. Sed non mi metus, at lacinia  
	augue. Sed magna nisi, ornare in mollis in, mollis  
	sed nunc. Etiam at justo in leo congue mollis.  
	Nullam in neque eget metus hendrerit scelerisque  
	eu non enim. Ut malesuada lacus eu nulla bibendum  
	id euismod urna sodales. “;  
	$compressed = gzcompress($string);  
	echo “Original size: “. strlen($string).”\n”;  
	/* 输出原始大小 
	Original size: 800 
	*/  
	echo “Compressed size: “. strlen($compressed).”\n”;  
	/* 输出压缩后的大小 
	Compressed size: 418 
	*/  
	// 解压缩  
	$original = gzuncompress($compressed);  

几乎有50% 压缩比率。同时，你还可以使用 gzencode() 和 gzdecode() 函数来压缩，只不用其用了不同的压缩算法。