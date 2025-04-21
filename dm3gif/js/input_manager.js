
//input object
var oINPUT = new Object();

oINPUT.using_tilt = false;
oINPUT.still_frames = 0;
oINPUT.beta = 0;
oINPUT.lastbeta = 0;
oINPUT.alpha = 0;
oINPUT.lastalpha = 0;

oINPUT.touching = false;
oINPUT.mouse_speed = 0;
oINPUT.mouse_is_down = false;
oINPUT.mouse_start_x = 0;
oINPUT.mouse_start_y = 0;
oINPUT.mouse_x = 0;
oINPUT.mouse_y = 0;
oINPUT.frames_down = 0;
oINPUT.scrollwheel = 0;
oINPUT.right = false;
oINPUT.left = false;
oINPUT.up = false;
oINPUT.dn = false;
oINPUT.z = false;
oINPUT.x = false;
oINPUT.c = false;
oINPUT.v = false;
oINPUT.b = false;


oINPUT.keys_down = [];


function doScrollToTop(){
	window.scrollTo(0, 1);
}

function doSetupWindow(){


	window.onresize = function() {
	   doWindowResize();
	}
	
	window.onorientationchange = function() {
		doWindowResize();
	  // setTimeout(doWindowResize, 100);
	}



	document.addEventListener('focusout', function(e) {
		doWindowResize();
	   doScrollToTop();

	});


	
	wrapper.onmousedown = function(e){

		if(!oINPUT.mouse_is_down){
			oINPUT.frames_down = 0;
			oINPUT.mouse_is_down = true;
			oINPUT.click_pending = true;
			oINPUT.mouse_x = ((e.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
			oINPUT.mouse_y = ((e.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;
			oINPUT.mouse_start_x = oINPUT.mouse_x;
			oINPUT.mouse_start_y = oINPUT.mouse_y;
			oINPUT.client_mouse_x = (e.clientX - wrapper.offsetLeft) | 0;
			oINPUT.client_mouse_y = (e.clientY - wrapper.offsetTop) | 0;
			oINPUT.client_mouse_start_x = oINPUT.client_mouse_x;
			oINPUT.client_mouse_start_y = oINPUT.client_mouse_y;

			e.target.touch_pending = true;
		}
	}

	wrapper.onmousemove = function(e){

		oINPUT.client_mouse_x = (e.clientX - wrapper.offsetLeft) | 0;
		oINPUT.client_mouse_y = (e.clientY - wrapper.offsetTop) | 0;

		var new_mouse_x = ((e.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
		var new_mouse_y = ((e.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;

		oINPUT.mouse_speed = __utils.doGetDistance(new_mouse_x,new_mouse_y,oINPUT.mouse_x,oINPUT.mouse_y);

		oINPUT.mouse_x = new_mouse_x;
		oINPUT.mouse_y = new_mouse_y;

	}



	window.onmouseup = function(evt) {

		oINPUT.mouse_is_down = false;
		oINPUT.release_pending = true;
	  	oINPUT.frames_down = 0;
	}

	document.onblur = function(evt) {
		oINPUT.mouse_is_down = false;
		oINPUT.release_pending = true;
	  	oINPUT.frames_down = 0;
	}
	

	if (window.navigator.msPointerEnabled) {
		 window.addEventListener("MSPointerDown", doTouchStart, false);
		 window.addEventListener("MSPointerUp", doTouchEnd, false);
	}
	window.addEventListener('touchstart', doTouchStart, false);
	window.addEventListener('touchend', doTouchEnd, false);
	window.addEventListener('touchmove', doTouchMove, false); 



	//handle hidden window muting
	var visProp = doGetHiddenProp();
	if (visProp) {
		var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
		document.addEventListener(evtname,  function(evt) {
			if(document[visProp]){
				__snds.forceMute();
			}else{
				__snds.unforceMute();
			}
		});
	}
	
}





function doGetHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document) 
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}



//-------------------------
// touch capture
//-------------------------

function doTouchStart(event)
{

	var touches = event.touches;
	if(event.touches){
		touches = event.touches;
	}else if (event.targetTouches){
		touches = event.targetTouches;
	}else if(event.pageX){
		touches = [event];
	}
	
	var touch = touches[0];

	oINPUT.touching = true;
	if(!oINPUT.mouse_is_down){
		oINPUT.frames_down = 0;
		oINPUT.mouse_is_down = true;
		oINPUT.click_pending = true;
		oINPUT.mouse_x = ((touch.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
		oINPUT.mouse_y = ((touch.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;
		oINPUT.mouse_start_x = oINPUT.mouse_x;
		oINPUT.mouse_start_y = oINPUT.mouse_y;
		oINPUT.client_mouse_x = ((touch.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
		oINPUT.client_mouse_y = ((touch.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;
		oINPUT.client_mouse_start_x = oINPUT.client_mouse_x;
		oINPUT.client_mouse_start_y = oINPUT.client_mouse_y;
	}


	event.target.touch_pending = true;

	if(is_mobile && event.target.prevent_default){
		event.preventDefault();
	}
}

function doTouchEnd(event)
{
	switch (event.type) {
		case "touchend": 
			oINPUT.mouse_is_down = false;
			oINPUT.release_pending = true;
			oINPUT.frames_down = 0;
			oINPUT.touching = false;
			break;

		case "MSPointerUp":
			var touches;
			if (event.targetTouches){
				touches = event.targetTouches;
			}else if(event.pageX){
				touches = [event];
			}
			oINPUT.mouse_is_down = false;
			oINPUT.release_pending = true;
			oINPUT.frames_down = 0;
			oINPUT.touching = false;
			break;
	}


}

function doTouchMove(event)
{
	

	var touches = event.touches;
	if(event.touches){
		touches = event.touches;
	}else if (event.targetTouches){
		touches = event.targetTouches;
	}else if(event.pageX){
		touches = [event];
	}
	
	var touch = touches[0];


	var new_mouse_x = ((touch.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
	var new_mouse_y = ((touch.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;

	oINPUT.mouse_speed = __utils.doGetDistance(new_mouse_x,new_mouse_y,oINPUT.mouse_x,oINPUT.mouse_y);

	oINPUT.mouse_x = new_mouse_x;
	oINPUT.mouse_y = new_mouse_y;


	oINPUT.client_mouse_x = ((touch.clientX - wrapper.offsetLeft) * oSTAGE.scale_inv) | 0;
	oINPUT.client_mouse_y = ((touch.clientY - wrapper.offsetTop) * oSTAGE.scale_inv) | 0;

	

	if(is_mobile && event.target.prevent_default){
		event.preventDefault();
	}


}









