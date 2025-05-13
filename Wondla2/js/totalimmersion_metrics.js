var currentAppName = ""
var dpdFileName = "";

function DFUSION_EVENT_Error(status)
{
	alert(status)
	//alert(dpdFileName)
	
	var errorMsg = "";
	
	switch(status)
	{
	case '1': errorMsg = "TI_EETH_INIT_PLUGIN_FAILED";break;
	case '2': errorMsg = "TI_EETH_DL_SPLASH_FAILED";break;
	case '3': errorMsg = "TI_EETH_LOAD_SPLASH_FAILED";break;
	case '5': errorMsg = "TI_EETH_LOAD_PLAYER_FAILED";break;
	case '6': errorMsg = "TI_EETH_INIT_PLAYER_FAILED";break;
	case '7': errorMsg = "TI_EETH_PLAYER_FAILED";break;
	case '8': errorMsg = "TI_EETH_DL_SCENARIO_FAILED";break;
	case '9': errorMsg = "TI_EETH_LOAD_SCENARIO_FAILED";break;
	case '10': errorMsg = "TI_EETH_LOAD_VIDCAP_FAILED";break;
	
	default: alert("not working");break;
	}
	
	/**
	1 TI_EETH_INIT_PLUGIN_FAILED		Problem with plugin intialisation
	2 TI_EETH_DL_SPLASH_FAILED 		Problem with splash screen download
	3 TI_EETH_LOAD_SPLASH_FAILED 	Problem when charging splash screen
	4 TI_EETH_DL_PLAYER_FAILED 		Problem with player download
	5 TI_EETH_LOAD_PLAYER_FAILED 		Problem when charging player
	6 TI_EETH_INIT_PLAYER_FAILED 		Problem with the player initialisation
	7 TI_EETH_PLAYER_FAILED 			Problem with the player execution
	8 TI_EETH_DL_SCENARIO_FAILED 	Problem with scenario download
	9 TI_EETH_LOAD_SCENARIO_FAILED 	Problem when charging scenario
	10 TI_EETH_LOAD_VIDCAP_FAILED 	No webcam available or the webcam is already used or webcam not properly installed
	**/
	
	eventTracker("DFusion_Event_Error",errorMsg,dpdFileName);
}

function setUpMetrics(iCommandLine)
{
	var index1,index2;
	
	index1 = iCommandLine.lastIndexOf('/')+1;
	index2 = iCommandLine.indexOf('.dpd');
    
	dpdFileName = iCommandLine.substr(index1,index2-index1);
	
	
	
	
	
	//alert(dpdFileName);
}

function eventTracker(category, action, label, value){
		// var pageTracker = _gat._getTracker("UA-19739994-4");
		var pageTracker = _gat._getTracker(gacode);
		// alert("event should have been tracked now");
		
		pageTracker._initData();
		if( typeof label == "undefined"){
			label = null;
		}
		if( typeof value == "undefined"){
			value = null;
		}
		else
		{
			value = parseInt(value)
		}
		// alert("Track Event n category: " + category + "\n action: " + action + "\n label: " + label + "\n value: " + value);
		try{
			pageTracker._trackEvent(category, action, label, value);
			//dcsMultiTrack('DCS.dcsuri', category, action, label, value);
		}catch(err){
			alert(err);
		}
		//alert("Track Event \n category: " + category + "\n action: " + action + "\n label: " + label + "\n value: " + value);

		// alert("event should have been tracked now");
}
