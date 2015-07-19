(function(){
	QUICKMAN_CONTAINER.prepend($("<div id='header'></div>")
		.attr("class", "blue_background")

		// add logo container
		.append($("<div id='logo_container'></div>")
			// add logo
			.append("<img id='logo' src='" + chrome.extension
				.getURL("images/logos/logo.png") + "'>")
		)

		// add button group
		.append($("<div id='button_group'></div>")
			// add button container
			.append($("<div class='button_container'></div>")
				// add close button
				.append($("<img class='button' src='" + chrome.extension
					.getURL("images/buttons/close.png") + "'>"))
				.click(QUICKMAN.closeQuickMan)
			)
			// add button container
			.append($("<div class='button_container'></div>")
				// add about button
				.append($("<img class='button' src='" + chrome.extension
					.getURL("images/buttons/about.png") + "'>"))
				.click(function(){
					// load about page
					$.ajax(chrome.extension.getURL("html/about.html"), {
						success: function(about){
							QUICKMAN_CONTENT.$contentBox.html(about);
						}
					});
				})
			)
			// add button container
			.append($("<div class='button_container'></div>")
				// add like button
				.append($("<img class='button' src='" + chrome.extension
					.getURL("images/buttons/like.png") + "'>"))
				// open facebook page
				.click(function(){
					window.open("https://www.facebook.com/quickmanapp");
				})
			)
		)
	);
}());
