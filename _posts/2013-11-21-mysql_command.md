---
layout: post
category: mysql
tags: mysql
title1: 一些简单的mysql命令
keywords: mysql命令
description: 记录一些很基本的mysql命令。
---


>mysqladmin -uroot -p drop test;
>mysqladmin -uroot -p create test;
>mysqladmin -uroot -p test<test.sql;

>mysqladmin -uroot password '123';
>show databases;
>use test;
>select database();
>show tables;

>grant all privileges on test.* to test@localhost identified by '123';
>create table t(id int primary key auto_increment,name varchar(20),sex char(1) default '0') charset=utf8;
>desc t;

>alter table t auto_increment=0;
>mysql -uroot -p --default-character-set=utf8;
>delete from table where id=1;
>truncate table test;

>select user from table where name like '李%';
>select sex,COUNT(*) from user group by sex;

>select price case when price <=3000 then 'A' when price <1000 then 'C' else 'B' end from price;
>select 列名1...列名n from 表1 inner join 表2 on 表1.外键=表2.主键 [where|order by等]
>select 列名1...列名n from 表1 left outer join 表2 on 表1.外键=表2.主键 [where|order by等]
>select * from product where price>(select AVG(price) from product);


>alter table ... modify 
>alter table ... add 
>alter table ... change
>alter table ... drop

>alter table visitor modify name varchar(30);
>alter table visitor add name varchar(30);
>alter table visitor add name varchar(30) first;
>alter table visitor add name varchar(30) after old;
>alter table visitor modify name vsrchar(30) after old;
>alter table visitor change namr name varchar(30);
>alter table visitor drop name;


>create table 新表名 select * from 旧表名;
>create table 新表名 like 旧表名;
>insert into 表1 select * from 表2;
>insert into tab1(id) select id from tab2 where id>200;
>drop table if exists tab1; 

