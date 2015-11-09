define(
    [
        'objects/RuleBreaker'
    ],
    function(
        RuleBreaker
    ){
        'use strict';
        var Utilities = {};

        Utilities.extend = function( parent, child ){
            var childPrototype = child.prototype;
            var key;

            child.prototype = Object.create( parent.prototype );
            for( key in childPrototype ){
                child.prototype[ key ] = childPrototype[ key ];
            }

            child.prototype.constructor = child;

            Object.defineProperty( child.prototype, 'constructor', {
                'enumerable': false,
                'value': child
            } );
        };

        Utilities.warn = function( message ){
            RuleBreaker.console.warn( message );
        };

        Utilities.error = function( message ){
            RuleBreaker.console.error( message );
        };

        Utilities.setTitle = function( name ){
            document.title = name + ' :: Log';
        };

        return Utilities;
    }
);
