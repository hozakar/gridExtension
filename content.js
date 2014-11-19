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
	    	
	    	init();
	    });
	});

	$(window).load(function() {
	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend( true, defaults, answer );

	    	init();
	    });
	});

	function init() {
		var btn = $('#grid_builder_toggle_button');
		if(!btn.length) {
			$('body').append('<div id="grid_builder_toggle_button"></div>');
			$('#grid_builder_toggle_button').click(function(){
				if($(this).data('open')) {
					deleteGrid();
					$(this).data('open', 0);
				} else {
					buildGrid();
					$(this).data('open', 1);
				}
			});
		}
	}

	function deleteGrid() {
		$('.grid_builder').remove();
	}

	function buildGrid() {
		var hor = parseInt(($('body').height() - defaults.topMargin) / defaults.lineHeight);
		for(var i = 0; i < hor; i++) {
			$('body').append(
				'<div class="grid_builder grid_horizontal" style="top: ' + (i * defaults.lineHeight + defaults.topMargin)  + 'px;"></div>');
		}

		var colWidth = parseInt((defaults.pageWidth - (defaults.gutter * (defaults.columns - 1))) / defaults.columns);
		var left = parseInt(($('body').width() - defaults.pageWidth) / 2);
		$('body').append('<div class="grid_builder grid_vertical" style="left: ' + left  + 'px;"></div>');
		left += colWidth; 
		$('body').append('<div class="grid_builder grid_vertical" style="left: ' + left  + 'px;"></div>');
		for(var i = 1; i < defaults.columns; i++) {
			left += defaults.gutter;
			$('body').append('<div class="grid_builder grid_vertical" style="left: ' + left  + 'px;"></div>');
			left += colWidth; 
			$('body').append('<div class="grid_builder grid_vertical" style="left: ' + left  + 'px;"></div>');
		}
	}
}(jQuery));