var QUICKMAN_CONTAINER = (function(){
    /* create main box */
    var $container = $("<div id='main_box'></div>").attr("class",
        "white_background bordered");
    QUICKMAN_HOST.append($container);

    // load css
    $.ajax(chrome.extension.getURL("css/content.css"), {
            success: function(css){
                QUICKMAN_HOST.prepend($("<style>"+ css + "</style>"));
            }
    });

    return $container;
}());
