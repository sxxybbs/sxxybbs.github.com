---
layout: post
title1: linux练习笔记
category: linux
tags: linux
keywords: linux练习笔记
description: 温故而知新，可以为师矣。刚开始学习linux的时候记录的学习笔记，拿出来记录下，以免以后忘记啦。
---
<p>要想学习linux还是记得去买一本linux书吧。这篇文章主要记录了最初踏入linux学习的初级笔记，记录下来以后好重复的复习，温故而知新，可以为师矣。</p>
Linux练习笔记<br/>
<h3>第一章：初步进入linux的字符界面</h3><br/>
1.runlevel<br/>
2.init 2<br/>
3.shutdown <br/>
4.reboot<br/>
5.halt<br/>
6.shutdown –h now   shutdown –h 45<br/>
7.reboot –r now ‘system will reboot now’<br/>
8.man ls|more <br/>
9.init –help<br/>
10.whereis ls<br/>
11.whoami<br/>
12.which ls<br/>
13.ls –al | grep ‘.bash*’<br/>
14.ls –al;du –hs<br/>
15.ls –al /kongning&&du –hs<br/>
16.cat $(locate httpd.conf)<br/>
17.cat `locate httpd.conf`<br/>
18.alias OK=’ls -al’;OK<br/>
19.unalias OK<br/>
20.ls /etc|more<br/>
21.rpm –qa|grep a|more<br/>
22.echo ‘hello world’>a<br/>
23.cat <a<br/>
24.ls /kongning 2>a<br/>
25.echo ‘上面是一个错误重定向,这是一个追加’ >>a<br/>
26.echo ‘同时实现输出重定向和错误重定向’&>a<br/>
27.ls .bash*<br/>
28.echo $PS1;echo $PATH<br/>
29.set<br/>
30.set nu vi编辑器<br/>
31.set ic; / ! <br/>

<h3>第二章：linux常用的命令</h3><br/>
1.pwd<br/>
2.cd ~a<br/>
3.ls –al /<br/>
4.touch file1 file2<br/>
5.mkdir dir<br/>
6.rmdir dir<br/>
7.cp –R /etc/skel /home/a<br/>
8.mv file1 file2<br/>
9.rm –rf /test<br/>
10.wc file1<br/>
11.cat –n /etc/passwd<br/>
12.cat –n /etc/shadow|more<br/>
13.cat –n /etc/group|less<br/>
14.head -10 /etc/gshadow<br/>
15.tail -10 /proc/cpuinfo<br/>
16.sort file1<br/>
17.uniq file1<br/>
18.cut –f 1,5 –d : /etc/passwd<br/>
19.comm file1 file2<br/>
20.diff file1 file2<br/>
21.rpm –qa | grep httpd<br/>
22.find /boot –name grub.conf<br/>
23.locate –n10 a<br/>
24.whereis mv<br/>
25.file *<br/>
26.whatis rmdir<br/>
27.which cp<br/>
28.uname –a<br/>
29.hostname kongning<br/>
30.dmesg<br/>
31.cal 2012<br/>
32.cal –jy<br/>
33.date +”%Y-%m-%d  %H:%M:%S”<br/>
34.echo ‘hello world’>>a<br/>
35.mesg<br/>
36.wall ‘欢迎来到我的linux学习之旅’<br/>
37.write user tty1<br/>
38.talk <br/>
39.clear<br/>
40.sync<br/>
41.uptime –V<br/>
42.last –n 10<br/>

 <h3>第三章：文件和目录管理</h3><br/>
1.ls –l /dev | grep sd<br/>
2.cat /proc/filesystems<br/>
3.cat /proc/version<br/>
4.cat /proc/partitions<br/>
5.ln –s file1 file2<br/>
<p>眼睛看累了，休息下吧。<br/><img src='/assets/img/beauty/juhela.jpg'/></p>

 <h3>第四章：用户和群组账户管理</h3><br/>
1.useradd tong<br/>
2.cat /etc/passwd | grep tong<br/>
3.usermod –l tong1 tong<br/>
4.man usermod<br/>
5.cat /etc/group<br/>
6.cat /etc/login.defs|grep UID<br/>
7.groupadd tong<br/>
8.groupmod –n tong1 tong2<br/>
9.ls –al /etc/skel<br/>
10.cat /etc/default/useradd<br/>
11.创建用户和群组特殊方法<br/>
12.修改/etc/passwd 添加一条记录 tong:x:600:600::/home/tong:/bin/bash<br/>
13.执行pwconv使/etc/shadow同步<br/>
14.修改/etc/group 添加一条记录 tong:x:600:<br/>
15.执行grpconv使/etc/gshadow同步<br/>
16.创建主目录mkdir /home/tong<br/>
17.复制配置文件 cp –R /etc/skel /home/tong<br/>
18.给用户创建密码 passwd tong<br/>
19.更改主目录的属性 chown –R tong.tong /home/tong<br/>
20.测试是否成功 su tong<br/>
21.chsh –list<br/>
22.大批量添加用户<br/>
23.newusers file1.txt  file1.txt为/etc/passwd中的格式文件<br/>
24.chpasswd file2.txt  file2.txt为/etc/group 中的格式文件<br/>
25.使用pwconv同步<br/>
26.passwd –l tong<br/>
27.passwd –u tong<br/>
28.gpasswd –a tong Tong<br/>
29.gpasswd –d tong Tong<br/>
30.gpasswd Tong<br/>
31.gpasswd –r Tong<br/>
32.chfn<br/>
33.su root<br/>
34.pwck<br/>
35.newgrp Tong<br/>
36.finger<br/>
37.id<br/>
38.groups<br/>
39.who<br/>
40.chage<br/>

<h3>第五章：软件包管理</h3><br/>
1.yum -y install httpd php mysql mysql-server php-mysql httpd-manual mod_ssl mod_perl mod_auth_mysql php-gd php-xml php-mbstring php-ldap php-pear php-xmlrpc php-devel mysql-connector-odbc mysql-devel libdbi-dbd-mysql<br/>
2.rpm –ivh [--replacepkgs] packagename<br/>
3.rpm –e [--nodeps] packagename<br/>
4.rpm –Uvh [--oldpackage] packagename<br/>
5.rpm –Fvh packagename<br/>
6.rpm –qa|grep httpd<br/>
7.rpm –qi packagename<br/>
8.rpm –ql packagename<br/>
9.rpm –qR packagename<br/>
10.rpm –qF packagename<br/>
11.rpm –V packagename<br/>
12.tar zcvf test.tar.gz /test<br/>
13.tar zxvf test.tar.gz<br/>
14.tar tvf test.tar<br/>
15.tar cf /dev/fd0 /home<br/>
16.tar xf /dev/fd0<br/>
17.tar jcvf test.tar.bz2 /test<br/>
18.gzip /test<br/>
19.gzip –l /test<br/>
20.gzip –dv test.gz<br/>
21.zip test.zip /test<br/>
22.unzip test.zip<br/>
23.unzip –n test.zip –d /home<br/>
24.unzip –v test.zip<br/>

 <h3>第六章：磁盘管理</h3><br/>
1.ls –l /dev|grep sd<br/>
2.fdisk /dev/sd3根据交互式进行相关操作<br/>
3.lvm逻辑卷管理器<br/>
4.RAID<br/>

 <h3>第七章：文件系统</h3><br/>
1.使用fdisk进行分区，mkfs在分区上创建文件系统，使用mount进行挂载文件系统，umount卸载文件系统<br/>
2.fdisk –l /dev/sd<br/>
3.mkfs –t ext3 /dev/sd<br/>
4.mkfs.ext4 /dev/sd<br/>
5.mkdir /mnt/kk<br/>
6.mount /dev/sd /mnt/kk<br/>
7.df<br/>
8.mount –o ro /dev/sd /mnt/kk<br/>
9.mount –t iso9660 /dev/cdrom /media/cdrom<br/>
10mount /dev/fd0 /media/floppy<br/>
11.使用fdisk –l 查看外置U盘的设备号，假如为/dev/scd1<br/>
12.mount –t msdos /dev/scd1 /medis/usb 为FAT16的U盘<br/>
13.mount –t vfat /dev/scd1 /media/usb 为FAT32<br/>
14.mount /dev/scd1 /media/usb –o codepage=936,iocharset=gb2312<br/>
15.挂载移动硬盘fdisk –l 查看设备号,假如为/dev/sdb1<br/>
16.mount –t vfat /dev/sdb1 /media/db<br/>
17.cat /etc/fstab<br/>
18.umount /media/db<br/>
19.umount /dev/sdb1<br/>
20.mount –s<br/>
21.cat /etc/mtab<br/>
22.fsck扫描文件系统时一定要在单用户模式，修复模式，或者把设备卸载后进行<br/>
23.fsck.ext3 /dev/sda1<br/>
24.fsck.ext3 –c /dev/sda1<br/>
25.fdisk 创建一个分区/dev/sdb1用来做为交换空间<br/>
26.mkswap /dev/sdb1<br/>
27.free<br/>
28.swapon /dev/sdb1<br/>
29.cat /proc/swaps<br/>
30./dev/sdb1 swap swap defaults 0 0 在系统启动的时候启动交换空间/etc/fstab<br/>
31.swapoff /dev/sdb1<br/>
32.cat /etc/fstab<br/>

  <h3>第八章：磁盘配额和权限设置</h3><br/>
1.修改/etc/fstab,启动文件系统的配额功能<br/>
2.重新挂载文件系统<br/>
3.创建配额文件<br/>
4.分配配额<br/>
5.LABEL=/home /home ext4 defaults,usrquota,grpquota 1 2<br/>
6.quotacheck –cug /home  在/home中创建配额文件aquota.group aquota.user<br/>
7.edquota user给用户配额<br/>
8.edquota –g groupname<br/>
9.repquota –a<br/>
10.quotacheck –avug<br/>
11.quotaoff –avug<br/>
12.quotaon –qvug<br/>
13.quotaoff –vug /home<br/>
14.chmod –R 777 /home<br/>
15.chown -R user /test<br/>
16.chgrp groupname /test<br/>
17.chown user.user /test<br/>
18.umask 700<br/>

 <h3>第九章：linux系统启动</h3><br/>
1.BIOS自检<br/>
2.启动GRUB引导加载程序<br/>
3.加载内核<br/>
4.执行init进行<br/>
5.通过/etc/inittab进行初始化<br/>
6.执行/bin/login<br/>
7.cat /etc/inittab<br/>
8.id<br/>
9.runlevel<br/>
10.cat /boot/grub/grub.conf<br/>

<h3>第十章：进程和服务管理</h3><br/>
1.ps<br/>
2.top<br/>
3.kill<br/>
4.ntsysv<br/>
5.checkconfig --list<br/>
6.service httpd restart<br/>
7.checkconfig –level 345 httpd on<br/>
8.checkconfig –add <br/>

 <h3>第十一章：作业控制和任务计划</h3><br/>
1.手工启动，后台启动，调度启动<br/>
2.进程的挂起和恢复<br/>
3.vi /etc/passwd --ctrl+z进程挂起<br/>
4.bg 和fg恢复进程<br/>
5.jobs查看挂起中的进程<br/>
6.任务计划cron，at，batch<br/>
7.rpm –qa |grep vixie-cron<br/>
8.service crond start<br/>
9.cat /etc/crontab<br/>
10.格式minute hour day mouth dayofweek command<br/>
11.45 4 1,10,20 * * /test/test.sh每个月的1，10，20号的4：45执行/test/test.sh为绝对路径<br/>
12.root用户以外的可以使用crontab命令来配置cron，所有用户定义的crontab都保存在/var/spool/cron/<username>中没分钟都会被检查并使用创建他们的用户身份来执行<br/>
13.crontab [-u 用户名] –e –l –r<br/>
14.可以使用/etc/cron.allow 和/etc/cron.deny文件来限制对cron用户的使用<br/>
15.crontab –e <br/>
16.crontab –l >/home/test/cron<br/>
17.crontab –r <br/>
18.crontab /home/test/cron<br/>
19.rpm –qa |grep at<br/>
20.service atd status<br/>
21.at [-f script] [-m –l -r][time][date]<br/>
22.输入at+时间参数就会出现”at>”提示符<br/>
23.at now+5 days<br/>
24.at>cp /home/test /test<br/>
25.ctrl+D<br/>
26.ls /var/spool/at<br/>
27.atq<br/>
28.atrm<br/>
29.at –r 作业号<br/>
30.batch的使用，在系统平均载量降到0.8一下时执行某项一次性任务<br/>
31.输入batch‘at>’符就会出现<br/>
32.atq列出所以的作业<br/>
33.at>cp /etc/passwd /test<br/>
34.ctrl+D<br/>