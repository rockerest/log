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

        window.dotlog.channels.singlePost = vent;
        return vent;
    }
);
