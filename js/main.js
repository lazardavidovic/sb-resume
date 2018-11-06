(function ($) {
    "use strict"; // Use strict mode

    //Include HTML files
    function includeHTMLFiles() {
        var includes = $('[data-include]');
        jQuery.each(includes, function () {
            var file = 'pages/' + $(this).data('include') + '.html';
            $(this).load(file);
        });

        return $.ajax();
    }

    // Main flow
    $(includeHTMLFiles());

})(jQuery); // End of use strict
