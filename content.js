(function($) {
	"use strict";

	var defaults = {
		'bs_lg' : {
			pageWidth	: 1140,
			columns		: 12,
			gutter		: 30,
			topMargin	: 0,
			lineHeight	: 24
		},
		'bs_md' : {
			pageWidth	: 940,
			columns		: 12,
			gutter		: 30,
			topMargin	: 0,
			lineHeight	: 24
		},
		'bs_sm' : {
			pageWidth	: 720,
			columns		: 12,
			gutter		: 30,
			topMargin	: 0,
			lineHeight	: 24
		},
		'bs_xs' : {
			pageWidth	: 0,
			columns		: 12,
			gutter		: 30,
			topMargin	: 0,
			lineHeight	: 24
		},
		'manual': {
			pageWidth	: 1140,
			columns		: 12,
			gutter		: 30,
			topMargin	: 0,
			lineHeight	: 24
		},
		'disabled'	: 0,
		'usemanual'	: 0
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	    if(request.identifier !== 'grid_builder_refresh') return;

	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend( true, defaults, answer );

	    	init();
	    });
	});

	function load() {
	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend( true, defaults, answer );

	    	init();
	    });
	}

	$(window).load(load);
	$(document).ready(load);

	$(window).resize(function(){
		if($('.grid_builder').length) {
			deleteGrid();
			buildGrid();
		}
	});

	function init() {
		if(parseInt(defaults.disabled)) {
			$('#grid_builder_toggle_button').remove();
			$('.grid_builder').remove();
			return;
		}

		var btn = $('#grid_builder_toggle_button');
		if(!btn.length) {
			$('body').append('<div id="grid_builder_toggle_button">ON</div>');
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
		$('#grid_builder_toggle_button').html('ON');
		$('#grid_builder_toggle_button').removeClass('off');
	}

	function buildGrid() {
		if(!$('#grid_builder_toggle_button')) return;
		$('#grid_builder_toggle_button').html('OFF');
		$('#grid_builder_toggle_button').addClass('off');

		var width, colWidth, hor, item;
		if(parseInt(defaults.usemanual)) {
			item = defaults['manual'];
		} else {
			for(var sizing in defaults) {
				item = defaults[sizing];
				if(item.pageWidth + item.gutter < $('body').width()) break;
			}
		}
		var totalHeight = $('html').height();
		$('*').each(function(){
			totalHeight = Math.max(totalHeight, $(this).offset().top + $(this).outerHeight());
		});

		hor = parseInt((totalHeight - item.topMargin) / item.lineHeight);
		var lineHeight = item.lineHeight;
		var topMargin = item.topMargin;
		var columns = item.columns;
		var gutter = item.gutter;
		width = parseInt(item.pageWidth) > 0 ? parseInt(item.pageWidth) : $('body').width() - item.gutter;
		colWidth = (width - (item.gutter * (item.columns - 1))) / item.columns;

		for(var i = 0; i < hor; i++) {
			$('body').append(
				'<div class="grid_builder grid_horizontal" style="top: ' + (i * lineHeight + topMargin)  + 'px;"></div>'
			);
		}

		var left = parseInt(($('body').width() - width) / 2);
		$('body').append('<div class="grid_builder grid_vertical first" style="left: ' + parseInt(left)  + 'px;"></div>');
		left += colWidth;
		$('body').append('<div class="grid_builder grid_vertical" style="left: ' + parseInt(left)  + 'px;"></div>');
		for(var i = 1; i < columns; i++) {
			left += gutter;
			$('body').append('<div class="grid_builder grid_vertical" style="left: ' + parseInt(left)  + 'px;"></div>');
			left += colWidth;
			$('body').append('<div class="grid_builder grid_vertical" style="left: ' + parseInt(left)  + 'px;"></div>');
		}
	}
}(jQuery));