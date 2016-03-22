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
        "use strict";
        var MainLayout = function(){
            var regions = {
                "page": "main"
            };
            var internalLayout = new Ribcage();

            internalLayout
                .addRegions( regions )
                .setTemplate( tmpl );

            return internalLayout;
        };

        return MainLayout;
    }
);
