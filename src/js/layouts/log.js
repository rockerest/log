define(
    [
        // Libraries
        "strap/backbone", "underscore", "ribcage",
        // Helpers
        "utilities",
        // Dependencies
        "text!lyt/log.html", "layouts/main"
    ],
    function(
        Backbone, _, Ribcage,
        Utilities,
        tmpl, MainLayout
    ){
        "use strict";
        var LogLayout = function(){
            var regions = {
                "content": "#content"
            };
            var presets = {
                "content": {
                    "object": MainLayout
                }
            };
            var el = "body";
            var internalLayout = new Ribcage();

            internalLayout
                .addRegions( regions )
                .setTemplate( tmpl )
                .addPresets( presets )
                .setElement( el );

            return internalLayout;
        };

        return LogLayout;
    }
);
