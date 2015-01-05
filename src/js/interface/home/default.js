define(
    [
        "highlight",
        "interface/ui"
    ],
    function(
        Highlight,
        Ui
    ){
        var HomeUi = function(){};
        
        HomeUi.prototype = new Ui();
        
        HomeUi.prototype.startUx = function( Post ){
            this.$( "div.post article div.body pre code" ).each( function(){
                Highlight.highlightBlock( this );
            });
        };
        
        return HomeUi;
    }
);
