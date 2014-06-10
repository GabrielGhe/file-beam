var dropzone;
var fileReader;
var loadedFiles;
var backgroundPageConnection;

$(document).ready(function(){
	dropzone = $("#dropzone");
	loadedFiles = $("#loadedFiles");

	// Create functions ----------------------------------------
	function loadFile(e, file){

		var listItem = $("<li><span class='label label-primary mylabels'><i class='fa fa-file'></i> " + file.name + " (" + file.type + ")</span></li>");
		var closeButton = $("<i class='fa fa-times close-file'></i>");

		//add event to remove item from both file-beam and the inspected page
		closeButton.click(function(){
			listItem.remove();
			var removeObj = {
				action: "remove",
				filename: file.name,
				tabId: chrome.devtools.inspectedWindow.tabId
			};
			backgroundPageConnection.postMessage(JSON.stringify(removeObj));
		});
		listItem.append(closeButton);
		loadedFiles.append(listItem);

		//tell background script about new file
		var addObj = {
			action: "add",
			filename: file.name,
			type: file.type,
			text:  e.target.result,
			tabId: chrome.devtools.inspectedWindow.tabId
		}

		backgroundPageConnection.postMessage(JSON.stringify(addObj));
	}

	function dragenter(e){
		e.preventDefault();
		e.stopPropagation();
		dropzone.removeClass("normal-animation");
	};

	function dragleave(e){
		e.preventDefault();
		e.stopPropagation();
		dropzone.addClass("normal-animation");
	}

	function dragover(e){
		e.preventDefault();
		e.stopPropagation();
	}

	function drop(e){
		e.preventDefault();
		e.stopPropagation();
		dropzone.addClass("normal-animation");
		var files = e.originalEvent.dataTransfer.files;

		if(!files){return;}
		for(var i=0; i != files.length; ++i){
			var file = files[i];
			fileReader = new FileReader();
			fileReader.file = file;
			fileReader.onloadend = function(e){
				loadFile(e, this.file);
			}
			fileReader.readAsText(file);
		}
	}

	// Attach functions to events ----------------------------------------
	dropzone.bind("dragenter", dragenter);
	dropzone.bind("dragleave", dragleave);
	dropzone.bind("dragover", dragover);
	dropzone.bind("drop", drop);

	// Background events ----------------------------------------
	//tell background script that you exist
	backgroundPageConnection = chrome.runtime.connect({
		name: "file-beam"
	});

	//message from background script
	backgroundPageConnection.onMessage.addListener(function(message){
		loadedFiles.empty();
	});

	chrome.devtools.inspectedWindow.reload()
});