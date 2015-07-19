var QUICKMAN_CONTENT = (function(){
	var $contentBox = $("<div id='content_box'></div>");
	QUICKMAN_CONTAINER.append($contentBox);

	var icons = {};
	icons.$standbyIco = $("<img class='icon' src='" + chrome.extension
		.getURL("images/icons/standby.png") + "'>");
	icons.$searchingIco = $("<img class='icon' src='" + chrome.extension
		.getURL("images/icons/searching.png") + "'>");
	icons.$loadingIco = $("<img class='icon' src='" + chrome.extension
		.getURL("images/icons/load.png") + "'>");
	icons.$listIco = $("<img class='icon' src='" + chrome.extension
		.getURL("images/icons/list.png") + "'>");
	icons.$notFoundIco = $("<img class='icon' src='" + chrome.extension
		.getURL("images/icons/not_found.png") + "'>");

	var renderManPage = function(manPage){
		$contentBox.empty();
		$(manPage).each(function(index, element){
			// extract pre elements
			var tagName = $(element).prop("tagName");
			if (tagName == "PRE"){
				// remove links
				$(element).find("a").each(function(i, e){
					$(e).removeAttr("href");
				});

				$contentBox.append(element);
			}
		});
	};

	var renderMessage = function(message, icon){
		$contentBox.empty()
			// append icon
			.append(icon)
			// append message
			.append("<div class='message'>" + message + "</div>");
	};

	/* starts standby mode */
	var standby = function(){
		QUICKMAN_SEARCH.$searchBar.val("");
		QUICKMAN_SEARCH.$searchBar.focus();
		renderMessage("standby", icons.$standbyIco);
		QUICKMAN_RESULTS.disableResultsBox();
	};

	return {
		"$contentBox": $contentBox,
		"icons": icons,

		"renderManPage": renderManPage,
		"renderMessage": renderMessage,
		"standby": standby
	};
}());
