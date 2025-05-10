 var unityObject={javaInstallDone:function(a,b,c){var d=parseInt(a.substring(a.lastIndexOf("_")+1),10);isNaN(d)||setTimeout(function(){UnityObject2.instances[d].javaInstallDoneCallback(a,b,c)},10)}},UnityObject2=function(a){function b(a){var b=new RegExp(escape(a)+"=([^;]+)");return b.test(w.cookie+";")?(b.exec(w.cookie+";"),RegExp.$1):!1}function c(a,b){document.cookie=escape(a)+"="+escape(b)+"; path=/"}function d(a){var b=0,c,d,e,f,g;if(a){var h=a.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);h&&h[1]&&(c=h[1],d=h[2]?h[2]:0,e=h[3]?h[3]:0,f=h[4]?h[4]:"r",g=h[5]?h[5]:0,b|=c/10%10<<28,b|=c%10<<24,b|=d%10<<20,b|=e%10<<16,b|={d:8192,a:16384,b:24576,f:32768,r:32768}[f],b|=g/100%10<<8,b|=g/10%10<<4,b|=g%10)}return b}function e(a,b){var c=w.getElementsByTagName("body")[0],d=w.createElement("object"),e=0;if(c&&d){d.setAttribute("type",ba.pluginMimeType),d.style.visibility="hidden",c.appendChild(d);var f=0;(function(){if(typeof d.GetPluginVersion=="undefined")f++<10?setTimeout(arguments.callee,10):(c.removeChild(d),a(null));else{var g={};if(b)for(e=0;e<b.length;++e)g[b[e]]=d.GetUnityVersion(b[e]);g.plugin=d.GetPluginVersion(),c.removeChild(d),a(g)}})()}else a(null)}function f(){var a=ba.fullInstall?"UnityWebPlayerFull.exe":"UnityWebPlayer.exe";return ba.referrer!==null&&(a+="?referrer="+ba.referrer),a}function g(){var a="UnityPlayer.plugin.zip";return ba.referrer!=null&&(a+="?referrer="+ba.referrer),a}function h(){return ba.baseDownloadUrl+(bb.win?f():g())}function i(a,b,c,d){a===R&&($=!0),jQuery.inArray(a,O)===-1&&($&&bc.send(a,b,c,d),O.push(a)),N=a}function j(a,b,c){var d,e,f,g,h;if(bb.win&&bb.ie){e="";for(d in a)e+=" "+d+'="'+a[d]+'"';f="";for(d in b)f+='<param name="'+d+'" value="'+b[d]+'" />';c.outerHTML="<object"+e+">"+f+"</object>"}else{g=w.createElement("object");for(d in a)g.setAttribute(d,a[d]);for(d in b)h=w.createElement("param"),h.name=d,h.value=b[d],g.appendChild(h);c.parentNode.replaceChild(g,c)}}function k(a){return typeof a=="undefined"?!1:a.complete?typeof a.naturalWidth!="undefined"&&a.naturalWidth==0?!1:!0:!1}function l(a){var b=!1;for(var c=0;c<M.length;c++){if(!M[c])continue;var d=w.images[M[c]];k(d)?M[c]=null:b=!0}b?setTimeout(arguments.callee,100):setTimeout(function(){m(a)},100)}function m(a){var b=w.getElementById(a);if(!b){b=w.createElement("div");var c=w.body.lastChild;w.body.insertBefore(b,c.nextSibling)}var d=ba.baseDownloadUrl+"3.0/jws/",e={id:a,type:"application/x-java-applet",code:"JVMPreloader",width:1,height:1,name:"JVM Preloader"},f={context:a,codebase:d,classloader_cache:!1,scriptable:!0,mayscript:!0};j(e,f,b),jQuery("#"+a).show()}function n(a){D=!0,c(C,D);var b=w.getElementById(a),d=a+"_applet_"+y;H[d]={attributes:ba.attributes,params:ba.params,callback:ba.callback,broken:ba.broken};var e=H[d],f={id:d,type:"application/x-java-applet",archive:ba.baseDownloadUrl+"3.0/jws/UnityWebPlayer.jar",code:"UnityWebPlayer",width:1,height:1,name:"Unity Web Player"};bb.win&&bb.ff&&(f.style="visibility: hidden;");var g={context:d,jnlp_href:ba.baseDownloadUrl+"3.0/jws/UnityWebPlayer.jnlp",classloader_cache:!1,installer:h(),image:B+"installation/unitylogo.png",centerimage:!0,boxborder:!1,scriptable:!0,mayscript:!0};for(var i in e.params){if(i=="src")continue;e.params[i]!=Object.prototype[i]&&(g[i]=e.params[i],i.toLowerCase()=="logoimage"?g.image=e.params[i]:i.toLowerCase()=="backgroundcolor"?g.boxbgcolor="#"+e.params[i]:i.toLowerCase()=="bordercolor"?g.boxborder=!0:i.toLowerCase()=="textcolor"&&(g.boxfgcolor="#"+e.params[i]))}var k=w.createElement("div");b.appendChild(k),j(f,g,k),jQuery("#"+a).show()}function o(a){setTimeout(function(){var b=w.getElementById(a);b&&b.parentNode.removeChild(b)},0)}function p(a){var b=H[a],c=w.getElementById(a),d;if(!c)return;c.width=b.attributes.width||600,c.height=b.attributes.height||450;var e=c.parentNode,f=e.childNodes;for(var g=0;g<f.length;g++)d=f[g],d.nodeType==1&&d!=c&&e.removeChild(d)}function q(a,b,c){s("_javaInstallDoneCallback",a,b,c),b||i(W,Y,c)}function r(){u.push(arguments),ba.debugLevel>0&&window.console&&window.console.log&&console.log(Array.prototype.slice.call(arguments))}function s(){u.push(arguments),ba.debugLevel>1&&window.console&&window.console.log&&console.log(Array.prototype.slice.call(arguments))}function t(a){return/^[-+]?[0-9]+$/.test(a)&&(a+="px"),a}var u=[],v=window,w=document,x=navigator,y=null,z=[],A=document.location.protocol=="https:",B=A?"https://ssl-webplayer.unity3d.com/":"http://webplayer.unity3d.com/",C="_unity_triedjava",D=b(C),E="_unity_triedclickonce",F=b(E),G=!1,H=[],I=!1,J=null,K=null,L=null,M=[],N=null,O=[],P=!1,Q="installed",R="missing",S="broken",T="unsupported",U="ready",V="start",W="error",X="first",Y="java",Z="clickonce",$=!1,_=null,ba={pluginName:"Unity Player",pluginMimeType:"application/vnd.unity",baseDownloadUrl:B+"download_webplayer-3.x/",fullInstall:!1,autoInstall:!1,enableJava:!0,enableJVMPreloading:!1,enableClickOnce:!0,enableUnityAnalytics:!1,enableGoogleAnalytics:!0,params:{},attributes:{},referrer:null,debugLevel:0};ba=jQuery.extend(!0,ba,a),ba.referrer===""&&(ba.referrer=null),A&&(ba.enableUnityAnalytics=!1);var bb=function(){function a(a,b){for(var c=0;c<Math.max(a.length,b.length);++c){var d=c<a.length&&a[c]?new Number(a[c]):0,e=c<b.length&&b[c]?new Number(b[c]):0;if(d<e)return-1;if(d>e)return 1}return 0}var b=x.userAgent,c=x.platform,d=/chrome/i.test(b),e=!1;/msie/i.test(b)?e=parseFloat(b.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i,"$1")):/Trident/i.test(b)&&(e=parseFloat(b.replace(/^.*rv:([0-9]+(\.[0-9]+)?).*$/i,"$1")));var f={w3:typeof w.getElementById!="undefined"&&typeof w.getElementsByTagName!="undefined"&&typeof w.createElement!="undefined",win:c?/win/i.test(c):/win/i.test(b),mac:c?/mac/i.test(c):/mac/i.test(b),ie:e,ff:/firefox/i.test(b),op:/opera/i.test(b),ch:d,ch_v:/chrome/i.test(b)?parseFloat(b.replace(/^.*chrome\/(\d+(\.\d+)?).*$/i,"$1")):!1,sf:/safari/i.test(b)&&!d,wk:/webkit/i.test(b)?parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i,"$1")):!1,x64:/win64/i.test(b)&&/x64/i.test(b),moz:/mozilla/i.test(b)?parseFloat(b.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i,"$1")):0,mobile:/ipad/i.test(c)||/iphone/i.test(c)||/ipod/i.test(c)||/android/i.test(b)||/windows phone/i.test(b)};f.clientBrand=f.ch?"ch":f.ff?"ff":f.sf?"sf":f.ie?"ie":f.op?"op":"??",f.clientPlatform=f.win?"win":f.mac?"mac":"???";var g=w.getElementsByTagName("script");for(var h=0;h<g.length;++h){var i=g[h].src.match(/^(.*)3\.0\/uo\/UnityObject2\.js$/i);if(i){ba.baseDownloadUrl=i[1];break}}return f.java=function(){if(x.javaEnabled()){var b=f.win&&f.ff,c=!1;if(b||c){if(typeof x.mimeTypes!="undefined"){var d=b?[1,6,0,12]:[1,4,2,0];for(var e=0;e<x.mimeTypes.length;++e)if(x.mimeTypes[e].enabledPlugin){var g=x.mimeTypes[e].type.match(/^application\/x-java-applet;(?:jpi-)?version=(\d+)(?:\.(\d+)(?:\.(\d+)(?:_(\d+))?)?)?$/);if(g!=null&&a(d,g.slice(1))<=0)return!0}}}else if(f.win&&f.ie&&typeof ActiveXObject!="undefined"){function h(a){try{return new ActiveXObject("JavaWebStart.isInstalled."+a+".0")!=null}catch(b){return!1}}function i(a){try{return new ActiveXObject("JavaPlugin.160_"+a)!=null}catch(b){return!1}}if(h("1.7.0"))return!0;if(!(f.ie>=8))return h("1.6.0")||h("1.5.0")||h("1.4.2");if(h("1.6.0")){for(var e=12;e<=50;++e)if(i(e)){if(f.ie==9&&f.moz==5&&e<24)continue;return!0}return!1}}}return!1}(),f.co=function(){if(f.win&&f.ie){var c=b.match(/(\.NET CLR [0-9.]+)|(\.NET[0-9.]+)/g);if(c!=null){var d=[3,5,0];for(var e=0;e<c.length;++e){var g=c[e].match(/[0-9.]{2,}/g)[0].split(".");if(a(d,g)<=0)return!0}}}return!1}(),f}(),bc=function(){function a(){return Math.floor(Math.random()*2147483647)}function b(){var a=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",b=w.getElementsByTagName("script"),c=!1;for(var d=0;d<b.length;++d)if(b[d].src&&b[d].src.toLowerCase()==a.toLowerCase()){c=!0;break}if(!c){var e=w.createElement("script");e.type="text/javascript",e.async=!0,e.src=a;var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(e,f)}var h=ba.debugLevel===0?"UA-16068464-16":"UA-16068464-17";g.push(["unity._setDomainName","none"]),g.push(["unity._setAllowLinker",!0]),g.push(["unity._setReferrerOverride"," "+this.location.toString()]),g.push(["unity._setAccount",h]),g.push(["unity._setCustomVar",1,"Revision","4be03647faad",2])}function c(a,b,c,d){}function d(a,b,c,d){}var e=function(){var b=new Date,c=Date.UTC(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDay(),b.getUTCHours(),b.getUTCMinutes(),b.getUTCSeconds(),b.getUTCMilliseconds());return c.toString(16)+a().toString(16)}(),f=0,g=window._gaq=window._gaq||[];return b(),{send:function(a,b,e,g){(ba.enableUnityAnalytics||ba.enableGoogleAnalytics)&&s("Analytics SEND",a,b,e,g),++f;var h=2,i=function(){0==--h&&(J=null,window.location=g)};if(e===null||e===undefined)e="";c(a,b,e,g?i:null),d(a,b,e,g?i:null)}}}(),bd={getLogHistory:function(){return u},getConfig:function(){return ba},getPlatformInfo:function(){return bb},initPlugin:function(a,b){ba.targetEl=a,ba.src=b,s("ua:",bb),this.detectUnity(this.handlePluginStatus)},detectUnity:function(a,b){var c=this,f=R,g;x.plugins.refresh();if(bb.clientBrand==="??"||bb.clientPlatform==="???"||bb.mobile)f=T;else if(bb.op&&bb.mac)f=T,g="OPERA-MAC";else if(typeof x.plugins!="undefined"&&x.plugins[ba.pluginName]&&typeof x.mimeTypes!="undefined"&&x.mimeTypes[ba.pluginMimeType]&&x.mimeTypes[ba.pluginMimeType].enabledPlugin){f=Q;if(bb.sf&&/Mac OS X 10_6/.test(x.appVersion)){e(function(b){if(!b||!b.plugin)f=S,g="OSX10.6-SFx64";i(f,L,g),a.call(c,f,b)},b);return}if(bb.mac&&bb.ch){e(function(b){b&&d(b.plugin)<=d("2.6.1f3")&&(f=S,g="OSX-CH-U<=2.6.1f3"),i(f,L,g),a.call(c,f,b)},b);return}if(b){e(function(b){i(f,L,g),a.call(c,f,b)},b);return}}else if(bb.ie){var h=!1;try{ActiveXObject.prototype!=null&&(h=!0)}catch(j){}if(!h||bb.x64)f=T,bb.x64?g="WIN-IEx64":g="ActiveXFailed";else{f=R;try{var k=new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1"),l=k.GetPluginVersion();if(b){var m={};for(var n=0;n<b.length;++n)m[b[n]]=k.GetUnityVersion(b[n]);m.plugin=l}f=Q;if(l=="2.5.0f5"){var o=/Windows NT \d+\.\d+/.exec(x.userAgent);if(o&&o.length>0){var p=parseFloat(o[0].split(" ")[2]);p>=6&&(f=S,g="WIN-U2.5.0f5")}}}catch(j){}}}i(f,L,g),a.call(c,f,m)},handlePluginStatus:function(a,b){var c=ba.targetEl,d=jQuery(c);switch(a){case Q:this.notifyProgress(d),this.embedPlugin(d,ba.callback);break;case R:this.notifyProgress(d);var e=this,f=ba.debugLevel===0?1e3:8e3;setTimeout(function(){ba.targetEl=c,e.detectUnity(e.handlePluginStatus)},f);break;case S:this.notifyProgress(d);break;case T:this.notifyProgress(d)}},getPluginURL:function(){var a="http://unity3d.com/webplayer/";return bb.win?a=ba.baseDownloadUrl+f():x.platform=="MacIntel"?(a=ba.baseDownloadUrl+(ba.fullInstall?"webplayer-i386.dmg":"webplayer-mini.dmg"),ba.referrer!==null&&(a+="?referrer="+ba.referrer)):x.platform=="MacPPC"&&(a=ba.baseDownloadUrl+(ba.fullInstall?"webplayer-ppc.dmg":"webplayer-mini.dmg"),ba.referrer!==null&&(a+="?referrer="+ba.referrer)),a},getClickOnceURL:function(){return ba.baseDownloadUrl+"3.0/co/UnityWebPlayer.application?installer="+encodeURIComponent(ba.baseDownloadUrl+f())},embedPlugin:function(a,b){a=jQuery(a).empty();var c=ba.src,d=ba.width||"100%",e=ba.height||"100%",f=this;if(bb.win&&bb.ie){var g="";for(var h in ba.attributes)ba.attributes[h]!=Object.prototype[h]&&(h.toLowerCase()=="styleclass"?g+=' class="'+ba.attributes[h]+'"':h.toLowerCase()!="classid"&&(g+=" "+h+'="'+ba.attributes[h]+'"'));var i="";i+='<param name="src" value="'+c+'" />',i+='<param name="firstFrameCallback" value="UnityObject2.instances['+y+'].firstFrameCallback();" />';for(var h in ba.params)ba.params[h]!=Object.prototype[h]&&h.toLowerCase()!="classid"&&(i+='<param name="'+h+'" value="'+ba.params[h]+'" />');var j='<object classid="clsid:444785F1-DE89-4295-863A-D46C3A781394" style="display: block; width: '+t(d)+"; height: "+t(e)+';"'+g+">"+i+"</object>",k=jQuery(j);a.append(k),z.push(a.attr("id")),_=k[0]}else{var l=jQuery("<embed/>").attr({src:c,type:ba.pluginMimeType,width:d,height:e,firstFrameCallback:"UnityObject2.instances["+y+"].firstFrameCallback();"}).attr(ba.attributes).attr(ba.params).css({display:"block",width:t(d),height:t(e)}).appendTo(a);_=l[0]}(!bb.sf||!bb.mac)&&setTimeout(function(){_.focus()},100),b&&b()},getBestInstallMethod:function(){var a="Manual";return ba.enableJava&&bb.java&&D===!1?a="JavaInstall":ba.enableClickOnce&&bb.co&&F===!1&&(a="ClickOnceIE"),a},installPlugin:function(a){if(a==null||a==undefined)a=this.getBestInstallMethod();var b=null;switch(a){case"JavaInstall":this.doJavaInstall(ba.targetEl.id);break;case"ClickOnceIE":F=!0,c(E,F);var d=jQuery("<iframe src='"+this.getClickOnceURL()+"' style='display:none;' />");jQuery(ba.targetEl).append(d);break;default:case"Manual":var d=jQuery("<iframe src='"+this.getPluginURL()+"' style='display:none;' />");jQuery(ba.targetEl).append(d)}L=a,bc.send(V,a,null,null)},trigger:function(a,b){b?s('trigger("'+a+'")',b):s('trigger("'+a+'")'),jQuery(document).trigger(a,b)},notifyProgress:function(a){if(typeof G!="undefined"&&typeof G=="function"){var b={ua:bb,pluginStatus:N,bestMethod:null,lastType:L,targetEl:ba.targetEl,unityObj:this};N===R&&(b.bestMethod=this.getBestInstallMethod()),K!==N&&(K=N,G(b))}},observeProgress:function(a){G=a},firstFrameCallback:function(){s("*** firstFrameCallback ("+y+") ***"),N=X,this.notifyProgress(),$===!0&&bc.send(N,L)},setPluginStatus:function(a,b,c,d){i(a,b,c,d)},doJavaInstall:function(a){n(a)},jvmPreloaded:function(a){o(a)},appletStarted:function(a){p(a)},javaInstallDoneCallback:function(a,b,c){q(a,b,c)},getUnity:function(){return _}};return y=UnityObject2.instances.length,UnityObject2.instances.push(bd),bd};UnityObject2.instances=[];

function embedUnity(myconfig) {
    function track() {
        var arg = arguments;
        if (typeof window.dcsMultiTrack === "function") {
            dcsMultiTrack.apply(window, arg);
        } else {
            setTimeout(function () {
                track.apply(window, arg);
            }, 500);
        }
    }
    if ($("#unityPlayer").length) {
        myconfig = myconfig || {}
        var config = {
            width: myconfig.width,
            height: myconfig.height,
            gamename: myconfig.gamename || document.title,
            missing: myconfig.missing ||
            function () {},
            broken: myconfig.broken ||
            function () {},
            unsupported: myconfig.unsupported ||
            function () {},
            first: myconfig.first ||
            function () {},
            installed: myconfig.installed ||
            function () {},
            params: {
                enableDebugging: "0",
                disableContextMenu: true,
                enableUnityAnalytics: false,
                enableGoogleAnalytics: false,
                backgroundcolor: myconfig.backgroundcolor || "A0A0A0",
                bordercolor: myconfig.bordercolor || "000000",
                textcolor: myconfig.textcolor || "FFFFFF",
                logoimage: myconfig.logoimage,
                progressbarimage: myconfig.progressbarimage,
                progressframeimage: myconfig.progressframeimage
            }
        };
        var u = new UnityObject2(config);
        var $missingScreen = jQuery("#unityPlayer").find(".missing");
        var $brokenScreen = jQuery("#unityPlayer").find(".broken");
        var $unsupportedScreen = jQuery("#unityPlayer").find(".unsupported");
        var missingEventFired = false;
        var installedEventFired = false;
        var firstEventFired = false;
        u.observeProgress(function (progress) {
            // console.log("progress", progress, config.params.missing, config.params.broken);
            switch (progress.pluginStatus) {
            case "broken":
                config.broken(u);
                $("meta[name=WT\\.z_game]").remove();
                track('WT.z_unity', 'Broken', 'WT.dl', '99');
                $brokenScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $brokenScreen.show();
                break;
            case "unsupported":
                config.unsupported(u);
                $("meta[name=WT\\.z_game]").remove();
                track('WT.z_unity', 'Unsupported', 'WT.dl', '99');
                $unsupportedScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                });
                $unsupportedScreen.show();
                break;
            case "missing":
                config.missing(u);
                $("meta[name=WT\\.z_game]").remove();
                track('WT.z_game', '', 'WT.z_unity', 'Missing', 'WT.dl', '99');
                $missingScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $missingScreen.show();
                missingEventFired = true;
                break;
            case "installed":
                config.installed(u);
                $("meta[name=WT\\.z_game]").remove();
                $missingScreen.remove();
                if (missingEventFired) {
                    track('WT.z_game', '', 'WT.z_unity', 'New', 'WT.dl', '99');
                    // console.log("new");
                };
                if (!firstEventFired) {
                    track('WT.z_game', '', 'WT.z_unity', 'Installed', 'WT.dl', '99');
                }
                installedEventFired = true;
                break;
            case "first":
                config.first(u);
                if (!installedEventFired) {
                    track('WT.z_game', '', 'WT.z_unity', 'Installed', 'WT.dl', '99');
                }
                firstEventFired = true;
                break;
            }
        });

        function _embed(filename) {
            filename = filename || "game.unity3d";
            $missingScreen.hide();
            $brokenScreen.hide();
            u.initPlugin(jQuery("#unityPlayer")[0], filename);
        }
        _embed(myconfig.filename);
    }
};
