var display_content = getURLParameter('content');
var window_width = $(window).width();
var window_height = $(window).height();


function adjustToWindowHeight(target_id){
    $(target_id).css("max-height",window_height);
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}



function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


// For change url not refresh

$(function() {
    $("a[rel='tab']").click(function(e) {
        //code for the link action
        return false;
    });
});

$(function() {
    $("a[rel='tab']").click(function(e) {
        //e.preventDefault();
        /*
        if uncomment the above line, html5 nonsupported browers won't change the url but will display the ajax content;
        if commented, html5 nonsupported browers will reload the page to the specified link.
        */

        //get the link location that was clicked
        pageurl = $(this).attr('href');

        //to change the browser URL to the given link location
        if (pageurl != window.location) {
            window.history.pushState({
                path: pageurl
            }, '', pageurl);
        }

        //to refresh 'info_content'
        display_content = getURLParameter('content');
        $('.left_list').removeClass("active");
        $('.left_list.' + display_content).addClass("active");
        $('.display_content').css("display", "none");
        $('.' + display_content).fadeIn();
        console.log(display_content);

        //stop refreshing to the page given in
        return false;
    });
});

// For Slide window

var pos = 0;
var scroll_bool = true;

function scrollToTarget(target) {
    console.log(pos);
    var current_pos = $(this).scrollTop();
    if (current_pos > pos && scroll_bool) {
        //Scroll Down
        disable_scroll();
        $('html, body').animate({
            scrollTop: $("#" + target).offset().top - 50
        }, 1000, function() {
            enable_scroll();
        });
        scroll_bool = false;
    }
}


// For Timeline View

function hideBlocks(blocks, offset) {
    blocks.each(function() {
        ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
}

function showBlocks(blocks, offset) {
    blocks.each(function() {
        ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
}
