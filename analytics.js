/********************************************
*********************************************

Holy Mountain - Analytics Plugin

*********************************************
********************************************/




/********************************************

INITIALIZATION

********************************************/
$(document).ready(function() {

	//console log
	console.log("===== Holy Mountain Analytics initialized. =====");

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

		console.log("===== Event Firing primed.  Ready for takeoff. =====");

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
					'event': 			'GAEvent',
					'eventCategory': 	evCat,
					'eventAction': 		evAct,
					'eventLabel': 		evLab,
					'eventValue': 		evVal,
				});

				console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				console.log("GA Event Error");
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

	//console.log('Holy Mountain Analytics Initiated');

	/***** PLUGIN FUNCTION - targets specific elements *****/
		$.fn.autotagger = function(category, action, value, label_format) {
		    
			$(this).each(function(){
				if($(this).attr('data-event')){
					//nothing - already tagged
				} else {

					//console.log notification
						console.log('GA Auto-Tagger - element tagged - category: '+category);
					
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

			console.log("URL parameter-based GA Event detected.");

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

				console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				console.log("GA Event Error");
			}

		}else{
			//do nothing
		}

	}

});


/********************************************

UTM SESSION

NOTES:
	-	JS session closes when tab/browser is closed.
	-	JS localstorage can be used for semi premanent storage

code example:
	
	var searchParams = new URLSearchParams(window.location.search); //store as var
	searchParams.has('sent'); //true/false

UTM Parameter example:

	https://website.com?utm_source=test&utm_medium=test&utm_campaign=test&utm_term=test&utm_content=test
	
********************************************/
$(document).ready(function(){

	var searchParams = new URLSearchParams(window.location.search); 

	console.log("===== UTM Session initialized =====");

	/***** Functions *****/

		//Log new UTMs
		$.fn.utm_log_param = function(utm_type, utm_val) {
			console.log("UTM parameter detected.  Type: "+utm_type+", Value: "+utm_val);
		};

		//Log session UTMs
		$.fn.utm_log_session = function(utm_type, utm_val) {
			console.log("UTM session detected.  Type: "+utm_type+", Value: "+utm_val);
		};

		//Add UTM inputs to forms
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
					console.log("UTM form input group added");

					//merged from separate value function
					$(this).find('input[name="utm_source"]').val(sessionStorage.getItem("utm_source"));
					$(this).find('input[name="utm_medium"]').val(sessionStorage.getItem("utm_medium"));
					$(this).find('input[name="utm_campaign"]').val(sessionStorage.getItem("utm_campaign"));
					$(this).find('input[name="utm_term"]').val(sessionStorage.getItem("utm_term"));
					$(this).find('input[name="utm_content"]').val(sessionStorage.getItem("utm_content"));
					console.log("UTM form inputs filled");
				}
			});
		};

	/***** Store Vars *****/

		//UTM SOURCE
		if(searchParams.has('utm_source')) {
			var utm_source = searchParams.get('utm_source');
			sessionStorage.setItem("utm_source", utm_source);
			$(this).utm_log_param("utm_source", sessionStorage.getItem("utm_source"));
		}else if(sessionStorage.getItem("utm_source")){
			$(this).utm_log_session("utm_source", sessionStorage.getItem("utm_source"));
		}

		//UTM MEDIUM
		if(searchParams.has('utm_medium')) {
			var utm_medium = searchParams.get('utm_medium');
			sessionStorage.setItem("utm_medium", utm_medium);
			$(this).utm_log_param("utm_medium", sessionStorage.getItem("utm_medium"));
		}else if(sessionStorage.getItem("utm_medium")){
			$(this).utm_log_session("utm_medium", sessionStorage.getItem("utm_medium"));
		}

		//UTM CAMPAIGN
		if(searchParams.has('utm_campaign')) {
			var utm_campaign = searchParams.get('utm_campaign');
			sessionStorage.setItem("utm_campaign", utm_campaign);
			$(this).utm_log_param("utm_campaign", sessionStorage.getItem("utm_campaign"));
		}else if(sessionStorage.getItem("utm_campaign")){
			$(this).utm_log_session("utm_campaign", sessionStorage.getItem("utm_campaign"));
		}

		//UTM TERM
		if(searchParams.has('utm_term')) {
			var utm_term = searchParams.get('utm_term');
			sessionStorage.setItem("utm_term", utm_term);
			$(this).utm_log_param("utm_term", sessionStorage.getItem("utm_term"));
		}else if(sessionStorage.getItem("utm_term")){
			$(this).utm_log_session("utm_term", sessionStorage.getItem("utm_term"));
		}

		//UTM CONTENT
		if(searchParams.has('utm_content')) {
			var utm_content = searchParams.get('utm_content');
			sessionStorage.setItem("utm_content", utm_content);
			$(this).utm_log_param("utm_content", sessionStorage.getItem("utm_content"));
		}else if(sessionStorage.getItem("utm_content")){
			$(this).utm_log_session("utm_content", sessionStorage.getItem("utm_content"));
		}

	/***** Fire Functions *****/

		$('html').utm_form_add();
});



/********************************************

UTM EVENT

NOTES:
	-	Use for logging UTM parameters as GA Events
	
********************************************/

$(document).ready(function(){
	
});



/********************************************

HIGHLIGHT TAGGED ELEMENTS

NOTES:
	-	run '$("html").highlightTags();' function to highlight all elements
		with GA Event tags
	
********************************************/
$(document).ready(function(){
	$.fn.highlightTags = function() {
		console.log("===== GA Event Elements Highlighted =====");
		$("[data-event]").each(function(){
			$(this).css("outline", "5px solid red");
		});
	};
});