---
layout: post
category: linux
tags: linux
title1: Resolve Unable to install anything with apt
keywords: depends on plymouth and therefore on system facility `$all'
description: insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
---

### Problem

When I install anything with apt-get.I receive many messages stating:

>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system facility `$all' which can not be true!

And use `chkconfig apach2 off` I receive many messages stating:

>root@raspberrypi:~# chkconfig apache2 off
>insserv: warning: script 'S99gnhostlinuxd' missing LSB tags and overrides
>insserv: warning: script 'gnhostlinuxd' missing LSB tags and overrides
>insserv: There is a loop at service gnhostlinuxd if started
>insserv: There is a loop between service plymouth and mountnfs if started
>insserv:  loop involving service mountnfs at depth 8
>insserv:  loop involving service networking at depth 7
>insserv: There is a loop between service gnhostlinuxd and mountall if started
>insserv:  loop involving service mountall at depth 5
>insserv:  loop involving service checkroot-bootclean at depth 4
>insserv:  loop involving service urandom at depth 7
>insserv:  loop involving service checkfs at depth 5
>insserv:  loop involving service mountnfs-bootclean at depth 7
>insserv: There is a loop at service plymouth if started
>insserv:  loop involving service kbd at depth 7
>insserv: There is a loop between service gnhostlinuxd and mountall-bootclean if >started
>insserv:  loop involving service mountall-bootclean at depth 7
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: There is a loop between service gnhostlinuxd and checkroot if started
>insserv:  loop involving service checkroot at depth 4
>insserv:  loop involving service keyboard-setup at depth 3
>insserv: There is a loop between service gnhostlinuxd and mountkernfs if started
>insserv:  loop involving service mountkernfs at depth 1
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: Starting gnhostlinuxd depends on plymouth and therefore on system >facility `$all' which can not be true!
>insserv: exiting now without changing boot order!
>/sbin/insserv failed, exit code 1

### Resolve

	    find / -name gnhost*
	    vi /usr/bin/gnhostlinux
	    rm /etc/gnhostlinux.conf
	    rm /etc/init.d/gnhostlinuxd
	    rm /usr/bin/gnhostlinux
	    rm -rf /wwwroot/gnhostlinux1.3.2/gnhostlinux
	    rm -rf /wwwroot/gnhostlinux1.3.2/gnhostlinux.conf
	    rm -rf /wwwroot/gnhostlinux1.3.2/gnhostlinuxd
	    chkconfig apache2 off

find all related packages and remove packages


