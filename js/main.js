(function ($) {
    "use strict"; // Start of use strict

    //Include HTML files
    function includeHTMLFiles() {
        var includes = $('[data-include]');
        jQuery.each(includes, function () {
            var file = $(this).data('include') + '.html';
            $(this).load(file);
        });

        return $.ajax();
    }

    // Prevent open links start with '#'
    function preventOpenLinks() {
        $('.prevent-open-links').click(function (e) {
            e.preventDefault();

            var pageRef = $(this).attr("href");

            if (pageRef[0] != '#') {
                window.location.href = pageRef;
            } else {
                // 
            }
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

    function processingLanguage() {
        var activeLanguages = ['en', 'sr'];
        var languageParameter = getLanguageParamater();
        var languageCookie = readLanguageCookie();


        if (languageParameter && $.inArray(languageParameter, activeLanguages) != -1) {
            setLanguage(languageParameter);
        }
        else
            if (languageCookie && $.inArray(languageCookie, activeLanguages) != -1) {
                setLanguage(languageCookie);
            }
            else {
                setLanguage('en');
                window.location.reload();
            }

        function getLanguageParamater() {
            var regexS = "[\\?&]lang=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.href);
            if (results)
                return results[1];
            else
                return null;
        }

        function readLanguageCookie() {
            return Cookies.get('lang');
        }

        return $.ajax();
    }

    function showFullLoadedPage() {
        $("html")[0].style.visibility = "visible";

        return $.ajax();
    }

    // Main flow
    $(includeHTMLFiles().done(function () {
        preventOpenLinks().done(function () {
            processingLanguage().done(function () {
                enableSmoothScroll().done(function () {
                    closeResponsiveMenu().done(function () {
                        activateScrollspy().done(function () {
                            activateImageModal().done(function () {
                                showFullLoadedPage()
                            })
                        })
                    })
                })
            })
        })
    })
    );

})(jQuery); // End of use strict

function setLanguage(language) {

    if (window.history.replaceState) {
        // Prevents browser from storing history with each change
        window.history.replaceState({}, {}, "?lang=" + language);
    }

    setLanguageCookie(language);
    processingLanguageAttributes(language);

    function setLanguageCookie(language) {
        Cookies.set('lang', language);
    }

    function processingLanguageAttributes(language) {
        $("[lang]").each(function () {
            if ($(this).attr("lang") == language) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }
}
