define(
    [
        "underscore",
        "objects/LayoutManager"
    ],
    function(
        _,
        LayoutManager
    ){
        var BaseRouter = function(){
            this.layoutManager = LayoutManager;
        };

        BaseRouter.prototype.set = function( options ){
            var _options = _( options );

            if( _options.has( "title" ) ){
                this.layoutManager.setLayoutTitle( options.title );
            }
        };

        BaseRouter.prototype.getName = function(){
            return this.name;
        };

        return BaseRouter;
    }
);
