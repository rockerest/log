define(
    [
        'underscore',
        'objects/LayoutManager'
    ],
    function(
        _,
        LayoutManager
    ){
        'use strict';
        var BaseRouter = function(){
            this.layoutManager = LayoutManager;
        };

        BaseRouter.prototype.set = function( options ){
            var opts = _( options );

            if( opts.has( 'title' ) ){
                this.layoutManager.setLayoutTitle( options.title );
            }
        };

        BaseRouter.prototype.getName = function(){
            return this.name;
        };

        return BaseRouter;
    }
);
