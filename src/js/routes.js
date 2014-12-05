define(
    [
        // Libraries
        "sammy", "underscore",
        // Routers
        "routers/log", "routers/home",
        // Error Router
        "routers/errors"
    ],
    function(
        Sammy, _,
        LogRouter, HomeRouter,
        ErrorRouter
    ){
        var Routes = {},
            log = new Sammy();

        Routes.startup = function(){
            var routers = [
                LogRouter,
                HomeRouter,
                ErrorRouter
            ],
            count = 0;

            _( routers ).each( function( r, i ){
                ++count;
                r.register( log );

                if( count === routers.length ){
                    log.run( "#/" );
                }
            });
        };

        return Routes;
    }
);
