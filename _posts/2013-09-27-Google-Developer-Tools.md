---
layout: post
category: Google
tags: Google
title1: google开发者工具使用教程
keywords: google开发者工具使用教程
description: 作为一个Web开发人员，与我们开发相关的Chrome开发者工具，火狐的Firebug等等。由于个人的爱好就只谈论google的，对于其他的开发者工具，同学们可以去了解用一用。下面就详细说说Chrome的开发者工具。
---

### 1.启动Chrome的开发者工具

你可以直接在页面上点击右键，然后选择审查元素：

![](http://www.cr173.com/up/2012-9/2012091013364392328.png)

或者在Chrome的工具中找到：

![](http://www.cr173.com/up/2012-9/2012091013364380847.png)

或者，你直接记住这个快捷方式： Ctrl+Shift+I (或者Ctrl+Shift+J直接打开控制台)，或者直接按F12。

打开的开发者工具就长下面的样子：

![](http://www.cr173.com/up/2012-9/2012091013364374975.png)

可以点左下角的那个按钮，将开发者工具弹出作为一个独立的窗口：

![](http://www.cr173.com/up/2012-9/2012091013364476821.png)

下面来分别说下每个Tab的作用。


### 2. Elements标签页

这个就是查看、编辑页面上的元素，包括HTML和CSS：

![](http://www.cr173.com/up/2012-9/2012091013364493383.png)

左侧就是对页面HTML结构的查看与编辑，你可以直接在某个元素上双击修改元素的属性，或者你点右键选"Edit as Html"直接对元素的HTML进行编辑，或者删除某个元素，所有的修改都会即时在页面上得到呈现。（注：看到上面右键菜单的最后一个选项"审查元素"了么？这是不是说明这个开发者工具的页面也是HTML来的呢？你点一下就知道了哦，嘿嘿）
你还可以对某个元素进行监听，在JS对元素的属性或者HTML进行修改的时候，直接触发断点，跳转到对改元素进行修改的JS代码处：

![](http://www.cr173.com/up/2012-9/2012091013364426080.png)

Elements标签页的右侧可以对元素的CSS进行查看与编辑修改：

![](http://www.cr173.com/up/2012-9/2012091013364481902.png)

你还可以通过这里看到各CSS选择器设置的CSS值的覆盖情况。
下面的Metrics可以看到元素占的空间情况（宽、高、Padding、Margin神马的）：

![](http://www.cr173.com/up/2012-9/2012091013364431425.png)

注意到上面的Properties没有？这个很有用哦，可以让你看到元素具有的方法与属性，比查API手册要方便得多哦（要注意某些方法和属性在IE、FireFox等其他浏览器下面的支持情况哦）。

### 3.Resources标签页

![](http://www.cr173.com/up/2012-9/2012091013364476030.png)

Resources标签页可以查看到请求的资源情况，包括CSS、JS、图片等的内容，同时还可以查看到存储相关的如Cookies、HTML5的Database和LocalStore等，你可以对存储的内容编辑和删除。
这里的CSS文件有一个好玩的特性，你可以直接修改CSS文件，并且修改即时生效哦：

![](http://www.cr173.com/up/2012-9/2012091013364510310.png)

### 4. Network标签页

![](http://www.cr173.com/up/2012-9/2012091013364628190.png)

Network标签页对于分析网站请求的网络情况、查看某一请求的请求头和响应头还有响应内容很有用，特别是在查看Ajax类请求的时候，非常有帮助。注意是在你打开Chrome开发者工具后发起的请求，才会在这里显示的哦。

点击左侧某一个具体去请求URL，可以看到该请求的详细HTTP请求情况：

![](http://www.cr173.com/up/2012-9/2012091013364768240.png)

我们可以在这里看到HTTP请求头、HTTP响应头、HTTP返回的内容等信息，对于开发、调试，都是很有用的。

### 5.Scripts标签页

很明显，这个标签页就是查看JS文件、调试JS代码的，直接看下图的说明：

![](http://www.cr173.com/up/2012-9/2012091013364891943.png)

还有你可以打开Javascript控制台，做一些其他的查看或者修改：

![](http://www.cr173.com/up/2012-9/2012091013364970564.png)

你甚至还可以为某一XHR请求或者某一事件设置断点：

![](http://www.cr173.com/up/2012-9/2012091013364964692.png)


### 6.Timeline标签页

注意这个Timeline的标签页不是指网络请求的时间响应情况哦（这个在Network标签页里查看），这个Timeline指的JS执行时间、页面元素渲染时间：

![](http://www.cr173.com/up/2012-9/2012091013364936649.png)

点击底部的Record就可以开始录制页面上执行的内容。

### 7. Profiles标签页

这个主要是做性能优化的，包括查看CPU执行时间与内存占用：

![](http://www.cr173.com/up/2012-9/2012091013364970037.png)

![](http://www.cr173.com/up/2012-9/2012091013364925169.png)

### 8. Audits标签页

这个对于优化前端页面、加速网页加载速度很有用哦（相当与Yslow）：

![](http://www.cr173.com/up/2012-9/2012091013365060665.png)

点击run按钮，就可以开始分析页面，分析完了就可以看到分析结果了：

![](http://www.cr173.com/up/2012-9/2012091013365021406.png)

它甚至可以分析出页面上样式表中有哪些CSS是没有被使用的哦：

![](http://www.cr173.com/up/2012-9/2012091013365071619.png)

### 9. Console标签页

就是Javascript控制台了：

![](http://www.cr173.com/up/2012-9/2012091013365026751.png)

这个除了查看错误信息、打印调试信息（console.log()）、写一些测试脚本以外，还可以当作Javascript API查看用。

例如我想查看console都有哪些方法和属性，我可以直接在Console中输入"console"并执行：

![](http://www.cr173.com/up/2012-9/2012091013365076964.png)

怎么样，一目了然了吧 ？再例如我想查看日期函数都有哪些方法：

![](http://www.cr173.com/up/2012-9/2012091013365037704.png)

（注：注意在这里看到的某些方法和属性是ES5新增的，记得兼容其他浏览器的支持情况哦）

### 10. 结语

Google Chrome除了简洁、快速，现在的Chrome的插件也非常的丰富了。而对于web开发者来说，Chrome对于HTML5、CSS3等一些新标准的支持也是比较完善的，而且Chrome的开发者工具我个人认为真的非常好用，这就是为什么我向web开发者推荐使用Chrome的原因。
