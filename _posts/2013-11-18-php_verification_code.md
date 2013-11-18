---
layout: post
category: php
tags: php
title1: php验证码
keywords: php验证码
description:
---
	<?php
	$safe_wheight = 24;
	$safe_codetype = 2;
	$safe_wwidth = 65;
	$cfg_domain_cookie = "/";
	$config = array(
	    'font_size'   => 14,
	    'img_height'  => $safe_wheight,
	    'word_type'  => (int)$safe_codetype,   // 1:数字  2:英文   3:单词
	    'img_width'   => $safe_wwidth,
	    'use_boder'   => TRUE,
	    'font_file'   => dirname(__FILE__).'/session/ggbi.ttf',
	    'wordlist_file'   => dirname(__FILE__).'/session/words.txt',
	    'filter_type' => 5);
	$sessSavePath = dirname(__FILE__)."/sessions/";
	
	
	// Session保存路径
	if(is_writeable($sessSavePath) && is_readable($sessSavePath)){ session_save_path($sessSavePath); }
	if(!empty($cfg_domain_cookie)) session_set_cookie_params(0,'/',$cfg_domain_cookie);
	
	if (!echo_validate_image($config))
	{
	    // 如果不成功则初始化一个默认验证码
	    @session_start();
	    $_SESSION['securimage_code_value'] = strtolower('abcd');
	    $im = @imagecreatefromjpeg(dirname(__FILE__).'/data/vdcode.jpg');
	    header("Pragma:no-cache\r\n");
	    header("Cache-Control:no-cache\r\n");
	    header("Expires:0\r\n");
	    imagejpeg($im);
	    imagedestroy($im);
	}
	
	function echo_validate_image( $config = array() )
	{
	    @session_start();
	    
	    //主要参数
	    $font_size   = isset($config['font_size']) ? $config['font_size'] : 14;
	    $img_height  = isset($config['img_height']) ? $config['img_height'] : 24;
	    $img_width   = isset($config['img_width']) ? $config['img_width'] : 68;
	    $font_file   = isset($config['font_file']) ? $config['font_file'] : dirname(__FILE__).'/session/ggbi.ttf';
	    $use_boder   = isset($config['use_boder']) ? $config['use_boder'] : TRUE;
	    $filter_type = isset($config['filter_type']) ? $config['filter_type'] : 0;
	    
	    //创建图片，并设置背景色
	    $im = @imagecreate($img_width, $img_height);
	    imagecolorallocate($im, 255,255,255);
	    
	    //文字随机颜色
	    $fontColor[]  = imagecolorallocate($im, 0x25, 0x25, 0x35);
	    $fontColor[]  = imagecolorallocate($im, 0x25, 0x26, 0x27);
	    $fontColor[]  = imagecolorallocate($im, 0x23, 0x34, 0x39);
	    $fontColor[]  = imagecolorallocate($im, 0x22, 0x31, 0x45);
	    $fontColor[]  = imagecolorallocate($im, 0x26, 0x31, 0x35);
	    
	    //获取随机字符
	    $rndstring  = '';
	    if ($config['word_type'] != 3)
	    {	
	        for($i=0; $i<4; $i++)
	        {
	            if ($config['word_type'] == 1)
	            {
	                $c = chr(mt_rand(48, 57));
	            } else if($config['word_type'] == 2)
	            { 
	                $c = chr(mt_rand(65, 90));
	                if( $c=='I' ) $c = 'P';
	                if( $c=='O' ) $c = 'N';
	            }
	            $rndstring .= $c;
	        }
	    } else { 
	        $fp = @fopen($config['wordlist_file'], 'rb');
	
	        if (!$fp) return FALSE;
	
	        $fsize = filesize($config['wordlist_file']);
	        if ($fsize < 32) return FALSE;
	
	        if ($fsize < 128) 
	        {
	          $max = $fsize;
	        } else {
	          $max = 128;
	        }
	
	        fseek($fp, rand(0, $fsize - $max), SEEK_SET);
	        $data = fread($fp, 128);
	        fclose($fp);
	        $data = preg_replace("/\r?\n/", "\n", $data);
	        $start = strpos($data, "\n", rand(0, 100)) + 1; 
	        $end   = strpos($data, "\n", $start); 
	        $rndstring  = strtolower(substr($data, $start, $end - $start)); 
	    }
	      $_SESSION['securimage_code_value'] = $rndstring;
	      $_SESSION['securimage_code_value'] = strtolower($rndstring);
	
	    $rndcodelen = strlen($rndstring);
	
	    //背景横线
	
	    $lineColor1 = imagecolorallocate($im, 0x25, 0x25, 0x35);
	    for($j=3; $j<=$img_height-3; $j=$j+3)
	    {
	        imageline($im, 2, $j, $img_width - 2, $j, $lineColor1);
	    }
	    
	    //背景竖线
	    $lineColor2 = imagecolorallocate($im, 0x44,0x56,0x23);
	    for($j=2;$j<100;$j=$j+6)
	    {
	        imageline($im, $j, 0, $j+8, $img_height, $lineColor2);
	    }
	
		//加入杂点
		for($i=0; $i < 60; $i++){
			$c_fontColor = $fontColor[mt_rand(0,4)];
			imagesetpixel($im, mt_rand(0,$img_width), mt_rand(0,$img_height), $c_fontColor);
		}
	    //画边框
	    if( $use_boder && $filter_type == 0 )
	    {
	        $bordercolor = imagecolorallocate($im, 0x9d, 0x9e, 0x96);
	        imagerectangle($im, 0, 0, $img_width-1, $img_height-1, $bordercolor);
	    }
	    
	    //输出文字
	    $lastc = '';
	    for($i=0;$i<$rndcodelen;$i++)
	    {
	        $bc = mt_rand(0, 1);
	        $rndstring[$i] = strtoupper($rndstring[$i]);
	        $c_fontColor = $fontColor[mt_rand(0,4)];
	        $y_pos = $i==0 ? 4 : $i*($font_size+2);
	        $c = mt_rand(0, 15);
	        @imagettftext($im, $font_size, $c, $y_pos, 19, $c_fontColor, $font_file, $rndstring[$i]);
	        $lastc = $rndstring[$i];
	    }
	    
	    //图象效果
	    switch($filter_type)
	    {
	        case 1:
	            imagefilter ( $im, IMG_FILTER_NEGATE);
	            break;
	        case 2:
	            imagefilter ( $im, IMG_FILTER_EMBOSS);
	            break;
	        case 3:
	            imagefilter ( $im, IMG_FILTER_EDGEDETECT);
	            break;
	        default:
	            break;
	    }
	
	    header("Pragma:no-cache\r\n");
	    header("Cache-Control:no-cache\r\n");
	    header("Expires:0\r\n");
	
	    //输出特定类型的图片格式，优先级为 gif -> jpg ->png
	    //dump(function_exists("imagejpeg"));
	    
	    if(function_exists("imagejpeg"))
	    {
	        header("content-type:image/jpeg\r\n");
	        imagejpeg($im);
	    }
	    else
	    {
	        header("content-type:image/png\r\n");
	        imagepng($im);
	    }
	    imagedestroy($im);
	    exit();
	}

来至dedecms的（/include/vdimgck.php）