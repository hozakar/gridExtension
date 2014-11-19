(function($) {
	"use strict";
	var defaults = {
		defaults	: 'bs_lg',
		pageWidth	: 1170,
		columns		: 12,
		gutter		: 30,
		topMargin	: 0,
		lineHeight	: 24
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	    if(request.identifier !== 'grid_builder_refresh') return;

	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend( true, defaults, answer );
	    	for(var x in defaults) {
	    		alert(defaults[x]);
	    	}
	    });
	});

	$(window).load(function() {
	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend( true, defaults, answer );
	    });
	});
}(jQuery));