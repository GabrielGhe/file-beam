/*
try with
https://www.google.ca/webhp?tab=ww&ei=u-2RU7PENs3B8gH2s4HoDA&ved=0CBQQ1S4#q=javascript+stack+overflow
*/
var interval;
var loop = 0;
function lookDown(){
	loop++;
	if(loop == 4){
		clearInterval(interval);
	}
	//scroll down
	$("body").animate({
		scrollTop: $("#navcnt").offset().top
	}, 4000, function(){
		//click on the link
		$("#pnnext").get(0).click();
	});
}

//start it immediately
lookDown();
interval = setInterval(lookDown, 5000);