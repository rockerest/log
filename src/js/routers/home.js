define(
    [
        // Libraries
        "strap/backbone",
        // Helpers
        "objects/LayoutManager",
        // Dependencies
        "views/home/default", "objects/Router"
    ],
    function(
        Backbone,
        LayoutManager,
        DefaultHomeView, BaseRouter
    ){
        var mod = function(){
            this.name = "home";
        };

        mod.prototype = new BaseRouter();

        mod.prototype.register = function( rtr ){
            var self = this;

            rtr.get( /^\/$|^#$|^#\/$|^\/#\/$/, function(){
                var layout = self.layoutManager.getStandardLayout();

                layout.explore( "content.page.post" ).show( DefaultHomeView );

                self.set({
                    "module": true,
                    "title": "Home"
                });
            });
        };

        return new mod();
    }
);
