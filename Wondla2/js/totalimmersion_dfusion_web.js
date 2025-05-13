/******************************************************************************/
/* D'Fusion Web JavaScript Library                                            */
/*                                                                            */
/* IMPORTANT REMARKS:                                                         */
/* To use this file you have to include                                       */
/* - totalimmersion_dfusion_web_plugin.js                                     */
/* - totalimmersion_dfusion_web_pluginMac.js                                  */
/* - javascript_browser_sniffer.js                                            */
/* - totalimmersion_dfusion_web_config.js                                     */
/******************************************************************************/

////////////////////////////////////////////////////////////////////////////////
// global variables

// activate debug
var g_tiDebug = false;
//ID of the Plugin/ActiveX
var g_tiPluginName = "";
// enable Mac OS X support ?
var g_tiMacOSXEnabled = true;
// disable static version check for Firefox under MacOSX ?
// see g_NeedToUpdateFunc
// see totalimmersion_dfusion_web_custom.js
var g_tiDisableStaticVersionDetectionFirefoxMacOSX = true;
// Does the TI logo appear?
var g_tiLogoEnabled = true;
// function used to indicate the plugin need to be update (only used by Firefox under MacOSX)
// see g_tiDisableStaticVersionDetectionFirefoxMacOSX
// see totalimmersion_dfusion_web_custom.js
var g_NeedToUpdateFunc = "tiDFusionPluginNeedToBeUpdated"; 
// -1<0><1> unknown state <a previous plugin installation exists><no previous dfusion plugin installation>
var g_tiFirstPluginInstallMacOSX = -1;


////////////////////////////////////////////////////////////////////////////////
// Main functions

/*****************************************************************************/
/* tiGenerateDFusionWebHTML:                                                 */
/*                                                                           */
/* Main function used to instantiate the D'Fusion Web Plug-in.               */ 
/*                                                                           */
/* Check the operating system, the browser and the plugin version.           */
/* If everything is ok HTML is generated to embed the DFusionWeb plugin      */
/* into the web page.                                                        */
/*                                                                           */
/* With gecko compatible browser if the plugin is not installed or a newer   */
/* version is present online instead of embedding the plugin this function   */
/* generate HTML code to propose the user to install the plugin.             */
/*                                                                           */
/* This function will call:                                                  */
/* - tiDFusionWebNotSupported if the operating system or the web browser     */
/* are not supported (see totalimmersion_dfusion_web_custom.js).             */
/* - tiInstallationRequieredForGecko if the plugin need be updated (and the  */
/* web browser is not Internet Explorer)                                     */
/* (see totalimmersion_dfusion_web_custom.js).                               */
/*                                                                           */
/* Returns true if HTML code as been generated (to instantiate or install    */
/* the plugin).                                                              */
/* Returns false if tiDFusionWebNotSupported has been called.                */
/*****************************************************************************/
function tiGenerateDFusionWebHTML(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	setUpMetrics(iCommandLine);

    // save the plugin name
	g_tiPluginName = iPluginName;
	
	// test the system (OS/browser)
    if (tiOperatingSystemSupported()==false) {
        // system not supported
        // call tiDFusionWebNotSupported defined in totalimmersion_dfusion_web_custom.js
        tiDFusionWebNotSupported();
        return false;
    }
    
    if (tiWindowsSupported() && tiInternetExplorer()) {
        // Internet Explorer under Windows
        // create the HTML code to instantiate the ActiveX
        return tiGenerateDFusionWebHTML_Object(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID);
    }
    
    if (tiNPAPI()) {
        // gecko based browser (firefox, safari, chrome, opera, ...)
        // we test the version of the plugin
        if(tiCheckInstallatioNeedForGecko()==false)
        {
            // the plugin is up to date
            // so we can instantiate it
            return tiGenerateDFusionWebHTML_Embed(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID);
        }
        else
		{
		    // the plugin need to be installed
		    // we return true as there is no error
		    // the funtion tiCheckInstallatioNeedForGecko already generated the HTML code used
		    // to inform the user.
			return true;
		}
    }

    // should not happened    
    // system not supported
    // call tiDFusionWebNotSupported defined in totalimmersion_dfusion_web_custom.js
    tiDFusionWebNotSupported();
    return false;
}

/*****************************************************************************/
/* tiTestDFusionPlugin:                                                      */
/*                                                                           */
/* Test if the plugin is installed and up to date.                           */
/*                                                                           */
/* Returns:                                                                  */
/* - 0 if the plugin is up to date.                                          */
/* - 1 if the plugin need to be installed.                                   */
/* - 2 if the plugin need to be updated.                                     */
/*                                                                           */
/* Remarks:                                                                  */
/* - under MacOSX with Firefox the plugin version is not tested (at this     */
/* time). it means only 0 or 1 can be returned.                              */
/* - under Windows with Internet Explorer the activex version is not tested  */
/* (at this time). it means only 0 or 1 can be returned.                     */
/*****************************************************************************/
function tiTestDFusionPlugin()
{
    if (tiNPAPI()) {
        // update the plugin list
        navigator.plugins.refresh();
        // look for the plugin
        var plugin = tiDFusionPluginForGeckoHere();
        if (plugin==null) {
            // plugin not found -> need to be installed
			if ( g_tiFirstPluginInstallMacOSX == -1 ) {
				g_tiFirstPluginInstallMacOSX = 1;
				if (g_tiDebug) {
					alert("D'Fusion Web plug-in DLL not found");
				}			
			}
            return 1;
        }
		else{
			if ( g_tiFirstPluginInstallMacOSX == -1 ) {
				g_tiFirstPluginInstallMacOSX = 0;
				if (g_tiDebug) {
					alert("D'Fusion Web plug-in DLL founded");
				}
			}
		}
		

	    // if we are under MacOSX and Firefox we did not check the version
	    // the version check will be done by the plugin itself (at runtime)
	    if (g_tiDisableStaticVersionDetectionFirefoxMacOSX && tiMacOSXSupported() && is_fx) {
	        // in this case we cannot check the plugin version (at this time?)
		    return 0;
	    }
	
	    // test the plugin version
	    // return 2 is the online version is newer than the local one.
	    // return 0 is the plugin is up to date.
        return tiIsOnlineVersionNewerForGecko(plugin)?2:0;
    }
    
	var myactiveX = tiDFusionActiveX();
	if (!myactiveX) {
		if (g_tiDebug) {
			alert("D'Fusion ActiveX not found");
		}			
        return 1;
	}
	
    var ret = tiIsOnlineVersionNewerForIE(myactiveX)?2:0;
	myactiveX = null;
	return ret;
}

/*****************************************************************************/
/* ExecuteCommand:                                                           */
/*                                                                           */
/* Send a command to the web player (via the web plugin).                    */
/*                                                                           */
/* The command is a unique string which format look like:                    */
/* ExecuteCommand("CommandName 'param1' 'param2');                           */
/*                                                                           */
/* Returns true if the command has been executed (it does not means the      */
/* command is successful).                                                   */
/*****************************************************************************/
function ExecuteCommand(command)
{
    // test the embeds array which exist only under gecko compatible browser
    // the array contains the list of plugin in the current web page
    // we can find the plugin using its name
	if (document.embeds && document.embeds[g_tiPluginName]) {
	    // now check if the plugin has the ExecuteCommand function
		if (document.embeds[g_tiPluginName].ExecuteCommand) {
		    // call the function.	
			document.embeds[g_tiPluginName].ExecuteCommand(command);
			return true;
		} else {
		    // function not found: call tiDFusionWebCanFindExecuteCommand
		    // (from totalimmersion_dfusion_web_custom.js)
		    tiDFusionWebCanFindExecuteCommand();
			return false;
		}
	} 
	
	// if embeds array does not exist ... check we can use getElementById
	if (document.getElementById) {
		document.getElementById(g_tiPluginName).executeCommand(command);
		return true;
	}
	
    // something failed: call tiDFusionWebCanFindExecuteCommand
    // (from totalimmersion_dfusion_web_custom.js)
	tiDFusionWebCanFindExecuteCommand();
	return false;
}

/*****************************************************************************/
/* GoFullScreen:                                                             */
/*                                                                           */
/* Switch the web player to fullscreen/windowed mode depending on the        */
/* current mode.                                                             */
/*                                                                           */
/* Returns true if the command has been executed (it does not means the      */
/* command is successful).                                                   */
/*****************************************************************************/
function GoFullScreen()
{
	return ExecuteCommand("GoFullScreen");
}





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// FUNCTIONS BELOW MUST NOT BE CALLED FROM THE CLIENT SIDE
//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// functions specific to Internet Explorer


/*****************************************************************************/
/* tiGenerateDFusionWebHTML_Object:                                          */
/*                                                                           */
/* Generates the HTMl code to embed the DFusionWeb plugin into               */
/* Microsoft Internet Explorer.                                              */
/*                                                                           */
/* Returns is successful                                                     */
/*****************************************************************************/
function tiGenerateDFusionWebHTML_Object(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	var html = "";
	html += "<OBJ" + "ECT\n";
	html += "  CLASSID=\"CLSID:" + g_tiIEActiveXClassID + "\"\n";
	html += "  ID=\"" + iPluginName + "\" WIDTH=\"" + iWidth + "\" HEIGHT=\"" + iHeight + "\"\n";
	html += "  CODEBASE=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerName + "#version="+g_tiActivexVersion+"\">\n";
	html += "  <PARAM NAME=\"TEXT\" VALUE=\"TOTO\">\n";
	html += "  <PARAM NAME=\"PLAYERID\" VALUE=\"" + iPlayerID + "\">\n";
	html += "  <PARAM NAME=\"COMMANDLINE\" VALUE=\"" + iCommandLine + "\">\n";
	html += "  <PARAM NAME=\"ChooseCamFunc\" VALUE=\"" + iChooseCameraJSFunc + "\">\n";
	html += "  <PARAM NAME=\"ActionWhenRenderingStart\" VALUE=\"" + iActionWhenStartJSFunc + "\">\n";
	html += "  <PARAM NAME=\"IsUsingJSFuncToSelCam\" VALUE=\"" + iUseJSToSelectCam + "\">\n";
	html += "  <PARAM NAME=\"SplashID\" VALUE=\"" + iSplashID + "\">\n";
	if (g_tiLogoEnabled) {
		html += "  <PARAM NAME=\"tiLogoAppear\" VALUE=\"TRUE\">\n";
	} else {
		html += "  <PARAM NAME=\"tiLogoAppear\" VALUE=\"FALSE\">\n";
	}
	
	html += "</OBJ" + "ECT>\n";
	
	if (g_tiDebug) {
		alert("tiGenerateDFusionWebHTML_Object: \n\n" + html);
	}
	
    document.getElementById(g_tiDivPluginName).innerHTML = html;
	
	return true;
}

function tiInternetExplorer()
{
    // we only support IE6+ and does not support IE 64 Bits version
    return is_ie6up&&(!is_ie64);
}


/*****************************************************************************/
/* tiDFusionActiveX:                                              			 */
/*                                                                           */
/* Return non null value if the DFusionWeb activex has been registered.      */
/*                                                                           */
/* The object return is an activex obejct.          						 */
/*****************************************************************************/
function tiDFusionActiveX()
{
	var myactiveX = null;
	
	try
	{
		myactiveX = new ActiveXObject("DFusionActiveX.DFusionActiveXCtl.1");
    }
    catch (err)
	{
		if (g_tiDebug) {
			alert("D'Fusion ActiveX not found: exception raised");
		}
		myactiveX = null;
        return null;
    }
	
	return myactiveX;
}

function tiIsOnlineVersionNewerForIE(activex)
{ 
	if (typeof activex.TIVersion == 'undefined') {
		if (g_tiDebug) {
			alert("Current version is undefined.");
		}
		return true;
	}
 
	var version = activex.TIVersion; 
	return tiIsOnlineVersionNewerForIE2(version);
}

function tiIsOnlineVersionNewerForIE2(version)
{
    var index = 0;
	var o_index = 0;
    var index2 = version.indexOf(".",index);
	var o_index2 = g_tiActivexVersion.indexOf(",",index);
    if(index2 == -1 || o_index2 == -1 ) {
		if (g_tiDebug) {
			alert("Current version is not valid (1).");
		}
        return true;
    }
    var maj = version.substr(index,index2-index);
    var o_maj = g_tiActivexVersion.substr(o_index,o_index2-o_index);
	maj = parseInt(maj);
	o_maj = parseInt(o_maj);
	if (isNaN(maj) || isNaN(o_maj)) {
		if (g_tiDebug) {
			alert("Current version is not valid (2).");
		}
        return true;
	}

    index=index2+1;
	o_index=o_index2+1;
    index2 = version.indexOf(".",index);
	o_index2 = g_tiActivexVersion.indexOf(",",o_index);
    if(index2 == -1 || o_index2 == -1) {
		if (g_tiDebug) {
			alert("Current version is not valid (3).");
		}
        return true;
    }
    var min = version.substr(index,index2-index);
	var o_min = g_tiActivexVersion.substr(o_index,o_index2-o_index);
	min = parseInt(min);
	o_min = parseInt(o_min);
	if (isNaN(min) || isNaN(o_min)) {
		if (g_tiDebug) {
			alert("Current version is not valid (4).");
		}
        return true;
	}

    index=index2+1;
	o_index=o_index2+1;
    index2 = version.indexOf(".",index);
	o_index2 = g_tiActivexVersion.indexOf(",",o_index);
	var rev = 0;
	var build = 0;
	var o_rev = 0;
	var o_build = 0;
    if(index2 == -1 || o_index2 == -1) {
		rev = version.substr(index);
		o_rev = g_tiActivexVersion.substr(o_index);
		rev = parseInt(rev);
		o_rev = parseInt(o_rev);
		if (isNaN(rev) || isNaN(o_rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (5).");
			}
			return true;
		}
    } else {
	    rev = version.substr(index,index2-index);
		o_rev = g_tiActivexVersion.substr(o_index,o_index2-o_index);
		rev = parseInt(rev);
		o_rev = parseInt(o_rev);
		if (isNaN(rev) || isNaN(o_rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (6).");
			}
			return true;
		}
    
		index=index2+1;
		o_index=o_index2+1;
		build = version.substr(index);
		o_build = g_tiActivexVersion.substr(o_index);
		build = parseInt(build);
		o_build = parseInt(o_build);
		if (isNaN(build)) {
			build = 0
		}
		if (isNaN(o_build)) {
			o_build = 0
		}
	}

	if (maj< o_maj ||
		((maj == o_maj) && (min < o_min)) ||
		((maj == o_maj) && (min == o_min) && (rev < o_rev)) ||
		((maj == o_maj) && (min == o_min) && (rev == o_rev) && (build < o_build)))
	{
		if (g_tiDebug) {
			alert("Online version is newer.");
		}
		return true;
	}
    
	return false;
}

////////////////////////////////////////////////////////////////////////////////
// functions specific to Gecko based web browser (Firefox & co)


/*****************************************************************************/
/* tiGenerateDFusionWebHTML_Embed:                                           */
/*                                                                           */
/* Generates the HTMl code to embed the DFusionWeb plugin in a gecko         */
/* compatible web browser.                                                   */
/*                                                                           */
/* Returns is successful                                                     */
/*****************************************************************************/
function tiGenerateDFusionWebHTML_Embed(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine, iChooseCameraJSFunc, iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	var html = "";
	html += "<EMB" + "ED\n";

    if (is_safari && !is_chrome && navigator.appVersion.indexOf("Mac OS X 10_6")!=-1){
        html += "  TYPE=\"" + g_tiDFusionWebMimeTypeS64 + "\"\n";
    }else{
        html += "  TYPE=\"" + g_tiDFusionWebMimeType + "\"\n";
    }
    
	html += "  WIDTH=\"" + iWidth + "\" HEIGHT=\"" + iHeight + "\"\n";
	html += "  ID=\"" + iPluginName + "\" NAME=\"" + iPluginName + "\"\n";  		
	html += "  PLAYERID=\"" + iPlayerID + "\" COMMANDLINE=\"" + iCommandLine + "\"\n";  		
	html += "  CHOOSECAMFUNC=\"" + iChooseCameraJSFunc + "\" ACTIONWHENRENDERINGSTART=\"" + iActionWhenStartJSFunc + "\"\n";  		
	html += "  ISUSINGJSFUNCTOSELCAM=\"" + iUseJSToSelectCam + "\"\n";
	html += "  SPLASHID=\"" + iSplashID + "\"\n";
	if (g_tiLogoEnabled) {
		html += "  TILOGOAPPEAR=\"TRUE\"\n";
	} else {
		html += "  TILOGOAPPEAR=\"FALSE\"\n";
	}
	html += "  NEEDUPDATEFUNC=\"" + g_NeedToUpdateFunc + "\"\n";
	html += "  TEXT=\"TOTO\"\n";
    html += ">\n";  		
	html += "</EMB" + "ED>\n";

	if (g_tiDebug) {
		alert("tiGenerateDFusionWebHTML_Embed:\n\n" + html);
	}

    document.getElementById(g_tiDivPluginName).innerHTML = html;

	// force the focus of the plugin
	if (document.embeds && document.embeds[g_tiPluginName]) {
		document.embeds[g_tiPluginName].focus();
	}	
	
	return true;
}


/*****************************************************************************/
/* tiNPAPI:                                                                  */
/*                                                                           */
/* Returns true if the current browser is a gecko compatible browser support by TI                   */
/*****************************************************************************/
function tiNPAPI()
{
    // all browser under MacOSX are supposed as compatible with gecko
    //return ((is_gecko && tiWindowsSupported()) || tiMacOSXSupported());
    return (is_gecko||is_khtml)&&(is_fx||is_safari||is_chrome);
}

/*****************************************************************************/
/* tiDFusionPluginForGeckoHere:                                              */
/*                                                                           */
/* Return non null value if the DFusionWeb plug-in has been loaded.          */
/*                                                                           */
/* It means the DFusionWeb plug-in is present in theplugin directory         */
/* (or any alternative directory) of the browser.                            */
/*                                                                           */
/* The object return is a plug-in from the navigator.plugins array.          */
/*****************************************************************************/
function tiDFusionPluginForGeckoHere()
{
    // compute the plugin name and mimetype
    var pluginname = "npdfusionwebfirefox";
    var mimetype = g_tiDFusionWebMimeType;
    if (tiMacOSXSupported()) {
            if (is_safari && !is_chrome && navigator.appVersion.indexOf("Mac OS X 10_6")!=-1)
            {
                pluginname = "dfusionwebplugins64";
                mimetype = g_tiDFusionWebMimeTypeS64;
            }
            else
            {
                pluginname = "dfusionwebplugin";
            }
    }
  
    // here we go through the plug-in loaded by the bowser
    // to look for the virtools one.
  
    for(i=0;i<navigator.plugins.length;i++) {
        // the current plug-in
        myplug = navigator.plugins[i];
        // first we check the name of the plug-in
        index = myplug.filename.lastIndexOf('\\');
        if (index!=-1) {
        sub = myplug.filename.substring(index+1,myplug.filename.length);
        if (sub.toLowerCase().indexOf(pluginname)!=0) {
            continue;
        }
        } else if (myplug.filename.toLowerCase().indexOf(pluginname)!=0) {
        continue;
        }
    
        // now we check the mime type supported by the plug-in  
        for(j=0;j<myplug.length;j++) {
            if(myplug[j].type==mimetype) {
                return myplug;
            }
        }
    }
  	
    // the plug-in has not been found
    return null;
}

/*****************************************************************************/
/* tiIsInstallNeededForGecko:                                                */
/*                                                                           */
/* Returns true if the plugin need to be (re)installed.                      */
/*****************************************************************************/
function tiIsInstallNeededForGecko()
{
    navigator.plugins.refresh();
    // look for the plugin
    var plugin = tiDFusionPluginForGeckoHere();
    if (plugin==null) {
        // the plugin is not here so we need to install it
	
		if ( g_tiFirstPluginInstallMacOSX == -1 ) {
			g_tiFirstPluginInstallMacOSX = 1;
			if (g_tiDebug) {
				alert("D'Fusion Web plug-in DLL not found");
			}			
		}
        return true;
    }
	else
	{
		if ( g_tiFirstPluginInstallMacOSX == -1 ) {
			g_tiFirstPluginInstallMacOSX = 0;
			if (g_tiDebug) {
				alert("D'Fusion Web plug-in DLL founded");
			}
		}
	}

	// if we are under MacOSX and Firefox we did not check the version
	// the version check will be done by the plugin itself (at runtime)
	if (g_tiDisableStaticVersionDetectionFirefoxMacOSX && tiMacOSXSupported() && is_fx) {
        // in this case we cannot check the plugin version (at this time?)
		return false;
	}
	
	// check the plugin version
    return tiIsOnlineVersionNewerForGecko(plugin);
}

/*****************************************************************************/
/* tiDFusionPluginForGeckoVersion:                                           */
/*                                                                           */
/* Compute the plugin version as a string using a plugin object.             */
/* The plugin version is contained in the plugin description.                */
/*****************************************************************************/
function tiDFusionPluginForGeckoVersion(plugin)
{
    // retrieve the plugin description
    // description must looks like "D'Fusion Web Plugin (1.60.5553.0)"
    // we want to retrieve "1.60.5553"
    var description = plugin.description;
    
    // the version if contained between the last '(' and the last ')'
    var index = description.lastIndexOf("(");
    if(index == -1) {
        return "";
    }
    
    var index2 = description.lastIndexOf(")");
    var version = description.substr(index+1,index2-index-1);

    // the version
    return version;
}

/*****************************************************************************/
/* tiDFusionPluginForGeckoVersion:                                           */
/*                                                                           */
/* Compute the plugin version as a string using a plugin object.             */
/* The plugin version is contained in the plugin description.                */
/*****************************************************************************/
function tiIsOnlineVersionNewerForGecko(plugin)
{
    var version = tiDFusionPluginForGeckoVersion(plugin);
	return tiIsOnlineVersionNewerForGecko2(version);
}

function tiIsOnlineVersionNewerForGecko2(version)
{
    var index = 0;
    var index2 = version.indexOf(".",index);
    if(index2 == -1) {
		if (g_tiDebug) {
			alert("Current version is not valid (1).");
		}
        return true;
    }
    var maj = version.substr(index,index2-index);
	maj = parseInt(maj);
	if (isNaN(maj)) {
		if (g_tiDebug) {
			alert("Current version is not valid (2).");
		}
        return true;
	}

    index=index2+1;
    index2 = version.indexOf(".",index);
    if(index2 == -1) {
		if (g_tiDebug) {
			alert("Current version is not valid (3).");
		}
        return true;
    }
    var min = version.substr(index,index2-index);
	min = parseInt(min);
	if (isNaN(min)) {
		if (g_tiDebug) {
			alert("Current version is not valid (4).");
		}
        return true;
	}

    index=index2+1;
    index2 = version.indexOf(".",index);
	var rev = 0;
	var build = 0;
    if(index2 == -1) {
		rev = version.substr(index);
		rev = parseInt(rev);
		if (isNaN(rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (5).");
			}
			return true;
		}
    } else {
	    rev = version.substr(index,index2-index);
		rev = parseInt(rev);
		if (isNaN(rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (6).");
			}
			return true;
		}
    
		index=index2+1;
		build = version.substr(index);
		build = parseInt(build);
		if (isNaN(build)) {
			build = 0
		}
	}

	if (tiMacOSXSupported())
	{
		if (maj< g_tiGeckoLastVersionMajMacOSX ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min < g_tiGeckoLastVersionMinMacOSX)) ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min == g_tiGeckoLastVersionMinMacOSX) && (rev < g_tiGeckoLastVersionRevMacOSX)) ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min == g_tiGeckoLastVersionMinMacOSX) && (rev == g_tiGeckoLastVersionRevMacOSX) && (build < g_tiGeckoLastVersionBuildMacOSX)))
		{
			if (g_tiDebug) {
				alert("Online version is newer.");
			}
			return true;
		}
	}
	else
	{
		if (maj< g_tiGeckoLastVersionMaj ||
			((maj == g_tiGeckoLastVersionMaj) && (min < g_tiGeckoLastVersionMin)) ||
			((maj == g_tiGeckoLastVersionMaj) && (min == g_tiGeckoLastVersionMin) && (rev < g_tiGeckoLastVersionRev)) ||
			((maj == g_tiGeckoLastVersionMaj) && (min == g_tiGeckoLastVersionMin) && (rev == g_tiGeckoLastVersionRev) && (build < g_tiGeckoLastVersionBuild)))
		{
			if (g_tiDebug) {
				alert("Online version is newer.");
			}
			return true;
		}
	}
    return false;
}

function tiCheckInstallatioNeedForGecko()
{
    if(!tiIsInstallNeededForGecko()) {
        return false;
    }
    
    tiInstallationRequieredForGecko();
    
    return true;
}	

////////////////////////////////////////////////////////////////////////////////
// utility functions

/*****************************************************************************/
/* tiOperatingSystemSupported:                                               */
/*                                                                           */
/* Returns true if the operating system is supported.                        */
/*****************************************************************************/
function tiOperatingSystemSupported()
{
	return (tiWindowsSupported() || tiMacOSXSupported());
}

/*****************************************************************************/
/* tiWindowsSupported:                                                       */
/*                                                                           */
/* Returns true if the current version of Microsoft Windows is supported.    */
/*****************************************************************************/
function tiWindowsSupported()
{
	return is_win32;
}

/*****************************************************************************/
/* tiMacOSXSupported:                                                        */
/*                                                                           */
/* Returns true if the current version of MacOSX is supported.               */
/*****************************************************************************/
function tiMacOSXSupported()
{
	return g_tiMacOSXEnabled && is_mac && is_macosx && (is_macintel || (is_macppc==false && is_maciphoneos==false));
}

//-- end of file --
