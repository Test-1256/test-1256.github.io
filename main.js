var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

<!-- Seasonal Logo Javascript by Sean Kelly //-->
<!-- You have permission to use this code on your site (if you can figure it out) //-->

var today = new Date()

function seasonalLogo() {
var month = today.getMonth()
var day = today.getDate()

if (month == 0 && day == 1)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/newyears.png"
else if (month == 1 && day == 2)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/groundhog.png"
else if (month == 1 && day == 14)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/valentines.png"
else if (month == 2 && day == 17)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/stpatricks.png"
else if (month == 6 && day == 1)
document.logo.src="logos/canadaday.png"
else if (month == 6 && day == 4)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/4thjuly.png"
else if (month == 7 && day == 1)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/bday.png"
else if (month == 9 && day == 31)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/halloween.png"
else if (month == 11 && day == 25)
document.logo.src="https://web.archive.org/web/20130430005911/http://www.smbhq.com/logos/christmas.png"
}

if(document.images) {
pics = new Array();
pics[1] = new Image();
pics[1].src = "/aboutsmbhq.gif";
pics[2] = new Image();
pics[2].src = "/aboutsmbhq-a.gif";
pics[3] = new Image();
pics[3].src = "/games.gif";
pics[4] = new Image();
pics[4].src = "/games-a.gif";
pics[5] = new Image();
pics[5].src = "/mailbag.gif";
pics[6] = new Image();
pics[6].src = "/mailbag-a.gif";
pics[7] = new Image();
pics[7].src = "/store.gif";
pics[8] = new Image();
pics[8].src = "/store-a.gif";
pics[9] = new Image();
pics[9].src = "/extras.gif";
pics[10] = new Image();
pics[10].src = "/extras-a.gif";
pics[11] = new Image();
pics[11].src = "/nc.gif";
pics[12] = new Image();
pics[12].src = "/nc-a.gif";
pics[13] = new Image();
pics[13].src = "/contactus.gif";
pics[14] = new Image();
pics[14].src = "/contactus-a.gif";
pics[15] = new Image();
pics[15].src = "/forum.gif";
pics[16] = new Image();
pics[16].src = "/forum-a.gif";

}

function changer(from,to) {
if(document.images) {
document.images[from].src = pics[to].src;
}
}

self.name="smbhq_parent";



function ShowHide() {
   var pastupdates = document.getElementById("pastupdates");
   var showupdates = document.updateform.pupdates.checked;
   if (navigator.userAgent.indexOf("Netscape6") != -1) {
      pastupdates.style.visibility=(showupdates) ? "visible" : "hidden";
   } else {
      pastupdates.style.display=(showupdates) ? "" : "none";
   }
}




function changeTab(tabName)
   {
      if (tabName == 'ERAS')
      {
         if (document.getElementById)
         {
            document.getElementById('generalTab').style.display = "none";
            document.getElementById('erasTab').style.display = "inline";
            document.getElementById('specialtyTab').style.display = "none";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general.gif)';
   					document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras-on.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty.gif)';
         }
         else
         {
            document.getElementById('generalTab').style.display = "none";
            document.getElementById('erasTab').style.display = "inline";
            document.getElementById('specialtyTab').style.display = "none";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general.gif)';
            document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras-on.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty.gif)';
         }
      }
      else if (tabName == 'SPECIALTY')
      {
         if (document.getElementById)
         {
            document.getElementById('generalTab').style.display = "none";
            document.getElementById('erasTab').style.display = "none";
            document.getElementById('specialtyTab').style.display = "inline";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general.gif)';
            document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty-on.gif)';
         }
         else
         {
            document.getElementById('generalTab').style.display = "none";
            document.getElementById('erasTab').style.display = "none";
            document.getElementById('specialtyTab').style.display = "inline";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general.gif)';
            document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty-on.gif)';
         }
      }
      else
      {
        if (document.getElementById)
         {
            document.getElementById('generalTab').style.display = "inline";
            document.getElementById('erasTab').style.display = "none";
            document.getElementById('specialtyTab').style.display = "none";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general-on.gif)';
            document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty.gif)';
         }
         else
         {
            document.getElementById('generalTab').style.display = "inline";
            document.getElementById('erasTab').style.display = "none";
            document.getElementById('specialtyTab').style.display = "none";
            document.getElementById('generalTabImage').style.background = 'url(http://www.smbhq.com/general-on.gif)';
            document.getElementById('erasTabImage').style.background = 'url(http://www.smbhq.com/eras.gif)';
            document.getElementById('specialtyTabImage').style.background = 'url(http://www.smbhq.com/specialty.gif)';
         }
      }
   }
	

}
/*
     FILE ARCHIVED ON 00:59:11 Apr 30, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:08:17 Sep 25, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 255.373
  exclusion.robots: 0.154
  exclusion.robots.policy: 0.136
  cdx.remote: 0.107
  esindex: 0.016
  LoadShardBlock: 215.223 (3)
  PetaboxLoader3.datanode: 255.084 (5)
  load_resource: 328.114 (2)
  PetaboxLoader3.resolve: 194.754 (2)
*/