(function($){
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

	var predefined = {
		'bs_lg' : {
			pageWidth	: 1170,
			columns		: 12,
			gutter		: 30
		},
		'bs_md' : {
			pageWidth	: 970,
			columns		: 12,
			gutter		: 30
		},
		'bs_sm' : {
			pageWidth	: 750,
			columns		: 12,
			gutter		: 30
		},
		'bs_xs' : {
			pageWidth	: 0,
			columns		: 12,
			gutter		: 30
		}
	}

    chrome.storage.sync.get(null, function(answer) {
    	$.extend(true, defaults, answer);
		iconSet(defaults.disabled);
		
		chrome.browserAction.setIcon({
            path: defaults.disabled > 0 ? 'icon-disabled-16.png' : 'icon16.png'
        });
    });

	$(window).load(function () {
	    $("#submit").click(function() {
			chrome.browserAction.setIcon({
	            path: parseInt($("#disabled").val()) > 0 ? 'icon-disabled-16.png' : 'icon16.png'
	        });

			chrome.storage.sync.set({
				defaults	: document.getElementById("defaults").value,
				pageWidth	: parseInt(document.getElementById("page_width").value),
				columns		: parseInt(document.getElementById("columns").value),
				gutter		: parseInt(document.getElementById("gutter").value),
				topMargin	: parseInt(document.getElementById("top_margin").value),
				lineHeight	: parseInt(document.getElementById("line_height").value),
				disabled	: parseInt(document.getElementById("disabled").value)
			}, function() {
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {identifier: 'grid_builder_refresh'});

					window.close();
				});
			});
	    });

		$("#defaults").val(defaults.defaults);
		$("#page_width").val(defaults.pageWidth);
		$("#columns").val(defaults.columns);
		$("#gutter").val(defaults.gutter);
		$("#top_margin").val(defaults.topMargin);
		$("#line_height").val(defaults.lineHeight);
		$("#disabled").val(defaults.disabled);

		$('.disable, .enable').click(function() {
			var disabled = $(this).hasClass('disable') ? 1 : 0;
			$("#disabled").val(disabled);
			iconSet(disabled);
		});

		$("#page_width, #columns, #gutter").blur(function(){
			if(!$('#defaults').val()) return;

			if(
				$("#page_width").val() != predefined[$('#defaults').val()].pageWidth ||
				$("#columns").val() != predefined[$('#defaults').val()].columns ||
				$("#gutter").val() != predefined[$('#defaults').val()].gutter
			) {
				$('#defaults').val('');
			}
		});

	    $('#defaults').change(function() {
	    	if(!$(this).val()) return;

			$("#page_width").val(predefined[$(this).val()].pageWidth);
			$("#columns").val(predefined[$(this).val()].columns);
			$("#gutter").val(predefined[$(this).val()].gutter);
	    });
	});

	function iconSet(disabled) {
		$('.disable').addClass(disabled ? 'selected' : '').removeClass(disabled ? '' : 'selected');
		$('.enable').addClass(!disabled ? 'selected' : '').removeClass(!disabled ? '' : 'selected');
	}
}(jQuery));