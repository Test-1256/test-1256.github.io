
this.myNameSpace = this.myNameSpace || {};
    (function() {
        function soundController() {}
 
        soundController.prototype = {

			initialized: false,
			snd_queue: {},

            init: function(callback) {
	
				if(this.initialized == false){
					this.initialized = true;

					this.mute = oUSER.is_mute;
					if(this.mute==0){
						createjs.Sound.setMute(false);
					}else{
						createjs.Sound.setMute(true);
					}
					return createjs.Sound.initializeDefaultPlugins();
				}	
            },
			
			nextSound: function(e){
				var channel = e.target.channel;
				if(__snds.snd_queue[channel].length > 0 ){
					var o =__snds.snd_queue[channel].shift();
					__snds.playSound(o.id, channel, o.loop, o.volume);
				}
			},
			
			stopSound: function(channel){
				if(oSNDS[channel]){
					 oSNDS[channel].stop();
					 delete oSNDS[channel];
				}
			},
			
			queueSound: function(id, channel, loop, volume){
				
				if(!channel){
				   channel = "general";
			   }
				
				var o = new Object();
				o.id = id;
				o.loop = loop;
				o.volume = volume;
				o.channel = channel;
				__snds.snd_queue[channel].push(o);
			},

           playSound: function(id, channel, loop, volume) {

				if(this.initialized == false){
					this.init();
				}

				if(!channel){
					channel = "general";
				}else{
					//clear queue
					 if(oSNDS[channel]){
						oSNDS[channel].stop();
					 }
				}
			   __snds.snd_queue[channel] = new Array();
			   
			   //set argumants
				var args = new Object();
				args.interrupt = createjs.Sound.INTERRUPT_EARLY;
				if(volume){
					args.volume = volume;
				}
				if(loop){
					args.loop = loop;
				}
			   

				if(!(typeof id === 'string')){
					id = id[getRandomInt(0, id.length-1)];
				}

				var instance = createjs.Sound.play(id, args);
				instance.channel = channel;
				instance.addEventListener("complete", __snds.nextSound);
				oSNDS[channel] = instance;
				return instance;
            },
			
		
			toggleMute: function() {
				if(this.mute==0){
					this.mute=1;
					createjs.Sound.setMute(true);
				}else{
					this.mute=0;
					createjs.Sound.setMute(false);
				}
				 oUSER.is_mute = this.mute; 
				__localsaver.doSaveData("user", oUSER);
				return this.mute;
            },
			
			forceMute: function() {
				createjs.Sound.setMute(true);
            },
			
			unforceMute: function() {
				if(this.mute==0){
					createjs.Sound.setMute(false);
				}
            },

			mute: 0
        }
 
        myNameSpace.soundController = soundController;
    }());
	