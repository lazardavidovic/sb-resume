(function ($) {
    "use strict"; // Start of use strict

    //Include HTML section files
    function includeHTMLSectionFiles() {
        var includes = $('[data-include]');
        jQuery.each(includes, function () {
            var file = 'pages/' + $(this).data('include') + '.html';
            $(this).load(file);
        });

        return $.ajax();
    }

    // Smooth scrolling using jQuery easing
    function enableSmoothScroll() {
        var links = $('a.js-scroll-trigger[href*="#"]:not([href="#"])');
        links.click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top)
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });

        return $.ajax();
    }


    // Closes responsive menu when a scroll trigger link is clicked
    function closeResponsiveMenu() {
        $('.js-scroll-trigger').click(function () {
            $('.navbar-collapse').collapse('hide');
        });

        return $.ajax();
    }

    // Activate scrollspy to add active class to navbar items on scroll
    function activateScrollspy() {
        $('body').scrollspy({
            target: '#sideNavBar'
        });

        return $.ajax();
    }

    function activateImageModal() {
        $("#pop").on("click", function () {
            $('#imagepreview').attr('src', $('#imageresource').attr('src'));
            $('#imagemodal').modal('show');
        });

        return $.ajax();
    }

    // Main flow
    $(includeHTMLSectionFiles()
        .done(function () {
            enableSmoothScroll().done(function () {
                closeResponsiveMenu().done(function () {
                    activateScrollspy().done(function () {
                        activateImageModal()
                    })
                })
            })
        })
    );

})(jQuery); // End of use strict
