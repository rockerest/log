define(
    function(){
        "use strict";
        var Utilities = {};

        Utilities.extend = function( parent, child ){
            var childPrototype = child.prototype,
                key;

            child.prototype = Object.create( parent.prototype );
            for( key in childPrototype ){
                child.prototype[ key ] = childPrototype[ key ];
            }

            child.prototype.constructor = child;

            Object.defineProperty( child.prototype, "constructor", {
                enumerable: false,
                value: child
            } );
        };

        Utilities.warn = function( message ){
            if( console && console.warn ){
                console.warn( message );
            }
        };

        Utilities.error = function( message ){
            if( console && console.error ){
                console.error( message );
            }
        };

        Utilities.setTitle = function( name ){
            document.title = name + " :: Log";
        };

        return Utilities;
    }
);
