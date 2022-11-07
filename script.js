$(document).ready(function() {

/********************************************

HOLY MOUNTAIN ANALYTICS

NOTES:
	Make sure you have all autotagger instances run before you 
	initialize the .eventfire_ready function to ensure all tags are caught.

	Use label_format var to set custom label formatting.
	Refer to main script for formatting example.
	label_format is totally optional and used as an error-catcher.

********************************************/
	
	/***** SET TAGS*****/
		/***** NAV *****/
			var category		= "Nav";
			var action			= "Click";
			var value			= "";
			var label_format	= "";

			$('#nav a').autotagger(category, action, value, label_format);

		/***** FOOTER *****/
			var category		= "Footer";
			var action			= "Click";
			var value			= "";
			var label_format	= "";

			$('#footer a').autotagger(category, action, value, label_format);
	
	/***** PRIME EVENT FIRING *****/
		$('html').eventfire_ready();

	/***** URL PARAMETER TAGS *****/
		$('html').url_param_tag();
});