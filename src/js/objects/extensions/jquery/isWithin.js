define(
    [],
    function(){
        "use strict";
        return {
            "extend": function( jQuery ){
                jQuery.extend( jQuery.fn, {
                    "isWithin": function( pSelector ){
                        return !!this.filter( function(){
                            return jQuery( this ).closest( pSelector ).length;
                        } ).length;
                    }
                } );

                return jQuery;
            }
        };
    }
);
