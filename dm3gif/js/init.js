
var __localsaver;
var __snds;
var images;
var is_firefox, is_ie, is_mobile, is_android, is_ios;
var update_queue = [];
var preloaded_images = [];
var oGAME, oSNDS, oSTAGE, oLANG, oVARS, oCONFIG, oUSER, oSNDS;
var wrapper, holder;
var snd, snd_beep
var is_mute = false;
var game_id = "dm3_gif_generator";
var my_performance;
var is_landscape, has_keyboard;
var cancel_frameloops = false;
var load_start_time;
var load_showing_bar = false;
var is_loaded = false;
var date_msg_1, date_msg_2;
var actives = [];

var gutter_left, gutter_right;


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//----- init -----
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function doFrameLoop(){
  //update all actives
  for(var i = 0; i < actives.length; i++){
    if(actives[i].purge){
      actives.splice(i,1);
    }else if(actives[i].doUpdate){
      actives[i].doUpdate();
    }else{
      actives.splice(i,1);
    }
  }
  requestAnimationFrame(doFrameLoop);
}


function doInit() {

  doFrameLoop();

  if (!window.console || !window.console.log) console = {log: function() {}, error: function() {}};



  //fix windows.performance issues
  window.performance = my_performance = (window.performance || {
      offset: Date.now(),
      now: function now(){
          return Date.now() - this.offset;
      }
  });
  
  if(!my_performance.now){
    my_performance = {
        offset: Date.now(),
        now: function now(){
            return Date.now() - this.offset;
        }
      }
  }

  oSNDS = {};
  oSTAGE = {}; 

  __snds = new myNameSpace.soundController();
  __localsaver = new localSaver();

  //define elements
  holder = document.getElementById("holder");
  wrapper = document.getElementById("wrapper");
  gutter_left = document.getElementById("gutter_left");
  gutter_right = document.getElementById("gutter_right");

  
	//environment info
	var myNav = navigator.userAgent.toLowerCase();
	is_firefox = myNav.indexOf("firefox") != -1;
	is_ie = ((myNav.indexOf("msie") != -1) || (navigator.appName == "Microsoft Internet Explorer") || ((navigator.appName == "Netscape") && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
	is_mobile = __utils.isMobile.any();
	is_android = __utils.isMobile.Android();
	is_ios = __utils.isMobile.iOS();


  //mobile helper
	if(!is_mobile){
		document.body.className += ' notouch';
	}


  document.body.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
 
	
  //set up user
  oUSER = __localsaver.doGetData("user");

  if(!oUSER){
    oUSER = {};
    oUSER.is_mute = false;
    __localsaver.doSaveData("user", oUSER);
  }

  //handle hidden window muting
  var visProp = doGetHiddenProp();
  if (visProp) {
    var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
    document.addEventListener(evtname,  function(evt) {
      if(document[visProp]){
        __snds.forceMute();
        window_in_background = true;
      }else{
        __snds.unforceMute();
        window_in_background = false;
      }
    });
  }

  //Feb 24, 2017
  var date_release = new Date(date_release);
  var date_tomorrow = new Date(date_day_before);
  var date_friday = new Date(date_week_before);
  var today_date = new Date();

  //add date image
  if(today_date <= date_friday){
    date_msg_1 = oLANG.date_msg_theaters;
    date_msg_2 = oLANG.date_msg_1;
  }else if(today_date <= date_tomorrow){
    date_msg_1 = oLANG.date_msg_theaters;
    date_msg_2 = oLANG.date_msg_2;
  }else if(today_date <= date_release){
    date_msg_1 = oLANG.date_msg_theaters;
    date_msg_2 = oLANG.date_msg_3;
  }else{
    date_msg_1 = null;
    date_msg_2 = oLANG.date_msg_4;
  }


  //begin
  doSetupWindow();
  doPreloadAssets();

}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//----- preloader -----
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////



function doPreloadAssets (){

  var loader_container = document.body.appendChild(document.createElement("div"));
  loader_container.id = "loader_container";
  loader_container.className = "loader_container";

  var txt1 = loader_container.appendChild(document.createElement("div"));
  txt1.style.fontFamily = "MontserratBold";
  txt1.style.visibility = "hidden";
  txt1.innerHTML = ".";

  var txt2 = loader_container.appendChild(document.createElement("div"));
  txt2.style.fontFamily = "MontserratRegular";
  txt2.style.visibility = "hidden";
  txt2.innerHTML = ".";

  var wait_anim = loader_container.appendChild(document.createElement("img"));
  wait_anim.className = "generic_relative";
  wait_anim.src = "media/images/wait.gif";
  wait_anim.style.marginLeft = "-30px";

   var loader_bar_base = loader_container.appendChild(document.createElement("div"));
  loader_bar_base.className = "loader_bar_base";
 
  var loader_bar = loader_bar_base.appendChild(document.createElement("div"));
  loader_bar.className = "loader_bar";
  loader_bar.percent = 0;
  loader_bar.style.width = (loader_bar.percent * 100) + "%";

  load_start_time = performance.now();

	var manifest = [
    {src:"media/sounds/snd_click.mp3", id:"snd_click"},
    {src:"media/sounds/snd_rollover.mp3", id:"snd_rollover_1"},

    {src:"media/videos/thumb_2.png", id:"thumb_2"},
    {src:"media/videos/thumb_1.png", id:"thumb_1"},
    {src:"media/images/dm3_logo.png", id:"dm3_logo"},
    {src:"media/images/top_image.png", id:"top_image"},

    {src:"media/images/studioLogos.png", id:"studioLogos"},
    {src:"media/images/minion_1.png", id:"minion_1"},
    {src:"media/images/minion_2.png", id:"minion_2"},
    {src:"media/images/minion_3.png", id:"minion_3"},
    {src:"media/images/minion_4.png", id:"minion_4"},

    {src:"media/images/more_options_leader.svg", id:"more_options_leader", type: createjs.LoadQueue.IMAGE}


	];
   





  //load'em
  images = images||{};

  var loader = new createjs.LoadQueue(false);
  loader.installPlugin(createjs.Sound);
  loader.my_prog = 0;
  loader.is_complete = false;

  loader.addEventListener("fileload", function (event){
      if (event.item.type == "image") {
        images[event.item.id] = event.result;
      }
  });

  loader.addEventListener("complete", function (event){
      loader.is_complete = true;
  });


  var doUpdateLoader = function(){

     loader.my_prog = loader.progress;
    
    //scale bar
    loader_container.style.top = ((window.innerHeight - loader_container.clientHeight) * 0.5) + "px";
    loader_container.style.left = ((window.innerWidth - loader_container.clientWidth) * 0.5) + "px";
    loader_container.style.transform = "scale(" + oSTAGE.scale + "," + oSTAGE.scale + ")";

    loader_bar.style.width = (loader.progress * 100) + "%";

    if(loader.is_complete && loader.my_prog >= 1){ 
      if(oUSER.is_mute){
         __snds.forceMute();
      }

      __utils.doDestroyElement("loader_container");
     doInitMain();
      return;
    }

    requestAnimationFrame(doUpdateLoader);

  }


  loader.loadManifest(manifest);
  requestAnimationFrame(doUpdateLoader);
  doWindowResize();

}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//----- window tools  -----
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function doWindowResize(){

  oSTAGE.physical_ppi = __utils.getPPI();
  oSTAGE.ppi_scale = oSTAGE.physical_ppi / 96;

  oSTAGE.window_height = window.innerHeight;
  oSTAGE.window_width =  window.innerWidth;

	//measure window
  if(window.innerWidth > window.innerHeight){
      oSTAGE.is_landscape = true;
  }else{
      oSTAGE.is_landscape = false; 
  }

  oSTAGE.scale = (Math.min(1, oSTAGE.window_width/768));
  oSTAGE.scale_inv = (1/oSTAGE.scale);

  oSTAGE.scaled_width =  oSTAGE.window_width * oSTAGE.scale_inv;
 
  wrapper.style.transform = "scale(" + oSTAGE.scale + "," + oSTAGE.scale + ")";
  holder.style.height = (wrapper.clientHeight * oSTAGE.scale) + "px";

  gutter_left.style.width = wrapper.offsetLeft + "px";
  gutter_left.style.height = "100%";
  gutter_right.style.width = wrapper.offsetLeft + "px";
  gutter_right.style.height = "100%";


	//update queue
	for(var i=update_queue.length-1; i>=0; i--){
		if(update_queue[i].update_function){
			update_queue[i].update_function();
		}else{
			update_queue.splice(i,1);
		}
	}


}
