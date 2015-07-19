var QUICKMAN = (function(){
	var $quickManWindow = $("<div id='quickman_window'></div>").css({
		"width": "855px",
		"height": "408px",
		"position": "fixed",
		"top": "50%",
		"left": "50%",
		"margin-top": "-204px",
		"margin-left": "-425px",
		"z-index": "2147483646"
	});

	var closeQuickMan = function(){
	    if ($("#quick_man")){
	        $($quickManWindow).fadeOut("fast", function(){
	            $($quickManWindow).detach();
	        });

	        QUICKMAN_RESULTS.unhoverAll();
			QUICKMAN_RESULTS.deselectAll();
	    }
	};

	/* opens QuickMan's window */
	//function openQuickMan(needle){
	var openQuickMan = function (needle){
		// ensure QuickMan's window is not already open
		if ($("#quickman_window").length == 0){
			$quickManWindow.css("display", "none");
			$("html").append($quickManWindow);
			$quickManWindow.fadeIn("fast", function(){
				if (needle){QUICKMAN_SEARCH.search(needle);}
				else{QUICKMAN_CONTENT.standby();}
			});
			$quickManWindow.fadeIn("fast");
		}
		else if (needle){QUICKMAN_SEARCH.search(needle);}

		return
	};

	/* listen for text selection */
    $(document).mouseup(function(event){
        if (event.ctrlKey){
            var needle = window.getSelection().toString();
            if (needle && /\w+/.test(needle)){QUICKMAN.openQuickMan(needle);}
        }
    }).keyup(function(){
		// ESC
		if (event.keyCode == 27){QUICKMAN.closeQuickMan();}
	}).keypress(function(){
		if ($("#quickman_window")){QUICKMAN_SEARCH.$searchBar.focus();}
	});

	/* to open QuickMan on clicking the browser action icon */
	chrome.runtime.onMessage.addListener(function(request){
		if (request.open){openQuickMan();}
	});
	
	return {
		"$quickManWindow": $quickManWindow,

		"openQuickMan": openQuickMan,
		"closeQuickMan": closeQuickMan
	};
}());
