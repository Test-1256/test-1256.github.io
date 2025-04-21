

//******************************************************************
//******************************************************************
//  utils
//******************************************************************
//******************************************************************

if (!String.prototype.splice) {
    String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
}


var __utils = {};




__utils.ordinal_suffix_of = function(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

__utils.doFader = function(){

	fader.style.display = "inline-block";
	fader.style.opacity = 1;

	var upd = new Object();
	upd.keep = true;
	upd.opacity = 1.5;
	upd.update_function = function(){
		this.opacity -= 0.1;
		fader.style.opacity = Math.max(0, Math.min(1, this.opacity));
		if(this.opacity <= 0.0){
			this.keep = false;
			fader.style.display = "none";
		}
	}

	updateQueue.push(upd);

}

//----------------------------------------
// environment helpers
//----------------------------------------

__utils.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (__utils.isMobile.Android() || __utils.isMobile.BlackBerry() || __utils.isMobile.iOS() || __utils.isMobile.Opera() || __utils.isMobile.Windows());
    }
};

__utils.isSupported = {
    canvas: !! window.CanvasRenderingContext2D,
    webgl: ( function () {
        try {
            var canvas = document.createElement( 'canvas' );
            return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    } )(),
    workers: !! window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    clamped_array: window.Uint8ClampedArray

};


__utils.doGetBrowser = function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) return 'Opera ' + tem[1];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}




__utils.getCSSPPI = function(){
  var div = document.createElement("div");
  div.style.width="1in";
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(div);
  var ppi = div.offsetWidth;
  body.removeChild(div);
  return parseFloat(ppi);
}

__utils.getPPI = function(){
  var div = document.createElement("div");
  div.style.width="1in";
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(div);
  var devicePixelRatio = window.devicePixelRatio || 1;
  var ppi = div.offsetWidth * devicePixelRatio;
  body.removeChild(div);
  return parseFloat(ppi);
}

__utils.getPixelRatio = function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
};


__utils.doGetLanguage = function(){
	var lang;
    if (navigator
            && navigator.userAgent
            && (lang = navigator.userAgent
                    .match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        lang = lang[1];
    }

    if (!lang && navigator) {
        if (navigator.language) {
            lang = navigator.language;
        } else if (navigator.browserLanguage) {
            lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
            lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
            lang = navigator.userLanguage;
        }
        lang = lang.substr(0, 2);
    }

	return lang;
}

__utils.getQueryString = function () {
	
	var query_string = {};
	var query = window.location.search.substring(1);
	
	if (query.length < 1){
		//try searching for the "%3F" instead
		//this fix is needed when calling the window.location from in mobile safari in a webview
		if (window.location.toString().split("%3F")[1] != null){
			query = window.location.toString().split("%3F")[1];
		}
	}
	
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
		// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	} 
	return query_string;
};


__utils.s4 = function() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

__utils.guid = function() {
  return __utils.s4() + __utils.s4() + '-' + __utils.s4() + '-' + __utils.s4() + '-' +
         __utils.s4() + '-' + __utils.s4() + __utils.s4() + __utils.s4();
}

__utils.getDayNumber = function(){
	var minutes=1000*60;
	var hours=minutes*60;
	var days=hours*24;
	var years=days*365;
	var base = new Date(2014,0,1);
	var now = new Date();
	var t = now.getTime() - base.getTime();
	var daynum = Math.ceil(t/days); 
	return(daynum);
}

__utils.doGoFullScreen = function(){
	var
          el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
    ;
    rfs.call(el);	
}


//--------------------------------------
// full screen
//--------------------------------------

__utils.doCheckFullScreen = function(){
	var isInFullScreen = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitIsFullScreen ? true : false;
	return isInFullScreen;
}

__utils.doFullScreenOn = function(){
	//enter full screen
	var elem = wrapper;
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		trace("-4");
	  elem.webkitRequestFullscreen();
	}
	oSTAGE.is_fullscreen = true;
}
__utils.doFullScreenOff = function(){
	//exit full screen
	if (document.exitFullscreen) {
	  document.exitFullscreen();
	} else if (document.cancelFullScreen) {
	  document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
	  document.msExitFullscreen();
	} else if (document.webkitExitFullscreen) {
	  document.webkitExitFullscreen();
	}
	oSTAGE.is_fullscreen = false;
}


//----------------------------------------
// movieclip helpers
//----------------------------------------

__utils.doFadeandDestroy = function(e){
	var me = e.currentTarget;
	me.alpha -= .1;
	if(me.alpha <= 0){
		me.parent.removeChild(me);	
	}
}


__utils.doCache = function(obj, stage_scale)
{
	var bounds = obj.getBounds();
	var nom_bounds = obj.nominalBounds;
	var new_bounds = {};

	if(!obj.force_bounds && bounds && nom_bounds){
		new_bounds.x = Math.min(nom_bounds.x, bounds.x);
		new_bounds.y = Math.min(nom_bounds.y, bounds.y);
		new_bounds.width = Math.max(nom_bounds.width, bounds.width);
		new_bounds.height = Math.max(nom_bounds.height, bounds.height);
	}else if(bounds){
		new_bounds = bounds;
	}else if(nom_bounds){
		new_bounds = nom_bounds;
	}else{
		return;	
	}

	if(!stage_scale){
		stage_scale = oSTAGE.scale;
	}

	obj.cache(new_bounds.x, new_bounds.y, new_bounds.width, new_bounds.height, stage_scale);

}


//----------------------------------------
// general helpers
//----------------------------------------


__utils.doRound = function(value, decimals){
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

__utils.doGetDistance = function(x1,y1,x2,y2)
{
	var x = x1 - x2;
    var y = y1 - y2;
    return Math.sqrt(x * x + y * y);
}

__utils.degFromRad = function( p_radInput )
{
	var degOutput = ( 180 / Math.PI ) * p_radInput;
	return degOutput;
}
			 
__utils.radFromDeg = function( p_degInput )
{
	var radOutput = ( Math.PI / 180 ) * p_degInput;
	return radOutput;
}

//Returns a random number between min (inclusive) and max (exclusive)
__utils.getRandomArbitrary = function(min, max)
{
    return Math.random() * (max - min) + min;
}

//Returns a random integer between min (inclusive) and max (inclusive)
__utils.getRandomInt = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

__utils.doRandomizeArray = function(theArray){
		var arrayLength = theArray.length;
		var oldArray = theArray.slice();
		var newArray = new Array();
		while (oldArray.length>0){
			var tId = Math.floor(Math.random() * oldArray.length);
			var tItem = oldArray[tId];
			oldArray.splice(tId, 1);
			newArray.push(tItem);
		}
		return newArray;
}

__utils.doClearTimeouts = function(){

	for (var i=0; i<timeouts.length; i++) {
	  clearTimeout(timeouts[i]);
	}
	timeouts = [];

}


//-----------------------------------------------
// threejs helpers
//-----------------------------------------------


__utils.getPointInBetweenByPerc = function(pointA, pointB, percentage) {

    var dir = pointB.clone().sub(pointA);
    var len = dir.length();
    dir = dir.normalize().multiplyScalar(len*percentage);
    return pointA.clone().add(dir);

}



__utils.doHTMLText = function(element, o, append)
{
	
	if( (typeof o === "object") && (o !== null) ){
		
	}else{
		var o = {txt: o};
	}
	
	var msg = o.txt;

	//loop through overrides
	for(var s in o) {
		if(s != "txt"){
			element.style[s] = o[s];
		}
	}

	//alert missing text
	if(!msg && msg!=0){
		msg = "MISSING TEXT";
		element.style.color = "#FF0000";
	}
	
	if(append){
		element.innerHTML += msg;
	}else{
		element.innerHTML = msg;
	}
	
	
}


__utils.doFormatNumber = function(myNumber, comma){
	comma = typeof comma !== 'undefined' ? comma : oLANG.comma;
	myNumber = Math.floor(myNumber);
	var myStr1 = String(myNumber);
	var myStr2 = "";
	var count = 0;
	for(var i=(myStr1.length-1); i>=0; i--){
		myStr2 = myStr1.charAt(i) + myStr2;
		count++;
		if(count==3){
			count=0;
			myStr2 = comma + myStr2;
		}
	}
	if(myStr2.charAt(0) == comma){
		myStr2 = myStr2.substring(1,myStr2.length);
	}
	myStr2 = "" + myStr2;
	return myStr2;
}


__utils.doFormatTime = function(ms){

	var s = Math.floor(ms * .001);
	var m = Math.floor(s/60);
	var h = Math.floor((ms-(s*1000))*.1);
				
	s = s-(m*60);
	
	return {m:m, s:s, h:h};

}


__utils.doCreateTextArea = function (elementId, parentDiv, x, y, width, height, style, scrollable, selectable, relative, text) {
	
	var area = document.createElement("div");
	area.setAttribute("id", elementId);
	
	if (parentDiv != null && parentDiv != "body"){
		document.getElementById(parentDiv).appendChild(area);
	} else {
		document.body.appendChild(area);
	}
	
	if (!selectable){
		style += ";-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;cursor:default;";
	}
	area.setAttribute("style", style);
	
	area.style.position = "absolute";
	area.style.zIndex = "99999";
	
	if (relative){
	
		var setLayout = function(){
			area.style.width = (width * window.innerWidth) + "px";
			area.style.height = (height * window.innerHeight) + "px";
			area.style.left = (x * window.innerWidth) + "px";
			area.style.top = (y * window.innerHeight) + "px";
			
		};
		setLayout();
		window.addEventListener('resize', setLayout);
		
	} else {
		area.style.width = width + "px";
		area.style.height = height + "px";
		area.style.left = x + "px";
		area.style.top = y + "px";
	}
	
	if (scrollable){
		area.style.overflowY = "auto";
	} else {
		area.style.overflowY = "hidden";
	}
	
	area.innerHTML = text;
	
	return area;
	
};


__utils.doChangeElement = function(elementObject, elementId, x, y, width, height){
	var element = null;
	
	if (elementObject != null){
		element = elementObject;
	} else {
		element = document.getElementById(elementId);
	}
	element.style.width = width + "px";
	element.style.height = height + "px";
	element.style.marginLeft = x + "px";
	element.style.marginTop = y + "px";
};

__utils.doDestroyElement = function(elementId){
	
	var element = document.getElementById(elementId);
	if(element){
		__utils.doDestroyAllChildren(element);
		element.parentNode.removeChild(element);
	}
};

__utils.doDestroyAllChildren = function(element){
	if(element){
		while(element.childNodes.length > 0){
			element.removeChild(element.childNodes[0]);
		}
	}
};

__utils.addDomObject = function(obj, x, y, w, h, font_size) {

	var pos = doWrappertoScreen(x, y);
	obj.style.left = pos.x + "px";
	obj.style.top = pos.y + "px";
	
	if(w != 0){
		obj.style.width = (w * oSTAGE.scale) + "px";
	}
	if(h != 0){
		obj.style.height = (h * oSTAGE.scale) + "px";
	}

	var o = new Object();
	o.obj = obj;
	o.x = x;
	o.y = y; 
	o.w = w;
	o.h = h; 
	o.font_size = font_size; 

	dom_objects.push(o);
}

__utils.doClearEventListeners = function(arr)
{
   for (var i = 0; i<arr.length; i++) {
         arr[i].removeAllEventListeners();
    }
}

__utils.addSourceToVideo = function(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}