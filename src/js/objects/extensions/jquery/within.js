define(
    [],
    function(){
        return {
            "extend": function( jQuery ){
                jQuery.extend( jQuery.fn, {
                    within: function( pSelector ) {
                        return this.filter(function(){
                            return $(this).closest( pSelector ).length;
                        });
                    }
                });

                return jQuery;
            }
        };
    }
);
