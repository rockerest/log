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

        vent.on( "ux:start", function( passedEventData ){
            postUi.startUx( passedEventData.post );
        });
        
        vent.on( "click:post:comments:load", function( passedEventData ){
            postUi.loadComments( passedEventData.post );
        });

        window.dotlog.channels.singlePost = vent;
        return vent;
    }
);
