(function($){
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

    chrome.storage.sync.get(null, function(answer) {
		try {
			chrome.browserAction.setIcon({
	            path: answer.disabled > 0 ? 'icon-disabled.png' : 'icon.png'
	        });
		} catch(e) {
			chrome.browserAction.setIcon({
	            path: 'icon-disabled.png'
	        });
		}
    });

	$(window).load(function () {
	    chrome.storage.sync.get(null, function(answer) {
	    	$.extend(true, defaults, answer);
			$('.onoffswitch').click(function() {
				var disabled = $(this).hasClass('enabled') ? 1 : 0;
				$("#disabled").val(disabled);
				iconSet(disabled);
			});

			$('.manualswitch').click(function() {
				var manual = $(this).hasClass('enabled') ? 1 : 0;
				$("#manual").val(manual);
				manualSet(manual);
			});

			$("#page_width").val(defaults.manual.pageWidth);
			$("#columns").val(defaults.manual.columns);
			$("#gutter").val(defaults.manual.gutter);
			$("#top_margin").val(defaults.manual.topMargin);
			$("#line_height").val(defaults.manual.lineHeight);
			$("#lg_top_margin").val(defaults.bs_lg.topMargin);
			$("#lg_line_height").val(defaults.bs_lg.lineHeight);
			$("#md_top_margin").val(defaults.bs_md.topMargin);
			$("#md_line_height").val(defaults.bs_md.lineHeight);
			$("#sm_top_margin").val(defaults.bs_sm.topMargin);
			$("#sm_line_height").val(defaults.bs_sm.lineHeight);
			$("#xs_top_margin").val(defaults.bs_xs.topMargin);
			$("#xs_line_height").val(defaults.bs_xs.lineHeight);
			$("#disabled").val(defaults.disabled);
			$("#manual").val(defaults.usemanual);

			iconSet(parseInt(defaults.disabled));
			manualSet(parseInt(defaults.usemanual));
	    });

	    $("#submit").click(function() {
			chrome.browserAction.setIcon({
	            path: parseInt($("#disabled").val()) > 0 ? 'icon-disabled.png' : 'icon.png'
	        });

			chrome.storage.sync.set({
				disabled	: $("#disabled").val(),
				usemanual	: $("#manual").val(),
				manual 		: {
					pageWidth	: parseInt($("#page_width").val()),
					columns		: parseInt($("#columns").val()),
					gutter		: parseInt($("#gutter").val()),
					topMargin	: parseInt($("#top_margin").val()),
					lineHeight	: parseInt($("#line_height").val())
				},
				bs_lg 		: {
					topMargin	: parseInt($("#lg_top_margin").val()),
					lineHeight	: parseInt($("#lg_line_height").val())
				},
				bs_md 		: {
					topMargin	: parseInt($("#md_top_margin").val()),
					lineHeight	: parseInt($("#md_line_height").val())
				},
				bs_sm 		: {
					topMargin	: parseInt($("#sm_top_margin").val()),
					lineHeight	: parseInt($("#sm_line_height").val())
				},
				bs_xs 		: {
					topMargin	: parseInt($("#xs_top_margin").val()),
					lineHeight	: parseInt($("#xs_line_height").val())
				}
			}, function() {
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {identifier: 'grid_builder_refresh'});

					window.close();
				});
			});
	    });
	});

	function iconSet(disabled) {
		$('.onoffswitch').addClass(disabled ? '' : 'enabled').removeClass(disabled ? 'enabled' : '');

		$('.onoff_cap').html(disabled ? 'OFF' : 'ON');
	}

	function manualSet(manual) {
		$('.manualswitch').addClass(manual ? '' : 'enabled').removeClass(manual ? 'enabled' : '');

		if(manual) {
			$('.bsdef_table').fadeOut(0);
			$('.man_table').fadeIn(0);
		} else {
			$('.man_table').fadeOut(0);
			$('.bsdef_table').fadeIn(0);
		}

		$('.manual_cap').html(manual ? 'Use Manual Settings' : 'Use Bootstrap Defaults');
	}
}(jQuery));