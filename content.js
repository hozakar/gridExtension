(function($) {
	"use strict";
	var defaults = {
		defaults	: 'bs_lg',
		pageWidth	: 1170,
		columns		: 12,
		gutter		: 30,
		topMargin	: 0,
		lineHeight	: 24,
		disabled	: 0
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
		if(defaults.disabled) {
			$('#grid_builder_toggle_button').remove();
			$('.grid_builder').remove();
			return;
		}

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
		} else {
			if(btn.data('open')) {
				deleteGrid();
				buildGrid();
			}
		}
	}

	function deleteGrid() {
		$('.grid_builder').remove();
	}

	function buildGrid() {
		if(!$('#grid_builder_toggle_button')) return;

		var hor = parseInt(($('body').height() - defaults.topMargin) / defaults.lineHeight);
		for(var i = 0; i < hor; i++) {
			$('body').append(
				'<div class="grid_builder grid_horizontal" style="top: ' + (i * defaults.lineHeight + defaults.topMargin)  + 'px;"></div>');
		}
		var width = parseInt(defaults.pageWidth) > 0 ? parseInt(defaults.pageWidth) : $('body').width();
		var colWidth = parseInt((width - (defaults.gutter * (defaults.columns - 1))) / defaults.columns);
		var left = parseInt(($('body').width() - width) / 2);
		$('body').append('<div class="grid_builder grid_vertical first" style="left: ' + left  + 'px;"></div>');
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