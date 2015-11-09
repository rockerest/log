define(
    [],
    function(){
        'use strict';
        var Storage = {};

        Storage.set = function( key, value ){
            window.dotlog.storage[ key ] = value;

            return this;
        };

        Storage.get = function( key ){
            return window.dotlog.storage[ key ];
        };

        Storage.del = function( key ){
            delete window.dotlog.storage[ key ];
        };

        return Storage;
    }
);
