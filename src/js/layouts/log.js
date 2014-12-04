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
        var LogLayout = function(){
            var regions = {
                    "content":  "#content"
                },
                presets = {
                    "content":{
                        "object": MainLayout
                    }
                },
                el = "body",
                _layout = new Ribcage();

            _layout
                .addRegions( regions )
                .setTemplate( tmpl )
                .addPresets( presets )
                .setElement( el );

            return _layout;
        };

        return LogLayout;
    }
);
