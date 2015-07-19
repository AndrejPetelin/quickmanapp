var QUICKMAN_HOST = (function(){
    var $hostBox = $("<div id='quickman_host_box'></div>")
    .attr("style", QUICKMAN.$quickManWindow.attr("style")).css({
        "width": "650px",
        "opacity": "100",
        "z-index": "2147483646"
    });
    QUICKMAN.$quickManWindow.append($hostBox);

    var $root = $($hostBox.get(0).createShadowRoot());

    return $root;
})();
