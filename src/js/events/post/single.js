define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Dependencies
        "interface/post/single"
    ],
    function(
        Backbone, _,
        SinglePostUi
    ){
        "use strict";
        var vent = window.dotlog.channels.singlePost || _.extend( {}, Backbone.Events ),
            postUi = new SinglePostUi();

        vent.on( "ux:start", function(){
            postUi.startUx();
        } );

        vent.on( "click:post:footnote:signal", function( eventData ){
            postUi.scrollTo( postUi.getFootnoteSignalledBy( eventData.link ) );
        } );

        vent.on( "click:post:comments:load", function( eventData ){
            postUi.loadComments( eventData.post );
        } );

        window.dotlog.channels.singlePost = vent;
        return vent;
    }
);
