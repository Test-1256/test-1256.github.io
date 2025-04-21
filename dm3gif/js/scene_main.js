
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//----- main page -----
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function doInitMain(){

	trace("main");

	var current_time, end_time, time_step;

	var gif_length = 0.5;

	var capture_canvas = document.createElement("canvas");
	capture_canvas.width = 520;
	capture_canvas.height = 212;
  	var capture_ctx = capture_canvas.getContext('2d');





	//---------------------
	// top block
	//---------------------

	var top_block = wrapper.appendChild(document.createElement("div"));
	top_block.className = "top_block";

	var logo_block = top_block.appendChild(document.createElement("div"));
	logo_block.className = "logo_block";
	
	var logo = logo_block.appendChild(document.createElement("img"));
	logo.src = "media/images/dm3_logo.png";

	logo_block.appendChild(document.createElement("br"));

	if(date_msg_1){
		var date_1 = logo_block.appendChild(document.createElement("div"));
		date_1.className = "date_1";
	    __utils.doHTMLText(date_1, date_msg_1);
	}
	logo_block.appendChild(document.createElement("br"));

	var date_2 = logo_block.appendChild(document.createElement("div"));
	date_2.className = "date_2";
    __utils.doHTMLText(date_2, date_msg_2);


    var top_image = top_block.appendChild(document.createElement("img"));
    top_image.className = "top_image";
	top_image.src = "media/images/top_image.png";



	//---------------------
	// title block
	//---------------------

	var title_bar = wrapper.appendChild(document.createElement("div"));
	title_bar.className = "title_bar";

	var title_block = title_bar.appendChild(document.createElement("div"));
	title_block.className = "title_block";

	var title_1 = title_block.appendChild(document.createElement("div"));
	title_1.className = "title_1";
    __utils.doHTMLText(title_1, oLANG.title_1);

    var title_2 = title_block.appendChild(document.createElement("div"));
	title_2.className = "title_2";
    __utils.doHTMLText(title_2, oLANG.title_2);


    //---------------------
	// video chooser
	//---------------------

	var video_thumbs = [];

	var doSelectThumb = function(which){
		for(var i=0; i<video_thumbs.length; i++){
			var thumb = video_thumbs[i];
			if(thumb.my_id == which){
				thumb.className = "video_thumb_selected";
			}else{
				thumb.className = "video_thumb";
			}
		}

		/*
		for(var i=0; i<length_buttons.length; i++){
			var button = length_buttons[i];
			button.className = "length_button";
			button.style.pointerEvents = "none";
			button.style.opacity = "0.5";
		}

		for(var i=0; i<length_buttons_additional.length; i++){
			var button = length_buttons_additional[i];
			button.className = "length_button_sm";
			button.style.pointerEvents = "none";
			button.style.opacity = "0.5";
		}
		*/

		dragger_dot.style.left = "0px";
		video.is_ready = false;
		video.autoplay = false;

		b_create.style.pointerEvents = "none";
		b_create.style.backgroundColor = "#eeeeee";


		video.src = thumb.my_obj.link; 
		video.load();

		doHideShareButtons();
    	gif_block.style.backgroundImage = "";
		__utils.doDestroyAllChildren(gif_block);
	}


	for(var i=0; i<video_list.length; i++){
		var o = video_list[i];
		var video_thumb = wrapper.appendChild(document.createElement("div"));
		video_thumb.className = "video_thumb";
		video_thumb.my_id = i;
		video_thumb.my_obj = o;
		video_thumb.onclick = function(e){
			doSelectThumb(e.target.my_id);
		}

		var thumb_img = video_thumb.appendChild(document.createElement("img"));
	    thumb_img.src = o.thumb;
	   	thumb_img.className = "video_thumb_img";

	   	video_thumbs.push(video_thumb);
	}

	wrapper.appendChild(document.createElement("br"));

 	var txt_select_video = wrapper.appendChild(document.createElement("div"));
	txt_select_video.className = "txt_grey";
    __utils.doHTMLText(txt_select_video, oLANG.select_video);

	wrapper.appendChild(document.createElement("br"));

	//-------------------------------------
	// video
	//-------------------------------------

	var doVideoReady = function(){

		if(!video.is_ready){
			video.is_ready = true;
			video.start_time = 0;
			gif_length = 0.5;
			doSelectLength();
			b_create.style.pointerEvents = "auto";
			b_create.style.backgroundColor = "#e96f1b";
		}
	}

	var doScrubFrame = function(){
		video.can_seek = true;

		if(new_time_pending){
			new_time_pending = false;
			b_create.style.pointerEvents = "auto";
			b_create.style.backgroundColor = "#e96f1b";
		}
		video.is_looping = true;
		video.play();
	}


	
	var video = wrapper.appendChild(document.createElement("video"));

	video.setAttribute('webkit-playsinline', '');
	video.setAttribute('playsinline', '');

	video.id = "video";
	video.className = "video";
	video.is_ready = false;
	video.autoplay = false;
	video.width = 710;
	video.height = 290;
	video.controls = false;
	video.playsinline = true;
	video.preload = "auto";
	video.addEventListener('canplaythrough', doVideoReady, false);
	video.addEventListener('seeked', doScrubFrame, false);
	video.purge = false;

	video.doUpdate = function(){
		if(video.is_looping){
			if(video.currentTime >= video.start_time + gif_length){
				video.currentTime = video.start_time;
			}
		}
	}
	actives.push(video);

	wrapper.appendChild(document.createElement("br"));


	//-------------------------------------
	// dragger
	//-------------------------------------


	var is_dragging = false;
	var new_time_pending = false;

 	var set_start = wrapper.appendChild(document.createElement("div"));
	set_start.className = "txt_grey";
    __utils.doHTMLText(set_start, oLANG.set_start);

	wrapper.appendChild(document.createElement("br"));

	var dragger_block = wrapper.appendChild(document.createElement("div"));
	dragger_block.className = "dragger_block";

	var dragger_line = dragger_block.appendChild(document.createElement("div"));
	dragger_line.className = "dragger_line";

	var dragger_dot = dragger_block.appendChild(document.createElement("div"));
	dragger_dot.className = "dragger_dot";
	dragger_dot.my_x = 0;
	dragger_dot.no_drag = true;

	dragger_dot.doUpdate = function(){

		if(this.touch_pending){

			this.touch_pending = false;
			oINPUT.click_pending =false;
			oINPUT.release_pending = false;
			video.can_seek = true;
			video.is_looping = false;
			video.pause();
			is_dragging = true;
			dragger_dot.start_x = dragger_dot.offsetLeft + 30;
			dragger_dot.click_x = oINPUT.mouse_x;

			b_create.style.pointerEvents = "none";
			b_create.style.backgroundColor = "#eeeeee";
		}
		


		if(is_dragging){
			var mouse_move = (oINPUT.mouse_x - dragger_dot.click_x);
			var new_x = Math.max(0, Math.min(600, dragger_dot.start_x + (mouse_move)));
			var percent = new_x / 600;
			var new_time = video.duration * percent;
			if(video.can_seek){
				video.can_seek = false;
				video.start_time = new_time;
				video.currentTime = new_time;
			}
			dragger_dot.style.left = new_x + "px";

			if(!oINPUT.mouse_is_down || oINPUT.release_pending){
				oINPUT.release_pending = false;
				is_dragging = false;
				new_time_pending = true;
			}
		}
	}


	dragger_dot.purge = false;
	actives.push(dragger_dot);

	wrapper.appendChild(document.createElement("br"));


	//-------------------------------------
	// gif length chooser
	//-------------------------------------

	var set_length = wrapper.appendChild(document.createElement("div"));
	set_length.className = "txt_grey";
    __utils.doHTMLText(set_length, oLANG.set_length);

	wrapper.appendChild(document.createElement("br"));

	


	var doSelectLength = function(){

		//update buttons to reflect choices
		for(var i=0; i<length_buttons.length; i++){
			var button = length_buttons[i];
			if(button.my_time == gif_length){
				button.className = "length_button_selected";
			}else{
				button.className = "length_button";
			}
		}

		//update additional button options
		var base_time = Math.floor(gif_length);

		for(var i=0; i<length_buttons_additional.length; i++){
			var button = length_buttons_additional[i];
			var t = __utils.doRound(base_time + 0.1 + (i * 0.1), 1);
			button.my_time = t;
			button.innerHTML = t;
			if(button.my_time == gif_length){
				button.className = "length_button_sm_selected";
			}else{
				button.className = "length_button_sm";
			}
		}


		//play video
		video.is_looping = true;
		video.play();
	}

	var length_buttons = [];

	for(var i=0; i< gif_lengths.length; i++){
		var length_button = wrapper.appendChild(document.createElement("div"));
		length_button.className = "length_button";
		length_button.my_id = i;
		length_button.my_time = gif_lengths[i];
		length_button.innerHTML = gif_lengths[i];
		length_buttons.push(length_button);
		length_button.onmousedown = function(e){
			gif_length = e.target.my_time;
			doSelectLength();
		}
	}

	wrapper.appendChild(document.createElement("br"));

	//-------------------------------------
	// gif length more options
	//-------------------------------------

	var length_buttons_additional = [];
	var more_options_shown = false;

	var doOpenOptions = function(){
		more_options_block.style.display = "inline-block";
		more_options.onmousedown = doCloseOptions;

		//buttons
		for(var i=0; i<length_buttons_additional.length; i++){
			var button = length_buttons_additional[i];
			TweenLite.set(button, {opacity: 0, transform: "scale( 0.5, 0.5)"});
			TweenLite.to(button, .3, {opacity: 1, transform: "scale(1, 1)",  overwrite:true, delay:i * .05});
		}

		//label
		__utils.doHTMLText(more_options_text, oLANG.less_options);

		//leader
		more_options_leader.purge = false;
		more_options_leader.doUpdate = function(){
			this.my_rot += (180 - this.my_rot) * .25;
			if((180 - this.my_rot) < 1){
				this.my_rot = 180;
				this.purge = true;
			}
			this.style.transform = "rotate(" + this.my_rot + "deg)";
		}
		actives.push(more_options_leader);

		doWindowResize();


	}

	var doCloseOptions = function(){

		more_options.onmousedown = doOpenOptions;

		//buttons
		more_options_block.style.display = "none";

		//label
		__utils.doHTMLText(more_options_text, oLANG.more_options);

		//leader
		more_options_leader.purge = false;
		more_options_leader.doUpdate = function(){
			this.my_rot += (0 - this.my_rot) * .25;
			if(Math.abs(this.my_rot) < 1){
				this.my_rot = 0;
				this.purge = true;
			}
			this.style.transform = "rotate(" + this.my_rot + "deg)";
		}
		actives.push(more_options_leader);

		doWindowResize();

	}

	var more_options = wrapper.appendChild(document.createElement("div"));
	more_options.className = "more_options";
	
	var more_options_leader = more_options.appendChild(document.createElement("div"));
	more_options_leader.className = "more_options_leader";
	more_options_leader.my_rot = 0;

	var more_options_text = more_options.appendChild(document.createElement("div"));
    __utils.doHTMLText(more_options_text, oLANG.more_options);
    
    more_options.onmousedown = doOpenOptions;

 	wrapper.appendChild(document.createElement("br"));

 	var more_options_block = wrapper.appendChild(document.createElement("div"));
	more_options_block.className = "generic_relative";
	more_options_block.style.display = "none";
	more_options_block.style.pointerEvents = "auto";


  for(var i=0; i< gif_lengths_additional.length; i++){
		var length_button = more_options_block.appendChild(document.createElement("div"));
		length_button.className = "length_button_sm";
		length_button.my_id = i;
		length_button.innerHTML = gif_lengths_additional[i];
		length_buttons_additional.push(length_button);
		length_button.onmousedown = function(e){
			gif_length = e.target.my_time;
			doSelectLength();
		}
	}
	
	

	//-------------------------------------
	// create button
	//-------------------------------------

	//wrapper.appendChild(document.createElement("br"));

	var b_create = wrapper.appendChild(document.createElement("div"));
	b_create.className = "b_create";
	b_create.style.pointerEvents = "none";
	b_create.style.backgroundColor = "#eeeeee";
    __utils.doHTMLText(b_create, oLANG.create);

    b_create.onmousedown = function(e){
			doRequestCapture();
	}


	wrapper.appendChild(document.createElement("br"));


	//-------------------------------------
	// gif maker
	//-------------------------------------

	var capture_video;
	var capture_timestep;
	var gif;
	var gif_src = null;
	var gif_data = null;



	var doGifReady = function(blob){

		gif_src = URL.createObjectURL(blob);

		//convert gif to sendable format
		var reader  = new FileReader();
		 reader.addEventListener("load", function () {
			gif_data = reader.result;

			gif_block.style.backgroundImage = "";
			__utils.doDestroyAllChildren(gif_block);

			var new_gif = gif_block.appendChild(document.createElement("img"));
			new_gif.style.width = "100%";
			new_gif.src = gif_src;

			doShowShareButtons();

			var new_top = gif_block.offsetTop * oSTAGE.scale;
			TweenLite.to(document.body, .8, {scrollTo:{y:new_top}, overwrite:true, ease: Power2.easeInOut});

		 }, false);

		reader.readAsDataURL(blob);
		capture_video.src = "";	
	}




	var doRequestCapture = function(){

		trace("doRequestCapture()");

		doHideShareButtons();

		gif_src = null;
		gif_data = null;

		__utils.doDestroyAllChildren(gif_block);
		gif_block.style.backgroundImage = "url('media/images/wait_small.gif')";

		gif = new GIF({
		  workers: 2,
		  quality: 20,
		  debug: false,
		  dither: false
		});


		var prog_bar = gif_block.appendChild(document.createElement("div"));
		prog_bar.id = "prog_bar";
		prog_bar.className = "prog_bar";

		var loader_bar_base = prog_bar.appendChild(document.createElement("div"));
		loader_bar_base.className = "prog_bar_base";

		var loader_bar = loader_bar_base.appendChild(document.createElement("div"));
		loader_bar.className = "loader_bar";

		gif.on('progress', function(e) {
		 	loader_bar.style.width = (e * 100) + "%";
		});

		gif.abort();

		capture_video = document.createElement("video");
		capture_video.className = "capture_video";
		capture_video.setAttribute('webkit-playsinline', '');
		capture_video.setAttribute('playsinline', '');
		capture_video.id = "capture_video";
		capture_video.is_ready = false;
		capture_video.autoplay = true;
		capture_video.width = 520;
		capture_video.height = 212;
		capture_video.controls = false;
		capture_video.preload = "auto";
		capture_video.addEventListener('canplaythrough', doStartCapture, false);
		capture_video.src = video.src;	
	}


	var doStartCapture = function(e){
		this.pause();
		this.ignore_frame = true;
		this.removeEventListener('canplaythrough', doStartCapture);
		this.addEventListener('seeked', doUpdateTime, false);
		this.currentTime = video.start_time;
		
	}

	var doUpdateTime = function(e){

		if(this.currentTime < this.duration && this.currentTime < (video.start_time + gif_length)){
	    		
    		capture_ctx.drawImage(this, 0, 0);
    		if(!this.ignore_frame){
    			gif.addFrame(capture_canvas, {delay: 40, copy: true});
    		}
	    	
			this.currentTime += (1/25);
			this.ignore_frame = false;
		}else{
			this.removeEventListener('seeked', doUpdateTime);
			gif.abort();
			gif.on('finished', doGifReady);
			gif.render();
		}	
	}



	var gif_block = wrapper.appendChild(document.createElement("div"));
	gif_block.className = "gif_block";

	//-------------------------------------
	// share
	//-------------------------------------


	wrapper.appendChild(document.createElement("br"));

	var share = wrapper.appendChild(document.createElement("div"));
	share.className = "txt_grey";
    __utils.doHTMLText(share, oLANG.share);

	wrapper.appendChild(document.createElement("br"));

	var share_buttons = [];

	var doShowShareButtons = function(){
		for(var i=0; i<share_buttons.length; i++){
			var button = share_buttons[i];
			button.style.pointerEvents = "auto";
			TweenLite.set(button, {backgroundColor: "#e96f1b", transform: "scale(0.75, 0.75)", delay: i * .1});
			TweenLite.to(button, .66, {transform: "scale(1,1)", overwrite:false, ease: Elastic.easeOut.config(1.8, 1), delay: i * .1});
		}
		TweenLite.set(b_new, {backgroundColor: "#e96f1b", transform: "scale(0.75, 0.75)", delay: i * .1});
		TweenLite.to(b_new, .66, {transform: "scale(1,1)", overwrite:false, ease: Elastic.easeOut.config(1.8, 1), delay: i * .1});
		b_new.style.pointerEvents = "auto";
	}

	var doHideShareButtons = function(){
		for(var i=0; i<share_buttons.length; i++){
			var button = share_buttons[i];
			button.style.pointerEvents = "none";
			TweenLite.to(button, .5, {backgroundColor: "#eeeeee", transform: "scale(0.75, 0.75)",  overwrite:true});
		}
		TweenLite.to(b_new, .5, {backgroundColor: "#eeeeee",  overwrite:true});
		b_new.style.pointerEvents = "none";
	}




	for(var i=0; i< social_links.length; i++){
		var share_button = wrapper.appendChild(document.createElement("div"));
		share_button.className = "share_button";
		share_button.style.backgroundImage = "url('" + social_links[i].icon + "')";
		share_button.my_link = social_links[i].link;
		share_button.my_service = social_links[i].service; 

		share_button.style.pointerEvents = "none";
		share_button.style.backgroundColor = "#eeeeee";

		share_buttons.push(share_button);
		

		share_button.onmousedown = function(e){

			if(!gif_data){
				return;
			}


//trace(gif_data);


			window.open(gif_src,'sharer','toolbar=0,status=0,width=800,height=600');


			return;

			switch (e.target.my_service){

				case "download":
					

				case "facebook":

				var url="http://www.example.com"; //Set desired URL here
				var img="http://blitinteractive.com/gif_creator/gif.gif"; //Set Desired Image here
				var totalurl=encodeURIComponent(url+'?img='+gif_data);

				trace(gif_src);

				var url = "https://www.facebook.com/sharer/sharer.php?u=www.google.com&picture=" + gif_src + "&title=Image&quote=awesome"
				window.open (url, 'share', 'width=500, height=500, scrollbars=yes, resizable=no');


					//var url = "https://www.facebook.com/dialog/share?provider=facebook&app_id=999766640158883&display=popup&href=https%3A%2F%2Fdespicableme.gfycat.com%2Fshare%2FwwXBg7GhQTtkSuBi&picture=https%3A%2F%2Fdespicableme.gfycat.com%2FwwXBg7GhQTtkSuBi.gif";


					//var url = "https://www.facebook.com/dialog/share?provider=facebook&app_id=999766640158883&display=popup&href=https%3A%2F%2Fdespicableme.gfycat.com%2Fshare%2FwwXBg7GhQTtkSuBi&picture=" + gif_data;

				 //	window.open(gif_data,'sharer','toolbar=0,status=0,width=626,height=436');

					break;



			}
			

		}
	}



	wrapper.appendChild(document.createElement("br"));

	var b_new = wrapper.appendChild(document.createElement("div"));
	b_new.className = "b_new";
    __utils.doHTMLText(b_new, oLANG.new_gif);
    b_new.onmousedown = function(e){
    	doHideShareButtons();
    	gif_block.style.backgroundImage = "";
		__utils.doDestroyAllChildren(gif_block);
		TweenLite.to(document.body, .8, {scrollTo:{y:0}, overwrite:true, ease: Power2.easeInOut});	
	}



	wrapper.appendChild(document.createElement("br"));

	//-------------------------------------
	// legal
	//-------------------------------------

	var legal_block = wrapper.appendChild(document.createElement("div"));
	legal_block.className = "legal_block";

	//add links
	for(var i = 0; i<legal_links.length; i++){

		var legal_link = legal_block.appendChild(document.createElement("div"));
		legal_link.my_link = legal_links[i].link;
		legal_link.style.cursor = "pointer";
		legal_link.onmousedown = function(e) {
			window.open(e.target.my_link, "_blank");
			e.preventDefault();
			return false;
		};

		__utils.doHTMLText(legal_link, oLANG[legal_links[i].msg]);
		
		if(i < legal_links.length-1){
			var divider = legal_block.appendChild(document.createElement("div"));
			divider.innerHTML = " | ";
			divider.style.marginLeft = "5px";
			divider.style.marginRight = "5px";
		}
	}


	legal_block.appendChild(document.createElement("br"));

	//add copyright
	if(oLANG.legal_copyright){
		var copyright = legal_block.appendChild(document.createElement("div"));
		__utils.doHTMLText(copyright, oLANG.legal_copyright);
	}

	legal_block.appendChild(document.createElement("br"));

	//add billing block
	if(legal_billing != ""){
		var billing = legal_block.appendChild(document.createElement("img"));
		billing.className = "generic_relative";
		billing.style.marginTop = "20px";
		billing.style.pointerEvents = "none";
		billing.src = legal_billing;
	}










	var minion_1 = gutter_left.appendChild(document.createElement("img"));
	minion_1.src = "media/images/minion_1.png";
	minion_1.className = "generic_absolute";
	minion_1.style.top = "0px";
	minion_1.style.right = "-20px";

	var minion_2 = gutter_left.appendChild(document.createElement("img"));
	minion_2.src = "media/images/minion_2.png";
	minion_2.className = "generic_absolute";
	minion_2.style.top = "1090px";
	minion_2.style.right = "-50px";

	var minion_3 = gutter_right.appendChild(document.createElement("img"));
	minion_3.src = "media/images/minion_3.png";
	minion_3.className = "generic_absolute";
	minion_3.style.top = "720px";
	minion_3.style.left = "-50px";


	var minion_4 = gutter_right.appendChild(document.createElement("img"));
	minion_4.src = "media/images/minion_4.png";
	minion_4.className = "generic_absolute";
	minion_4.style.top = "1600px";
	minion_4.style.left = "-50px";


	


	document.body.onscroll = function(){
		minion_1.style.transform = "translateY(" + (document.body.scrollTop * 0.3) + "px)";
		minion_2.style.transform = "translateY(" + (document.body.scrollTop * 0.3) + "px)";
		minion_3.style.transform = "translateY(" + (document.body.scrollTop * 0.3) + "px)";
		minion_4.style.transform = "translateY(" + (document.body.scrollTop * 0.3) + "px)";
	}


	doSelectThumb(0);
	doHideShareButtons();

	doWindowResize();

}



