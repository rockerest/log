define(
    [
        'highlight',
        'interface/ui'
    ],
    function(
        Highlight,
        Ui
    ){
        'use strict';
        var HomeUi = function(){};

        HomeUi.prototype = new Ui();

        HomeUi.prototype.startUx = function(){
            this.$( 'div.post article div.body pre code' ).each( function(){
                Highlight.highlightBlock( this );
            } );
        };

        return HomeUi;
    }
);
