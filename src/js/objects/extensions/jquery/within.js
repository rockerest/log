define(
    [],
    function(){
        "use strict";
        return {
            "extend": function( jQuery ){
                jQuery.extend( jQuery.fn, {
                    "within": function( pSelector ){
                        return this.filter( function(){
                            return jQuery( this ).closest( pSelector ).length;
                        } );
                    }
                } );

                return jQuery;
            }
        };
    }
);
