/********************************************

Utility.js - this file is for a few basic elements used in 
the test pages for this plugin.  This code is not included in the actual plugin.

********************************************/

$(document).ready(function(){
	
	function utm_log_session(param) {
		var searchParams = new URLSearchParams(window.location.search); 
		var paramValue = "";
		var utm_state = "";

		if(searchParams.has(param)) {
			//if UTM parameters are present in URL
			utm_state = "url";
			paramValue = searchParams.get(param);
			sessionStorage.setItem(param, paramValue);
			$(this).utm_log_param(param, paramValue);

		}else if(sessionStorage.getItem(param)){
			//if UTM parameters are not present in URL, but are in SessionStorage
			utm_state = "sessionStorage";
			paramValue = searchParams.get(param);
			$(this).utm_log_session(param, paramValue);

		}else if(localStorage.getItem(param)){
			//if UTM parameters are not present in URL or SessionStorage, but are in LocalStorage
			utm_state = "localStorage";
			paramValue = searchParams.get(param);
			$(this).utm_log_session(param, paramValue);

		}
		console.log("UTM detected: "+param+": "+paramValue);
		return paramValue;

	};

	/*Run Functions*/
	var utm_source = utm_log_session("utm_source");
	//console.log(utm_source);
	$(".UTMTesterTool [data-utm='utm_source']").text(utm_source);

	var utm_medium = utm_log_session("utm_medium");
	//console.log(utm_medium);
	$(".UTMTesterTool [data-utm='utm_medium']").text(utm_medium);

	var utm_campaign = utm_log_session("utm_campaign");
	//console.log(utm_campaign);
	$(".UTMTesterTool [data-utm='utm_campaign']").text(utm_campaign);

	var utm_term = utm_log_session("utm_term");
	//console.log(utm_term);
	$(".UTMTesterTool [data-utm='utm_term']").text(utm_term);

	var utm_content = utm_log_session("utm_content");
	//console.log(utm_content);
	$(".UTMTesterTool [data-utm='utm_content']").text(utm_content);

});