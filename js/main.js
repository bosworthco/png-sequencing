 var resizeSequence = function () {
    var stageXmax = 898;
    var stageYmax = 736;

    var vp = $("#experiment");
    var viewportX = Math.min(stageXmax, vp.innerWidth());
    var viewportY = Math.min(stageYmax, vp.innerHeight());

    var stage = $(".js-sequence");
    var frames = $(".jsMovieFrame");

    var stageX = stage.outerWidth();
    var stageY = stage.outerHeight();

    var stageAspect = stageX / stageY;
    var viewportAspect = viewportX / viewportY;

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
        backgroundSize: "auto 100%"
    });
};

$(document).ready(function(){

    // Settings
    $('#experiment .js-sequence').jsMovie({
        sequence:       "loop_####.png",    // the #### will be replaced with 0001,0002,0003,...
        folder:         "sequence/",        // this is the path where the script can find the image sequence
        fps:            16,                 // float value that represents the frames per second rate
        from:           1,                  // the #### will start to replace with 0001
        to:             18,                 // the #### will start to replace with 0018
        showPreLoader:  false,              // we don't want to see a preloader animation
        playOnLoad:     true,               // have the movie play automatically after the images have been loaded
    });
    
    // Play the sequence on repeat
    $('#experiment .js-sequence').jsMovie("play", 1, 18, true);
    

    // Set the sizing
    resizeSequence();
});





$(window).on("resize orientationchange", function() {
   resizeSequence();
});