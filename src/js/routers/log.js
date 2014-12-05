define(
    [
        "objects/Storage"
    ],
    function(
        Storage
    ){
        var mod = {};

        mod.register = function( rtr ){
            rtr.notFound = function(){
                location.href = "#/error/404/" + this.last_location[1];
            };

            rtr.after( function(){
                var payload = Storage.get( "payload" );

                if( typeof payload === "function" ){
                    payload();

                    Storage.del( "payload" );
                }
            });
        };

        return mod;
    }
);
