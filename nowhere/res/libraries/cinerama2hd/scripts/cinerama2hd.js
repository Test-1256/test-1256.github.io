/**
 *  Blame glen for cinerama
 *  Requires: swfobject 2.2
 */

cinerama_version = "2.50.03";

//cinerama_prefix = "http://nmdev.abc.net.au/res/libraries/cinerama3/";
cinerama_prefix = "http://www.abc.net.au/res/libraries/cinerama2hd/";


//SWFobject
if (typeof(swfobject) == "undefined") {
	jsInclude("http://www.abc.net.au/res/libraries/swfobject/swfobject-2.2.js");
}

//Cinerama Functions
if (typeof(cinerama) == "undefined") {
	jsInclude(cinerama_prefix + "scripts/cinerama2hd_functions.js?version=" + cinerama_version);
}

function jsInclude(jsFile){
	document.write('<script type="text/javascript" src="'+ jsFile + '"></scr' + 'ipt>');
}

function cssInclude(cssFile){
	document.write("<link rel='stylesheet' type='text/css' href='"+cssFile+"'/>" );
}




