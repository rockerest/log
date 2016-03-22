define(
    [
        // Libraries
        "strap/backbone",
        // Helpers
        "objects/LayoutManager",
        // Dependencies
        "objects/Router",
        // Layouts & Views
        "views/home/default"
    ],
    function(
        Backbone,
        LayoutManager,
        BaseRouter,
        DefaultHomeView
    ){
        "use strict";
        var Mod = function(){
            this.name = "home";
        };

        Mod.prototype = new BaseRouter();

        Mod.prototype.register = function( rtr ){
            var self = this;

            rtr.get( /^\/$/, function(){
                var layout = self.layoutManager.getStandardLayout();

                layout.explore( "content.page" ).show( DefaultHomeView );

                self.set( {
                    "title": "Home"
                } );
            } );
        };

        return new Mod();
    }
);
