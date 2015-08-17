---
layout: post
category: linux
tags: linux
title1: VMware Workstation三种网络连接模式说明（Bridged，NAT，Host-only networking）
keywords: Bridged,NAT,Host-only
description: VMware Workstation 提供 三种基本的网络连接 模式 ,bridged, network address translation (NAT), host-only   networking ，此外，还允许用户自定义的网络设置。下面就这三种基本的网络连接模式和一些常用的术语进行一些说明.
---

### 1.虚拟交换机（Virtual Switch ）

VMware Workstation 提供了虚拟交换机功能，像平常用的交换机一样，可以把一些网络设备连接起来。默认情况下， VMware Workstation 将某些虚拟交换机映射到特定的网络上

### 2.DHCP Server

DHCP ( dynamic host configuration protocol  ) 动态主机配置协议。用于对非桥接 (bridged) 方式连接外部网络的虚拟机提供 IP 地址配置，例如， host-only 和 NAT 的配置使用 DHCP server。

### 3.公用网络配置( Common Networking Configurations )

在“新建虚拟机”向导中，如果选择“典型”( Typical )选项，向导默认设置虚拟机的网络连接方式为 NAT ；如果选择“自定义” ( Custom )选项，向导会让你选择设置虚拟机的网络连接方式。

### 4.Bridged Networking

使用该连接模式，虚拟机将使用主机的网卡连接到网络。如果主机已经连接到了一个网络，这是使虚拟机连接到网络的最简单的方式。虚拟机的虚拟网卡连接到主机的物理网卡，这样连接到主机所在的LAN 。<br>


这时，虚拟机在网络上有唯一标识，同主机分离、独立。LAN 上所有电脑都可见该虚拟机，并且都可以同虚拟机直接通信。

### 5.Network Address Translation (NAT)

这种连接模式使虚拟机共享主机的IP 和 MAC 地址，虚拟机和主机共享使用同一个网络标识，且该标识在网络外不可见。<br>


当你的网络管理员要求你只能使用一个IP 或 MAC 地址时， NAT 将会非常有用。 NAT 使用主机的网络连接。<br>


使用 NAT时，虚拟机可以使用多种标准 TCP/IP 协议来连接外网中的其它机器，如 HTTP、 FTP 、 Telnet 。默认情况下，外网中的机器不能连接到虚拟机，所以此时不能使用虚拟机作为 Web Server 。<br>


如果你选择使用NAT ，你的虚拟机在外网中没有自己的 IP 地址，相反，主机中会建立起一个单独的私有网络。你的虚拟机将从该网络中的虚拟 DHCP 服务器获取一个 IP 地址， VMware 的 NAT 设备负责在该子网和外网中传递数据。

### 6.Host-Only Networking

该模式创建一个同时包含虚拟机和主机的子网，为虚拟机和主机之间提供了一个网络连接。当你需要建立一个独立的虚拟网络时，这种方法非常有用。此时，虚拟机 不能 连接到Internet 。