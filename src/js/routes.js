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
        "use strict";
        var Routes = {},
            log = new Sammy();

        Routes.startup = function(){
            var loc = window.location;
            var startedAt = loc.pathname + loc.search + loc.hash;
            var routers = [
                LogRouter,
                ErrorRouter,
                HomeRouter,
                PostRouter
            ];
            var count = 0;

            _( routers ).each( function( r ){
                ++count;
                r.register( log );

                if( count === routers.length ){
                    log.run( startedAt );
                }
            } );
        };

        return Routes;
    }
);
