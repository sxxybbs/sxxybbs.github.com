---
layout: post
category: Raspberry
tags: Raspberry
title1: 树莓派初级教程
keywords: 树莓派初级教程,树莓派入门,树莓派运用
description: 这篇文章的目的是帮助刚使用Raspberry PI的童鞋，通过怎么启动树莓派到用命令安装软件，并采用Q&A的方式编写，这样大家更容易一目了然的看明整个帖子的内容，层次分明，调理清晰。
---

###### 1.Q:树莓派怎么启动？

A:使用win32diskimager将系统镜img文件写入SD卡中，然后插到树莓派的卡槽中，上电，即可启动系统。需要注意的是，我最初使用的是TF小卡套上SD卡套来实现启动的，一开始也的确使用正常，后来在使用过程中发现系统无法启动，一度以为是RPI坏了，发回爱板网让小鸟帮我检测，得出结论是SD卡套的问题。这个卡套在电脑上读写的时候是正常的，但是树莓派却无法读出系统。因此建议各位还是尽量直接用SD卡，或者是用U大的TF转SD变形卡，比市面上2块钱的SD卡套质量要好的多.

###### 2. Q:没有屏幕，没有键盘，怎么玩树莓派？

A:没有屏幕和键盘，只要你有一根最大负载至少750ma的5V电源适配器和一根网线，你就可以使用电脑通过SSH连上树莓派。这里，我要说明的是，树莓派官方系统Raspbian自2012-9-18版本之后，均设置了ssh服务随系统自动启动，我使用的是最新的2013-09-10-wheezy-raspbian版本。插上SD卡，插上网线，上电，树莓派启动约30秒之后，应该就启动完成了。我们只需要一个SSH客户端来连接树莓派就可以。这里推荐putty.exe这个小巧的ssh客户端软件，整个程序就一个exe文件，很精简。

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial1.jpg)

IP地址填上树莓的IP，其他设置不用更改，点击OPEN。这时会提示需要输入账号和密码，树莓派的默认账号是pi,默认密码是raspberry,注意密码输入的时候是没有*号来告诉你输了几位的。ssh连接成功后如图所示

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial2.jpg)

######3. Q:如何让你的电脑远程连接上树莓派桌面？

 A:树莓派的官方系统raspbian自带了x window，因此是可以使用它的类WIN风格的GUI界面的。但是ssh是不支持GUI图形界面的，因此我们这次要用到是vnc。首先按照问题2的操作，连接上树莓派。然后输入以下命令

    sudo apt-get install tightvncserver

之后树莓派就会自动从网上下载vnc的服务器端，安装过程中会提示是否安装，按小写的y后回车，继续安装。安装完成后会让你设置一个VNC登陆的密码，输入密码后还会问你是否输入个只能观看不能操作的密码，一般选择n，也就是不设置。

    vncserver -geometry 1024x768

后面那个参数就是你想显示的分辨率。命令成功执行后，ssh里会显示

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial3.jpg)

这里说明一点，每执行一次上面的命令，就打开了一个VNC的端口。VNC默认的端口是5901，也就是说，上面命令执行完成后的编号表示你当前可以连接的端口号。这时候VNC的服务端已经安装完成了，你需要一个客户端来连接这个服务端。这里可以使用tightvnc view或者RealVNC,这两个软件可以自行谷歌搜下。启动VNC view，这里以tightvnc举例

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial4.jpg)

IP是你的树莓派的IP，端口号就是上面ssh中New 'X' desktop is raspberrypi:1加上5900，因此现在可以连接的端口号是5901。当然你可以再次执行vncserver -geometry 1024x768，那么New 'X' desktop is raspberrypi:2，可以连接的端口号就是5901和5902，以此类推。点击连接按钮，需要输入前面设置过的VNC登陆密码，登陆成功后的效果

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial5.jpg)

这里有几个问题我需要说明下。有时候VNC连上去，不出来桌面，而是灰色的面板，整个时候滑动几下鼠标的滚轮，可能会解决问题，这个是无意中发现的，不保证一定有效。还有一个情况是，我使用tightvnc view和Realvnc view连上去，点鼠标右键出来的菜单不一样，到现在还不知道是什么原因，而且两个view都无法用界面上的按钮输入ctrl+alt+del来调出任务管理器。

###### 4. Q:如何让树莓派显示中文？

A:树莓派默认是采用英文字库的，而且系统里没有预装中文字库，所以即使你在locale中改成中文，也不会显示中文，只会显示一堆方块。因此需要我们手动来安装中文字体。好在有一个中文字体是免费开源使用的。ssh中输入以下命令

    sudo apt-get install ttf-wqy-zenhei

安装过程中如果碰到(Y/n)，都选择y
中文字库安装完成之后，还需要安装一个中文输入法。输入如下命令

    sudo apt-get install scim-pinyin

一样的安装过程，安装完毕后输入

    sudo raspi-config

然后选择change_locale，在Default locale for the system environment:中选择zh_CN.UTF-8,配置完成之后，输入命令

    sudo reboot

重启完成好就可以在VNC连接上去后使用中文显示和中文输入法了，切换中文输入法一样也是ctrl+space

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial6.jpg)

###### Q:如何在树莓派上安装谷歌的开源浏览器Chromium?

 A:连接ssh,输入如下命令

    sudo apt-get install chromium-browser  chromium-l10n

提示是否安装，输入y,等待安装完成
完成之后，进入桌面 选择菜单-〉互联网-〉Chromium网页浏览器，就可以打开熟悉的chrome浏览器了

![](http://blog.sxxybbs.com/assets/img/raspberry-pi-basic-Tutorial7.jpg)

还有一种方式，是在系统发行版软件库里没有chrome的时候来安装chrome浏览器的打开ssh，输入如下命令

    wget http://goo.gl/go5yx -O install.sh

成功后，打入：

    chmod a+x install.sh

然后，输入（注意一定要加上前面的”点斜杆”）：

    ./install.sh

就开始下载和安装一些必要的包，还有下载整个Chrome并安装，整个过程速度飞快。这个方式参考了这个链接里的教程http://www.leiphone.com/raspberry-pi-hands-on.html不过这种安装方式在菜单里就没有选项可以让你点了，VNC连接后，在中端里输入

    chrome -disable-ipv6 &

就可以启动浏览器了。

###### 6. Q:官方Raspbian默认的自动更新的源连接速度太慢，更新常常失败，如何解决？
 A:这里需要修改源的文件sources.list。输入如下命令：

    sudo cp /etc/apt/sources.list /etc/apt/sources.list_bk

备份原来的文件

    sudo nano /etc/apt/sources.list

编辑sources文件，将里面的内容替换成

    deb http://mirror.nus.edu.sg/raspbian/raspbian/ wheezy main contrib non-free rpi
    deb-src http://mirror.nus.edu.sg/raspbian/raspbian/ wheezy main contrib non-free rpi

按ctrl+o保存，按ctrl+x退出，接着输入

    sudo reboot

重启系统，完成之后ssh连入，输入

    sudo apt-get update

这下速度绝对比之前要快很多了，而且不会出现找不到很多源的情况了

###### 7. Q:如何使用无线网卡，让树莓派摆脱网线束缚?
 A:首先你要确定你的无线网卡驱动是Raspbian的驱动库里包含了的，可以上这个地址查看自己的无线网卡芯片是否是支持列表里面的（http://elinux.org/RaspberryPiBoardVerifiedPeripherals#USB WiFi Adapters）。如果你的无线网卡可以支持，那么进入正题，配置无线上网。

 1，首先插上你USB无线网卡，插好SD卡，上电启动系统，通过外接屏幕和键盘或者SSH连接进入命令行。要注意的是，树莓派的USB供电有问题，启动系统以后如果直接插入USB设备会导致系统重启，避免这个问题的办法是用外接有源的USB HUD。进入命令行界面，输入如下命令

    sudo lsusb

可以看到命令执行完成后，会显示所有挂载的USB设备，最后一行一般就是你的无线网卡，我自己测试的结果显示的是这样

    pi@raspberrypi ~ $ sudo lsusb
    Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    Bus 001 Device 002: ID 0424:9512 Standard Microsystems Corp. 
    Bus 001 Device 003: ID 0424:ec00 Standard Microsystems Corp. 
    Bus 001 Device 004: ID 0cf3:1006 Atheros Communications, Inc. TP-Link TL-WN322G v3 / TL-WN422G v2 802.11g [Atheros AR9271]

最后一行就是我的无线网卡设备号，显然我的无线网卡已经被系统识别出来了。如果还不能确认的话，输入如下命令

    sudo lsmod

返回的结果如下

    pi@raspberrypi ~ $ lsmod
    Module                  Size              Used by
    snd_bcm2835      12808          0 
    snd_pcm               74834         1 snd_bcm2835
    snd_seq                 52536         0 
    snd_timer              19698         2 snd_seq,snd_pcm
    snd_seq_device     6300           1 snd_seq
    snd                    52489             5                 snd_seq_device,snd_timer,snd_seq,snd_pcm,snd_bcm2835
    snd_page_alloc      4951           1 snd_pcm
    arc4                       1187           2 
    ath9k_htc              54918         0 
    mac80211             236178       1 ath9k_htc
    ath9k_common     3181           1 ath9k_htc
    ath9k_hw              376754       2 ath9k_common,ath9k_htc
    ath                        16648         3 ath9k_hw,ath9k_common,ath9k_htc
    cfg80211              171957       3 ath,mac80211,ath9k_htc

可以看到有mac80211，显示无线网卡已经被正确识别.

  2,现在可以测试你周围的无线网络了。输入如下命令

    sudo iwlist wlan0 scan

如果搜索到了无线网络，会返回无线网络的MAC地址，SSID等相关信息。

 3,配置无线网络

输入如下命令

    vi /etc/network/interfaces

编辑里面的信息如下:

    auto lo

    iface lo inet loopback
    iface eth0 inet dhcp

    auto waln0
    allow-hotplug wlan0
    iface wlan0 inet static
    address 192.168.1.10 
    getway 192.168.1.1 
    wpa-ssid "WIFI的SSID"
    wpa-psk "密码"

    up route add default gw 192.168.1.1
    down route del default gw 192.168.1.1

    #iface wlan0 inet manual
    #wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
    #iface default inet dhcp

4,重启你的树莓派

    sudo reboot

记得拔掉网线，将电脑连入无线网络，这样树莓就可以无线上网了

现在你可以使用命令来查看无线网卡的状态了，输入如下命令

    ifconfig

会返回有线网络和无线网络的MAC地址和IP地址状态

###### 8.Q:我不想用VNC，想用WINDOWS的远程桌面连接树莓派，如何实现？

A:办法已经有了，需要在raspbian下面安装一个服务xdrp,输入如下命令

    sudo apt-get install xrdp

然后就可以用win的远程桌面连接了，你的电脑和树莓派在一个局域网的时候没有问题，如果是想外网访问，跟需要做好端口3389的映射，具体见另外一个帖 子http://www.eeboard.com/bbs/thread-5526-1-2.html

首先连接

![](http://www.eeboard.com/wp-content/uploads/2013/01/Raspberry-Pi-remote-2-500x284.png)

输入pi的用户密码，就是ssh连上去的用户名密码

![](http://www.eeboard.com/wp-content/uploads/2013/01/Raspberry-Pi-remote-4-500x284.png)

这样就连上去了，跟用VNC效果一样

![](http://www.eeboard.com/wp-content/uploads/2013/01/Raspberry-Pi-remote-5-500x396.png)