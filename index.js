/********************************************
*********************************************

Planet Caravan - Analytics Plugin

*********************************************
********************************************/




/********************************************

INITIALIZATION

********************************************/


/********************************************

CONSOLE LOG FUNCTIONS
	
********************************************/
$(document).ready(function(){
	let showConsole = false;
	var searchParams = new URLSearchParams(window.location.search); 
	if(searchParams.has("debug")){
		showConsole = true;
	} else {
		console.log("Planet Caravan Analytics running.  Add '?debug' to your URL to show console messages.");
	}

	$.fn.consoleLogger = function(message) {
		
		let style = '\
			font-size: clamp(14px, 2vw, 20px);\
			color: black;\
			border: solid 2px black;\
			padding: 0.5em 1em;\
		';

		if(showConsole == true){
			console.log('%c' + message, style);
		}else{
			//don't show console logs
		}
	};

});

$(document).ready(function() {



	//console log
	$('html').consoleLogger("===== Planet Caravan Analytics initialized. =====");



});


/********************************************

GA EVENTS - MAIN 

Example:

data-event="GAEvent" data-category="Home" data-label="CTA" data-action="Click" data-value="undefined"

- 	The above code should be pasted into the opening tag, 
	as data-attributes, of whatever element you want to 
	put a click event on.	 The below codes then grabs the 
	data attributes you've set,	and pipes it through GTM and GA

********************************************/
$(document).ready(function(){


	$.fn.eventfire_ready = function(){

		$('html').consoleLogger("===== Event Firing primed.  Ready for takeoff. =====");

		$("[data-event='GAEvent']").click(function() {
			//Set vars
			var evCat = $(this).attr('data-category') 	? $(this).attr('data-category') : '';
			var evAct = $(this).attr('data-action') 		? $(this).attr('data-action') : '';
			var evLab = $(this).attr('data-label') 		? $(this).attr('data-label') : '';
			var evVal = $(this).attr('data-value') 		? $(this).attr('data-value') : '';

			try {
				//Fire event
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					'event': 					'GAEvent',
					'eventCategory': 	evCat,
					'eventAction': 		evAct,
					'eventLabel': 			evLab,
					'eventValue': 			evVal,
				});

				$('html').consoleLogger("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				$('html').consoleLogger("GA Event Error");
			}
		});
	};
});


/********************************************

GA AUTO-TAGGER - PROGRAMMATIC VERSION

- 	Use this function to automatically set tags.  
	Be sure to check your work.

********************************************/

$(document).ready(function() {

	//console.log('Planet Caravan Analytics Initiated');

	/***** PLUGIN FUNCTION - targets specific elements *****/
		$.fn.autotagger = function(category, action, value, label_format) {
		    
			$(this).each(function(){
				if($(this).attr('data-event')){
					//nothing - already tagged
				} else {

					//console.log notification
						$('html').consoleLogger('GA Auto-Tagger - element tagged - category: '+category);
					
					//label grabber
						if($(this).children().is('img')){
							var label = $(this).attr('alt');
						} else if($(this).text() == "") {
							var label = $(this).attr('aria-label');
						} else {
							var label = $(this).text();
						}
					
					//label formatter
						if(label_format != ""){
							label = label.replace(label_format);
						} else{
							//Normal formatter - replaces spaces with dashes
							label = label.replace(/\ /g, "-");
						}
						
					
					//set attributes
						$(this).attr('data-event', 'GAEvent');
						$(this).attr('data-category', category);
						$(this).attr('data-label', label);
						$(this).attr('data-action', action);
						$(this).attr('data-value', value);

				}
			});

		};

});




/********************************************

GA EVENTS - FORM SUBMISSIONS - WIP

	- This block of code is for firing an event after a form 
	has been successfully submitted.  There should be an 
	event tag on the submit button, but this is specifically 
	for after the form submits and the page refreshes.

	var urlParams = new URLSearchParams(window.location.search);	//grab data
	urlParams.has('parameter'); 		// check if parameter exists
	urlParams.get('parameter'); 		// get value of parameter

	URL Parameter example:
	?ga_event="true"&ga_cat="form"&ga_act="pageload"&ga_lab="form-success"&ga_val=""
	
********************************************/
$(document).ready(function() {

	$.fn.url_param_tag = function() {

		var urlParams = new URLSearchParams(window.location.search);

		//Check if ga_event param exists
		if (urlParams.has('ga_event')) {

			$('html').consoleLogger("URL parameter-based GA Event detected.");

			//Set vars
			var evCat = urlParams.get('ga_cat')	? urlParams.get('ga_cat') : '';
			var evAct = urlParams.get('ga_act') 	? urlParams.get('ga_act') : '';
			var evLab = urlParams.get('ga_lab') 	? urlParams.get('ga_lab') : '';
			var evVal = urlParams.get('ga_val')	? urlParams.get('ga_val') : '';

			try {
				//Fire event
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					'event': 					'ga_event',
					'eventCategory': 	evCat,
					'eventAction': 		evAct,
					'eventLabel': 			evLab,
					'eventValue': 			evVal,
				});

				$('html').consoleLogger("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				$('html').consoleLogger("GA Event Error");
			}

		}else{
			//do nothing
		}

	}

});


/********************************************

UTM LOGGER

NOTES:
	-	JS session closes when tab/browser is closed.
	-	JS localstorage can be used for semi premanent storage

code example:
	
	var searchParams = new URLSearchParams(window.location.search); //store as var
	searchParams.has('sent'); //true/false

UTM Parameter example:

	https://website.com?utm_source=test&utm_medium=test&utm_campaign=test&utm_term=test&utm_content=test

UTM parameters supported:
	utm_source
	utm_medium
	utm_campaign
	utm_term
	utm_content
	
********************************************/
$(document).ready(function(){

	var searchParams = new URLSearchParams(window.location.search); 

	$('html').consoleLogger("===== UTM tracking initialized =====");

	/***** Functions *****/

		function utm_logger(param) {
			var searchParams = new URLSearchParams(window.location.search); 
			var paramValue = "";
			var utm_state = "";

			if(searchParams.has(param)) {
				//if UTM parameters are present in URL
				utm_state = "url";
				paramValue = searchParams.get(param);
				sessionStorage.setItem(param, paramValue);
				localStorage.setItem(param, paramValue);

			}else if(sessionStorage.getItem(param)){
				//if UTM parameters are not present in URL, but are in SessionStorage
				utm_state = "sessionStorage";
				paramValue = sessionStorage.getItem(param);

			}else if(localStorage.getItem(param)){
				//if UTM parameters are not present in URL or SessionStorage, but are in LocalStorage
				utm_state = "localStorage";
				paramValue = localStorage.getItem(param);

			}
			//console.log("UTM detected: "+param+": "+paramValue);
			//return paramValue;
			return {paramValue, utm_state};

		};

	/***** Run Functions *****/
		var utm_source = utm_logger("utm_source");
		var utm_medium = utm_logger("utm_medium");
		var utm_campaign = utm_logger("utm_campaign");
		var utm_term = utm_logger("utm_term");
		var utm_content = utm_logger("utm_content");
		var utm_state = utm_source.utm_state;


		if($(".UTMTesterTool").length){
			$(".UTMTesterTool [data-utm='utm_source']").text(utm_source.paramValue);
			$(".UTMTesterTool [data-utm='utm_medium']").text(utm_medium.paramValue);
			$(".UTMTesterTool [data-utm='utm_campaign']").text(utm_campaign.paramValue);
			$(".UTMTesterTool [data-utm='utm_term']").text(utm_term.paramValue);
			$(".UTMTesterTool [data-utm='utm_content']").text(utm_content.paramValue);
			$(".UTMTesterTool [data-utm='utm_state']").text(utm_state);
		}


	/***** Add UTM inputs to forms *****/
		var hm_utm_input_code='\
		<style>\
			.hm_utm_input_group{\
				visibility:hidden;\
				position:absolute;\
				width:0px;\
				height:0px;\
				overflow:none;\
				pointer-events:none;\
			}\
		</style\
		\
		<div class="hm_utm_input_group">\
			<input type="hidden" name="utm_source" />\
			<input type="hidden" name="utm_medium" />\
			<input type="hidden" name="utm_campaign" />\
			<input type="hidden" name="utm_term" />\
			<input type="hidden" name="utm_content" />\
		</div>\
		'

		$.fn.utm_form_add = function() {
			$('form').each(function(){
				if($(this).find('.hm_utm_input_group').legnth){
					//.hm_utm_input_group already exists, do nothing
				}else{
					$(this).prepend(hm_utm_input_code);
					$('html').consoleLogger("UTM form input group added");

					//merged from separate value function
					$(this).find('input[name="utm_source"]').val(sessionStorage.getItem("utm_source"));
					$(this).find('input[name="utm_medium"]').val(sessionStorage.getItem("utm_medium"));
					$(this).find('input[name="utm_campaign"]').val(sessionStorage.getItem("utm_campaign"));
					$(this).find('input[name="utm_term"]').val(sessionStorage.getItem("utm_term"));
					$(this).find('input[name="utm_content"]').val(sessionStorage.getItem("utm_content"));
					$('html').consoleLogger("UTM form inputs filled");
				}
			});
		};

});



/********************************************

UTM EVENT

NOTES:
	-	Use for logging UTM parameters as GA Events
	
********************************************/

/*$(document).ready(function(){
	try {
		//Fire event
		window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			'event': 					'utm_event',
			'utm_source': 			utm_source,
			'utm_medium': 		utm_medium,
			'utm_campaign': 		utm_campaign,
			'utm_term': 			utm_term,
			'utm_content': 		utm_content,
		});

	} catch (e) {
		$('html').consoleLogger("GA Event Error");
	}
});*/



/********************************************

HIGHLIGHT TAGGED ELEMENTS

NOTES:
	-	run '$("html").highlightTags();' function to highlight all elements
		with GA Event tags
	
********************************************/
$(document).ready(function(){
	$.fn.highlightTags = function() {
		$('html').consoleLogger("===== GA Event Elements Highlighted =====");
		$("[data-event]").each(function(){
			$(this).css("outline", "5px solid red");
		});
	};
});






/********************************************

Run Fumctions
	
********************************************/
$(document).ready(function(){
	/***** PRIME EVENT FIRING *****/
		$('html').eventfire_ready();

	/***** URL PARAMETER TAGS *****/
		$('html').url_param_tag();
});