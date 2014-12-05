define(
    [
        // Libraries
        "strap/backbone", "underscore", "ribcage",
        // Helpers
        "utilities",
        // Dependencies
        "text!lyt/post.html"
    ],
    function(
        Backbone, _, Ribcage,
        Utilities,
        tmpl
    ){
        var PostLayout = function( options ){
            var regions = {
                    "post":         "article"
                },
                _layout = new Ribcage();

            _layout
                .addRegions( regions )
                .setTemplate( tmpl );

            return _layout;
        };

        return PostLayout;
    }
);
