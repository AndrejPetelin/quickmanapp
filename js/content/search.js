var QUICKMAN_SEARCH = (function(){
    // create search bar
    var $searchBar = $("<input type='text'>").attr("placeholder", "search")
    .css({
        "width": "120px",
        "height": "24px",
        "position": "relative",
        "top": "50%",
        "left": "24px",
        "margin-top" : "-13px",
        "float": "left",
        "padding-left": "5px",
        "font-size": "12px",
        "font-family": "sans-serif",
        "border-width": "0px",
        "z-index": "2147483646"
    });
    
    $searchBar.on("input", function(){
        if ($searchBar.val() == ""){
            QUICKMAN_CONTENT.standby();
            return;
        }
        search($searchBar.val());
    }).keydown(function(){
        // arrow keys
        if (event.keyCode >= 37 && event.keyCode <= 40){
            event.preventDefault();
            QUICKMAN_RESULTS.hoverElement(event.keyCode, true);
        }
        // Enter
        else if (event.keyCode == 13){
            QUICKMAN_RESULTS.selectElement();
        }
    });

    // add search container
    QUICKMAN.$quickManWindow.append($("<div></div>").css({
        "width": "200px",
        "height": "50px",
        "position": "relative",
        "top": "80px",
        "float": "right",
        "background-color": "#3399CC",
        "z-index": "2147483646"
    })
        // add search button
        .append($("<img src='" +
            chrome.extension.getURL("images/buttons/search.png") + "'>")
            .css({
                "position": "relative",
                "top": "50%",
                "left": "24px",
                "margin-top" : "-13px",
                "float": "left",
                "margin-right": "2px",
                "padding": "2px",
                "border": "1px solid white",
                "cursor": "pointer",
                "z-index": "2147483646"
            }).click(function(){$searchBar.focus();}))
        // add search bar
        .append($searchBar));

    var search = function(needle){
        QUICKMAN_CONTENT.renderMessage("searching",
            QUICKMAN_CONTENT.icons.$searchingIco);
        $searchBar.val(needle);

        //send keyword to background
        chrome.runtime.sendMessage({"needle": needle}, function(results) {
            QUICKMAN_RESULTS.renderResults(results);
        });
    };

    return {
            "$searchBar": $searchBar,
            "search": search
    };
})();
