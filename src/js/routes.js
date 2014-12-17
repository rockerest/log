define(
    [
        // Libraries
        "sammy", "underscore",
        // Routers
        "routers/log", "routers/home", "routers/posts",
        // Error Router
        "routers/errors"
    ],
    function(
        Sammy, _,
        LogRouter, HomeRouter, PostRouter,
        ErrorRouter
    ){
        var Routes = {},
            log = new Sammy();

        Routes.startup = function(){
            var routers = [
                LogRouter,
                HomeRouter,
                PostRouter,
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
