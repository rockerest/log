define(
    [
        // Libraries
        "strap/backbone", "underscore", "ribcage",
        // Helpers
        "utilities",
        // Dependencies
        "text!lyt/login/default.html"
    ],
    function(
        Backbone, _, Ribcage,
        Utilities,
        tmpl
    ){
        var DefaultLoginLayout = function( options ){
            var regions = {
                    "authentication":   "div > div:first"
                },
                _layout = new Ribcage();

            _layout
                .addRegions( regions )
                .setTemplate( tmpl );

            return _layout;
        };

        return DefaultLoginLayout;
    }
);
