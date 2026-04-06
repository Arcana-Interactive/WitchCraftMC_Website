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

// Fix mobile hamburger toggle - bypass Bootstrap's collapse API entirely for reliability
$(document).ready(function() {
    // Prevent Bootstrap's own data-toggle handler from conflicting
    $('[data-toggle="collapse"][data-target="#bs-example-navbar-collapse-1"]').removeAttr('data-toggle');

    $('.navbar-toggle').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#bs-example-navbar-collapse-1').toggleClass('in');
    });

    // Close menu when tapping/clicking outside the navbar on mobile
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('#bs-example-navbar-collapse-1').removeClass('in');
        }
    });

    // Fix navbar brand link: scroll to top without pushing /#page-top into the URL
    $('.navbar-brand').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
        }
        $('html, body').stop(true, true).animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
    });
});
