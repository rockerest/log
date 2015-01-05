define(
    [
        // Libraries
        "strap/backbone",
        // Dependencies
        "interface/home/default",
    ],
    function(
        Backbone,
        HomeUi
    ){
        var vent = window.dotlog.channels.home || _.extend( {}, Backbone.Events ),
            homeUi = new HomeUi();
        
        vent.on( "home:ux:start", function( passedEventData ){
            homeUi.startUx();
        });
        
        window.dotlog.channels.home = vent;
        return vent;
    }
);
