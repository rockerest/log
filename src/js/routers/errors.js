define(
    [
        // Libraries
        'strap/backbone',
        // Helpers
        'objects/Router',
        // Dependencies
        'views/error/default'
    ],
    function(
        Backbone,
        BaseRouter,
        ErrorView
    ){
        'use strict';
        var Mod = function(){};

        Mod.prototype = new BaseRouter();

        Mod.prototype.register = function( rtr ){
            var self = this;

            rtr.get( /error\/(\d+)\/(.+)$/i, function(){
                var layout = self.layoutManager.getStandardLayout();

                layout.explore( 'content.page' ).show(
                    ErrorView,
                    {
                        'error': this.params.splat[ 0 ],
                        'route': this.params.splat[ 1 ]
                    }
                );

                self.set( {
                    'title': 'An Error - ' + this.params.splat[ 0 ]
                } );
            } );
        };

        return new Mod();
    }
);
