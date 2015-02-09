define(
    [
        // Libraries
        "strap/backbone",
        // Dependencies
        "interface/post/single",
    ],
    function(
        Backbone,
        SinglePostUi
    ){
        var vent = window.dotlog.channels.singlePost || _.extend( {}, Backbone.Events ),
            postUi = new SinglePostUi();

        vent.on( "ux:start", function( eventData ){
            postUi.startUx( eventData.post );
        });
        
        vent.on( "click:post:footnote:signal", function( eventData ){
            postUi.scrollTo( postUi.getFootnoteSignalledBy( eventData.link ) );
        });
        
        vent.on( "click:post:comments:load", function( eventData ){
            postUi.loadComments( eventData.post );
        });

        window.dotlog.channels.singlePost = vent;
        return vent;
    }
);
