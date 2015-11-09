define(
    [
        // Dependencies
        'objects/EventManager', 'interface/post/single'
    ],
    function(
        EventManager, SinglePostUi
    ){
        'use strict';
        var postUi = new SinglePostUi();

        return EventManager.listen( 'singlePost', {
            'ux:start': function(){
                postUi.startUx();
            },
            'click:post:footnote:signal': function( eventData ){
                postUi.scrollTo( postUi.getFootnoteSignalledBy( eventData.link ) );
            },
            'click:post:comments:load': function( eventData ){
                postUi.loadComments( eventData.post );
            }
        } );
    }
);
