"use strict";

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("submit").addEventListener("click", function() {
		chrome.storage.sync.set({
			defaults	: document.getElementById("defaults").value,
			pageWidth	: parseInt(document.getElementById("page_width").value),
			columns		: parseInt(document.getElementById("columns").value),
			gutter		: parseInt(document.getElementById("gutter").value),
			topMargin	: parseInt(document.getElementById("top_margin").value),
			lineHeight	: parseInt(document.getElementById("line_height").value)
		}, function() {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {identifier: 'grid_builder_refresh'});

				window.close();
			});
		});
    }, false);

    chrome.storage.sync.get(null, function(answer) {
    	$.extend( true, defaults, answer );
		$("#defaults").val(defaults.defaults);
		$("#page_width").val(defaults.pageWidth);
		$("#columns").val(defaults.columns);
		$("#gutter").val(defaults.gutter);
		$("#top_margin").val(defaults.topMargin);
		$("#line_height").val(defaults.lineHeight);
    });
});
