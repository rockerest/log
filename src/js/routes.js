define(
    [
        // Libraries
        'sammy', 'underscore',
        // Routers
        'routers/log', 'routers/home', 'routers/posts',
        // Error Router
        'routers/errors'
    ],
    function(
        Sammy, _,
        LogRouter, HomeRouter, PostRouter,
        ErrorRouter
    ){
        'use strict';
        var Routes = {};
        var router = new Sammy();

        window.dotlog.router = router;

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
                r.register( router );

                if( count === routers.length ){
                    router.run( startedAt );
                }
            } );
        };

        return Routes;
    }
);
