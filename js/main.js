
// var site = $(window),
//     siteX = site.width(),
//     siteY = site.height();

// var strips = $(".strip"),
//     stripsN = strips.length;


var resizeSequence = function () {
    var stageXmax = 740,
        stageYmax = 900;

    var vp = $("#experiment"),
        viewportX = Math.min(stageXmax, vp.innerWidth()),
        viewportY = Math.min(stageYmax, vp.innerHeight());

    var stage = $(".js-sequence"),
        frames = $(".jsMovieFrame");

    var stageX = stage.outerWidth(),
        stageY = stage.outerHeight();

    var stageAspect = stageX / stageY,
        viewportAspect = viewportX / viewportY;

    if (stageAspect > viewportAspect) {
        newWidth = viewportX;
        newHeight = newWidth / stageAspect;
    } else {
        newHeight = viewportY;
        newWidth = newHeight * stageAspect;
    }

    stage.css({
        width:      newWidth,
        height:     newHeight,
        marginLeft: newWidth * -0.5
    });

    frames.css({
        width:          newWidth,
        height:         newHeight,
        backgroundSize: "contain",
        backgroundPosition: "50% 50%"
    });
};



var positionStrips = function () {
    var site = $(window),
    siteX = site.width(),
    siteY = site.height();

var strips = $(".strip"),
    stripsN = strips.length;

    var xPos = 0,
        stripW = 0;

    // console.log("there are " + stripsN + " strips");
    // console.log("width of each will be " + Math.round(siteX / stripsN) + "px");

    strips.each(function(i, e) {
        stripW = Math.round(siteX / stripsN + 1);
        $(e).css({
            "clip": "rect("+siteY+"px "+stripW+"px "+siteY+"px 0px)",
            width: stripW,
            left: xPos
        });
        xPos += stripW;
    });
};



var toggleStrips = function(e) {
    // var site = $(window),
    //     siteX = site.width(),
    //     siteY = site.height();

    

    

    $(".js-strip-toggle").on("click touchstart", function() {

        var site = $(window),
        siteX = site.width(),
        siteY = site.height();
var strips = $(".strip"),
        stripsN = strips.length;

    var stripParent = $(".js-transition-overlay"),
        stripEl = stripParent.find(".strip"),
        stripW = Math.round(siteX / stripsN + 1);
        function randsort(c) {
            var o = new Array();
            for (var i = 0; i < c; i++) {
                var n = Math.floor(Math.random()*c);
                if( jQuery.inArray(n, o) > 0 ) --i;
                else o.push(n);
            }
            return o;
        }

        var e = $(".strip"); // The elements we're searching
        var c = e.length; // Total number of those elements
        var r = randsort(c); // an array of the element indices in random order

        if(stripParent.attr("data-state") == "inactive") {
            
            stripParent.attr("data-state", "active");

            stripEl.each(function(i) {
                var e = $(this);
                setTimeout(function(){
                    e.css({"clip": "rect(0px "+stripW+"px "+siteY+"px 0px)", visibility: "inherit"});
                }, r[i]*10);
            });
        } else {
            stripParent.attr("data-state", "inactive");

            stripEl.each(function(i) {
                var e = $(this);
                setTimeout(function(){
                    e.css({"clip": "rect("+siteY+"px "+stripW+"px "+siteY+"px 0px)"});
                }, r[i]*10);
            });
        }

    });

}


$(document).ready(function(){

    // Settings
    $('#experiment .js-sequence').jsMovie({
        sequence:       "loop_####.png",    // the #### will be replaced with 0001,0002,0003,...
        folder:         "sequence/",        // this is the path where the script can find the image sequence
        fps:            24,                 // float value that represents the frames per second rate
        from:           1,                  // the #### will start to replace with 0001
        to:             31,                 // the #### will start to replace with 0018
        showPreLoader:  false,              // we don't want to see a preloader animation
        playOnLoad:     true,               // have the movie play automatically after the images have been loaded
    });
    
    // Play the sequence on repeat
    $('#experiment .js-sequence').jsMovie("play", 1, 31, true);
    
    // Set the sizing
    resizeSequence();
    positionStrips();

    // Toggle animation
    toggleStrips();

});



$(window).on("resize orientationchange", function() {
   resizeSequence();
   //toggleStrips();
   positionStrips();
   
});