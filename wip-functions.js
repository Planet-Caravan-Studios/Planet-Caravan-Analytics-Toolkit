/********************************************
*********************************************

Holy Mountain - Analytics Plugin

*********************************************
********************************************/







/********************************************

PRE-FLIGHT CHECK - WIP

********************************************/

if (typeof jQuery == 'undefined') {

    // jQuery IS NOT loaded, do stuff here.

    /*
    function loadjs() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        script.onload = function(){
            alert("Script is ready!"); 
            console.log(test.defult_id);
        };
        document.body.appendChild(script);
     }
     */
/*
     // Get the first script element on the page
     var ref = w.document.getElementsByTagName( 'script' )[ 0 ];

     // Create a new script element
     var script = w.document.createElement( 'script' );

     // Set the script element `src`
     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.j';

     // Inject the script into the DOM
     ref.parentNode.insertBefore( script, ref );
*/
}



/********************************************

INITIALIZATION - WIP

********************************************/
$(document).ready(function() {

	//console log
		console.log("===== Holy Mountain Analytics initialized. =====");

	//GTM detect - check for GTM script in <head>
		
		var gtm_detect = 0;
		$('script').each(function() {
			if($(this).text("https://www.googletagmanager.com/gtm.js?id=")){
				gtm_detect = 1;
				return false;
			}
		});

		if(gtm_detect == 1){
			console.log("===== GTM script detected. =====");
		} else {
			console.log("===== No GTM script detected.  Double check GTM installation. =====");
		}
		
});



/********************************************

USER ID COOKIE - WIP

********************************************/
$(document).ready(function() {

/*
	$.fn.uid_cookie = function(cname, cvalue, exdays){
		 var d = new Date();
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));
		  var expires = "expires="+ d.toUTCString();
		  document.cookie = cname + "=" + cvalue + ";" + expires + ";";

		  console.log("user_id_cookie successful " + cname + "=" + cvalue + ";" + expires + ";");
	};


	var cookie_check = getCookie("hm_analytics_uid");
	if(username != ""){
		//

	} else{
		//set cookie
		var uid_rand = Math.floor(Math.random() * 1000000);  

		var cname = "hm_analytics_uid_daily";
		var cvalue = "hm-d-" + uid_rand;
		var exdays = 30;

		$(document).uid_cookie(cname, cvalue, exdays);
	}
	
*/
});
