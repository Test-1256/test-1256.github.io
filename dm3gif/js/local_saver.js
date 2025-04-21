

function localSaver () {

	window.localStorageAlias = window.localStorage;

	this.useCookies = false;

	if (!window.localStorage || window.localStorage=="undefined"){
		window.localStorageAlias = {};
		window.localStorageAlias.removeItem = function () { };
	}

    this.doSaveData = function (key, data){
		key = game_id + "_" + key;
        window.localStorageAlias[key] = JSON.stringify(data);   
    }

    this.doGetData = function (key){
		key = game_id + "_" + key;
		var string_data = window.localStorageAlias[key];
		if(string_data){
			if(string_data != ""){
				return JSON.parse(string_data);
			}else{
				return null;	
			}
		}else{
			return null;
		}
    }

    this.doClearData = function (key){
	  key = game_id + "_" + key;
      window.localStorageAlias.removeItem(key)  
    }
	
	
}