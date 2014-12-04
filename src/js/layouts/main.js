define(
    [
        // Libraries
        "strap/backbone", "underscore", "ribcage",
        // Helpers
        "utilities",
        // Dependencies
        "text!lyt/main.html"
    ],
    function(
        Backbone, _, Ribcage,
        Utilities,
        tmpl
    ){
        var MainLayout = function( options ){
            var regions = {
                    "page":         "main"
                },
                _layout = new Ribcage();

            _layout
                .addRegions( regions )
                .setTemplate( tmpl );

            return _layout;
        };

        return MainLayout;
    }
);
