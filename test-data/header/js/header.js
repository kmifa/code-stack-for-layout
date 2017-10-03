$(function(){

	var $sizeDetect = $(".l-sizedetect");    
	var hum = $(".menu-trigger");
	var nav = $(".navigations");
	var flag = true;

	function isPC(){
		return $(".l-sizedetect").css("fontFamily").indexOf("PC") != -1
	}

	function isTab(){
		return $(".l-sizedetect").css("fontFamily").indexOf("TAB") != -1
	}

	function isSp(){
		return $(".l-sizedetect").css("fontFamily").indexOf("SP") != -1	
	}

	hum.on('click',function(){
		var $this = $(this);
		if($this.hasClass('active')){
			$this.removeClass('active');
			nav.hide();
		}else{
			$this.addClass('active');
			nav.show();
		}
	});

	$(window).on('resize',function(){
		if(isPC()){
			if(flag === true){
				flag = false;
				nav.css("display","");
				hum.removeClass('active');
			}
		}else{
			if(flag === false){
				flag = true;
				nav.css("display","");
			}
		}
	});
	
});