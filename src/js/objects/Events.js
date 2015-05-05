define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Helpers
        "objects/Storage"
    ],
    function(
        Backbone, _,
        Storage
    ){
        "use strict";
        var Vent = _.extend( {}, Backbone.Events );

        Vent.on( "core:data:store", function( map ){
            _( map ).each( function( data, key ){
                Storage.set( key, data );
            } );
        } );

        Vent.on( "core:data:remove", function( keys ){
            _( keys ).each( function( key ){
                Storage.del( key );
            } );
        } );

        Vent.on( "core:data:payload:prime", function( callback ){
            Storage.set( "payload", callback );
        } );

        Vent.on( "core:chrome:navigate", function( href, options ){
            if( options === undefined ){
                options = {};
            }

            if( options.payload ){
                Vent.trigger( "core:data:payload:prime", options.payload );
            }

            window.location = href;
        } );

        return Vent;
    }
);
