var devtool;

//listen to file-beam
chrome.runtime.onConnect.addListener(function(devToolsConnection){
	if(devToolsConnection.name != "file-beam") return;

	var devToolsListener = function(message, sender, sendResponse){
		//console.log("In background, got a message from devtools", message);
		var msg = JSON.parse(message);
		chrome.tabs.sendMessage(msg.tabId, message);
	}

	devtool = devToolsConnection;
	devToolsConnection.onMessage.addListener(devToolsListener);
	devToolsConnection.onDisconnect.removeListener(devToolsListener);
});

//listen to content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if(devtool && message == "reload"){
		devtool.postMessage("clear");
	}
});