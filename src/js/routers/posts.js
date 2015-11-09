define(
    [
        // Libraries
        'strap/backbone',
        // Helpers
        'objects/Router',
        // Dependencies
        'views/post/single'
    ],
    function(
        Backbone,
        BaseRouter,
        SinglePostView
    ){
        'use strict';
        var Mod = function(){};

        Mod.prototype = new BaseRouter();

        Mod.prototype.register = function( rtr ){
            var self = this;

            rtr.get( /post\/((?:\w|-)+)\/?$/, function(){
                var layout = self.layoutManager.getStandardLayout();

                layout.explore( 'content.page' ).show(
                    SinglePostView,
                    {
                        'title': this.params.splat[ 0 ],
                        'route': rtr.last_location[ 1 ]
                    }
                );
            } );
        };

        return new Mod();
    }
);
