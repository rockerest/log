define(
    [
        'jquery',
        'objects/extensions/jquery/within', 'objects/extensions/jquery/isWithin'
    ],
    function(
        jQuery,
        within, isWithin
    ){
        'use strict';

        jQuery = within.extend( jQuery );
        jQuery = isWithin.extend( jQuery );

        return jQuery;
    }
);
