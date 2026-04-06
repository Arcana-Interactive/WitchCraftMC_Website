/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        var target = $anchor.attr('href');
        var $target = $(target);
        if ($target.length) {
            $('html, body').stop(true, true).animate({
                scrollTop: $target.offset().top
            }, 1500, 'easeInOutExpo');
        }
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    if ($('.navbar-toggle').is(':visible')) {
        $('#bs-example-navbar-collapse-1').collapse('hide');
    }
});

// Fix mobile hamburger toggle - take over from Bootstrap to ensure open/close both work
$(document).ready(function() {
    $('.navbar-toggle').on('click', function(e) {
        // Stop Bootstrap's document-delegated handler from double-firing
        e.stopPropagation();
        var $navCollapse = $('#bs-example-navbar-collapse-1');
        $navCollapse.collapse('toggle');
    });

    // Close menu when tapping outside the navbar on mobile
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('#bs-example-navbar-collapse-1').collapse('hide');
        }
    });
});
