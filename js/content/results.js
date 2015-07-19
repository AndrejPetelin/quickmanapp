var QUICKMAN_RESULTS = (function(){
    var $resultsBox =
        $("<div class='white_background bordered' id='results_box'></div>");
    QUICKMAN_CONTAINER.append($resultsBox);

    var $resultsList = $("<ul id='results_list'></ul>");
    $resultsBox.append($resultsList);

    var renderResults = function(results){
        if (results.allMatches.length == 0){
            disableResultsBox();
            QUICKMAN_CONTENT.renderMessage("no matches were found",
                QUICKMAN_CONTENT.icons.$notFoundIco);
            return;
        }
        else if (results.allMatches.length >= 1 &&
            results.exactMatchIndex === undefined){
            enableResultsBox();
            QUICKMAN_CONTENT.renderMessage("pick a match from the list",
                QUICKMAN_CONTENT.icons.$listIco);
        }

        $resultsList.empty();

        $(results.allMatches).each(function(index, element){
            var $li = $("<li></li>");
            $li.attr({
                "data-href": element.href,
                "title": element.content
            });

            $li.html(element.content);

            $li.click(function(){selectElement(index);});
            $li.mouseover(function(){
                unhoverAll();
                // hover without scrolling
                hoverElement(null, null, index);
            });
            $resultsList.append($li);
        });

        // select exact match
        if (results.exactMatchIndex !== undefined){
            selectElement(results.exactMatchIndex);
        }
    };

    function enableResultsBox(){
		$resultsBox.removeClass("blue_background");
		$resultsBox.addClass("white_background");
	}

	function disableResultsBox(){
		$resultsList.empty();
		$resultsBox.removeClass("white_background");
		$resultsBox.addClass("blue_background");
	}

    var hoveredElement = null, selectedElement = null;
    var HOVERED_ELEMENT = "hovered_element";
    var SELECTED_ELEMENT = "selected_element";

    /* hovers list element according to the arrowKey (if provided)
	 * hovers the (index)th element if key isn't provided
	 * scrolls to the hovered element if scrolling is true */
	function hoverElement(arrowKey, scrolling, index){
		// ensure the list has elements
		if ($resultsList.children().length == 0){
			return;
		}

		// default
		if (index === undefined){index = 0;}

		if (arrowKey){
			// determine the element that the hover will be relative to
			var element = null;
			if (hoveredElement){
				element = hoveredElement;
			}
			else if (selectedElement){
				element = selectedElement;
			}

			if (element){
				switch (arrowKey) {
					// left arrow
					case 37:
						// calculate the index for the previous 10th element
						index = element.index - 10;
						// wrap around
						if (element.index == 0){
							index = $resultsList.children().length - 1;
						}
						else if (element.index < 0){index = 0;}
						break;
					// right arrow
					case 39:
						// wrap around
						if (element.index != $resultsList.children().length - 1){
							// calculate the index for the next 10th element
							index = (element.index + (10 - element.index % 10)) %
								$resultsList.children().length;

							if (element.index > index){
								index = $resultsList.children().length - 1;
							}
						}
						break;
					// up arrow
					case 38:
						// calculate the index for the previous element
						index = element.index - 1;
						if (index < 0){index = $resultsList.children().length - 1;}

						break;
					// down arrow
					case 40:
						// calculate the index for the next element
						index = (element.index + 1) % $resultsList.children()
							.length;
						break;

					default:
						console.error("invalid key");
						break;
				}
			}
		}

		unhoverAll();

		$($resultsList.children().get(index)).addClass(HOVERED_ELEMENT);
		hoveredElement = {
			"$element": $($resultsList.children().get(index)),
			"index": index
		};

		if (scrolling){scrollToElement(index);}
	}

    /* unhovers all hovered elements */
	function unhoverAll(){
		if (hoveredElement){
			var $element = hoveredElement.$element;
			$element.removeClass(HOVERED_ELEMENT);
			hoveredElement = null;
		}
	}

    function selectElement(index){
		if (index === undefined && hoveredElement){
            selectElement(hoveredElement.index);
            return;
        }

        unhoverAll();
		deselectAll();

		// select element
		var $element = $($resultsList.children().get(index));
		$element.addClass(SELECTED_ELEMENT);

		scrollToElement(index);

		QUICKMAN_CONTENT.renderMessage("loading", QUICKMAN_CONTENT.icons.$loadingIco);

		// request and render corresponding man page
		chrome.runtime.sendMessage({href: $element.attr("data-href")},
			function(response){
                QUICKMAN_CONTENT.renderManPage(response.manPage);
            }
		);

		selectedElement = {"$element": $element, "index": index};
	}

    function deselectAll(){
		if (selectedElement){
			selectedElement.$element.removeClass(SELECTED_ELEMENT);
			selectedElement = null;
		}
	}

    function scrollToElement(index){
		var $element = $resultsList.children().get(index);
		if ((index % 10 == 0) ||
			(index == $resultsList.children().length - 1) ||
			($element.offsetTop < $resultsList.scrollTop())){

			$resultsList.scrollTop($element.offsetTop);
		}
	}

    return {
        "renderResults": renderResults,
        "disableResultsBox": disableResultsBox,
        "hoverElement": hoverElement,
        "unhoverAll": unhoverAll,
        "selectElement": selectElement,
        "deselectAll": deselectAll
    };
}());
