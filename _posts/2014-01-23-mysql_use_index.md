---
layout: post
title1: mysql中索引的使用
category: mysql
tags: mysql
keywords: mysql中索引的使用
description: 当我们在大量的数据中检索数据的时候，经常会感觉到慢，尤其是当一张表中的数据达到100万，1000万级的时候，而当这些表和其他的表连接后产生的数据数量更是大大超过原来的表，这个时候我们为了提高数据库的检索性能就必须用到索引，给表添加适当的索引能极大的提高数据库的性能。
---

### 索引

<p>格式：CREATE [UNIQUE] INDEX 索引名 ON 表名（列名,...）</p>

<p>查看：SHOW INDEX FROM 表名 查看表中建立的索引</p>

<p>删除：DORP INDEX 索引名 ON 表名</p>

<p>分析索引：EXPLAIN SELECT name FROM user WHERE name='XXOO' \G,使用‘\G’使显示的信息有条理，便于分析。能查出在检索的过程中使用的索引名和检索的次数，如果检索的次数和表的行数相等，显然检索效率不高，用EXPLAIN命令可以帮助我们分析我们创建的索引合理不，如果不合理我们需要选择合适的列创建索引。</p>

<p>mysql中可以将域的一部分定义为索引，这个时候可以用[列名(字节数)]这样的形式制定域前几字节来作为索引</p>

<p>一般情况下在一个表中创建一个索引后，使用SHOW INDEX FROM 表名能查看到有两个索引，这是因为我们在创建表的时候伴随着主键的定义而创建的特别索引，叫做<span style='color:#00F'>丛生索引</span>。</p>

<p>丛生索引和一般创建的索引的区别：</p>

1.不需要为保存索引而使用专用的硬盘空间，节约了资源。</br>

2.不需要检索索引后再访问实际的表，提高的检索效率，因为一般创建的索引在叶子节点中保存的是指向实际表的指针，而丛生索引在叶子节点中保存的是实际的数据。</br>

3.另一方面，创建丛生索引时需要对表中的数据进行排序，在进行数据插入，更新，删除时比一般索引需要耗时更多的时间。

### 创建索引举例

	CREATE INDEX index_name ON user_tab(name);
	
	CREATE INDEX index_a ON user_tab(name,shenfenzheng);
	
	CREATE UNIQUE INDEX index_b user_tab(shenfenzheng);

特别注意：在创建唯一索引时，如果列中有相同的数据将会报错，也可以创建唯一的复合索引，比如：

	CREATE UNIQUE INDEX index_c user_tab(name);//当姓名存在相同的时候将会创建失败
	
	CREATE UNIQUE INDEX index_c user_tab(name,shenfenzheng)；//因为姓名和身份证不能同时相同，所以这个会创建成功

### 编写有效率的SQL语句

<p>当我们给表添加了合适的索引后，如果SQL语句编写不当，就会出现无法使用索引的情况，下面总结几个SQL编写不当无法使用索引的例子，通过这几个例子希望我们能够写出更有效率的SELECT检索语句。</p>


1.进行后方一致/部分一致的检索条件(创建列name的索引)

>SELECT name FORM user WHERE name LIKE '%滴%'；error，not use index

>SELECT name FORM user WHERE name LIKE '%滴'；error，not use index

>SELECT name FORM user WHERE name LIKE '滴%'；yes 前方需要一致

>SELECT name FORM user WHERE name = '滴答'；yes 完全一致


2.使用了 IS NOT NULL ,<>比较运算符的场合

>SELECT name FROM user WHERE name IS NOT NULL; error

>SELECT name FORM user WHERE name <> '滴答'；error

在使用<>的时候我们可以试着尝试这样的sql看能否达到目的：

>SELECT name FORM user WHERE name='小A' or name='小B'；正确，name<>'滴答'满足要求


3.对列进行了运算/函数的场合

>SELECT name FROM user WHERE YEAR(birth)='2000';error

>SELECT name FROM user WHERE birth>='2000-01-01' AND birth<='2000-12-31';正确满足了使用索引的前提

4.复合索引的第一列没有包含在where条件的语句中

>CREATE INDEX index_a ON user_tab(shenfenzheng,name);

>SELECT name FROM user_tab WHERE shenfenzheng='5112541256987458477' AND name='滴答'；正确，复合索引

>SELECT name FROM user_tab WHERE shenfenzheng='5112541256987458477'；正确，第一列包含

>SELECT name FROM user_tab WHERE name='滴答'；出错

>SELECT name FROM user_tab WHERE shenfenzheng='5112541256987458477' OR name='滴答'；出错






