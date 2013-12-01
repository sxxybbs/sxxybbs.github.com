---
layout: post
title1: mysql存储过程，存储函数，触发器，游标的使用
category: mysql
tags: mysql
keywords: mysql存储过程，存储函数，触发器，游标的使用
description: mysql存储过程，存储函数，触发器，游标的使用
---

### 存储过程 

	1.输入一个整数求该整数的阶乘
	
	delimiter // --更改mysql的终止符
	
	create procedure sp_1(in num int,out result int)
	begin
	set result=1;
	while num>1 do
	set result=result*num;
	set num=num-1;
	end while;
	end //  --创建存储过程

	delimiter ;

	call sp_1(5,@result);--调用存储过程sp_1

	select @result;	--获得结果
	
	show procedure status \G --查看创建的存储过程
	show create procedure sp_1 \G

### 存储函数
	
	2.输入一个整数求该整数的阶乘
	delimiter //

	create function fn_1(num int)
	returns int
	begin
	declare result int default 1;
	while num>1 do
	set result=result*num;
	set num=num-1;
	end while;
	return result;
	end //
	
	delimiter ;

	select fn_1(5);--获得结果

	show function status \G
	show create function fn_1 \G

### 触发器

	3.创建一个触发器，在删除tab_1中的记录后，在tab_1_history中添加被删除的数据，触发器是以行为单位执行的
	delimiter //
	
	create trigger trg_1 after delete
	on tab_1 for each row
	begin
	insert into tab_1_history(X1,X2,X3)
	values(OLD.X1,OLD.X2,OLD.X3);
	end
	
	delimiter ;

	show triggers;--查看创建的触发器

### 游标

	delimiter //

	create procedure sp_2(in na varchar(20),out s text)
	begin
	declare tmp varchar(20);
	declare flag bit default 0;
	declare cur cursor for select distinct qun from tab_0 where name=na;
	declare continue handler for not found set flag=1;
	open cur;
	while flag!=1 do
	fetch cur into tmp;
	if flag!=1 then
	set s=concat_ws(',',s,tmp);
	end if;
	end while;
	close cur;
	end // --创建一个拥有游标的存储过程
	
	delimiter ;

	call sp_2('1',@s);--调用存储过程

	select @s;--获得结果