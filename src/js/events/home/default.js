define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Dependencies
        "interface/home/default"
    ],
    function(
        Backbone, _,
        HomeUi
    ){
        "use strict";
        var vent = window.dotlog.channels.home || _.extend( {}, Backbone.Events ),
            homeUi = new HomeUi();

        vent.on( "home:ux:start", function(){
            homeUi.startUx();
        } );

        window.dotlog.channels.home = vent;
        return vent;
    }
);
