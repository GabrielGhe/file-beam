/*
try with
http://cmserver.corp.radialpoint.com/teamcity/login.html
*/
var user = "You can automate some UI tests";
var username = $("#username");
var interval = setInterval(function(){

	if(user.length == 0){
		clearInterval(interval);
	}
	var firstChar = user.substring(0,1);
	user = user.substring(1, user.length);

	username.val(username.val() + firstChar);
}, 100);