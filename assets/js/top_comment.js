//top+comment
lastScrollY=0;
function heartBeat(){
	var diffY;
	if (document.documentElement && document.documentElement.scrollTop)
	{
		diffY = document.documentElement.scrollTop;
	}else if (document.body){
		diffY = document.body.scrollTop;
	}else{
		/*Netscape stuff*/
	}
	percent=.1*(diffY-lastScrollY);
	if(percent>0){
		percent=Math.ceil(percent);
  	}else{
		percent=Math.floor(percent);
	}
	document.getElementById("full").style.top=parseInt(document.getElementById("full").style.top)+percent+"px";
	lastScrollY=lastScrollY+percent;
	if(diffY > 200){
		document.getElementById("full").style.display = "block";
	}else{
		document.getElementById("full").style.display = "none";
	}
}


suspendcode="<div id=\"full\" style='display:none; width:15px; height:57px; POSITION:absolute; left:50%; top:460px; margin-left:415px;  z-index:500; text-align:center;'><a href='#'><img src='/assets/img/btn_top.gif' /></a><br><br><a href='#comments'><img src='/assets/img/btn_comment.gif' /></a></div>";
document.write(suspendcode);
window.setInterval("heartBeat()",1);
