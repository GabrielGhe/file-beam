//this object will hold all the methods to perform actions
var actions = {
	/*
	* Create tag and append it to the body
	*/
	add: function(message){
		if(message.type.indexOf("css") != -1){
			var tag = $("<style />");
			tag.attr("type", message.type);
			tag.html(message.text);
		} else if(message.type.indexOf("javascript") != -1){
			var tag = $("<script />");
			tag.attr("type", message.type);
			tag.html(message.text);
		}

		if(tag){
			$(tag).attr("id", message.filename.replace(/\./g,'-') + "-file-beam");
			$("body").append(tag);
		}
	},

	/*
	* remove tag from the body
	*/
	remove: function(message){
		var toremove = $("#" + message.filename.replace(/\./g,'-') + "-file-beam");
		if(toremove) toremove.remove();
	}
};

//add listener to messages from background script
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse){
	var message = JSON.parse(msg);
	var todo = actions[message.action];
	if(todo){
		todo(message);
	}
});

//send message to background script to empty file-beam
chrome.runtime.sendMessage("reload");