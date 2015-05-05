define(
    [
        // Dependencies
        "objects/EventManager", "interface/home/default"
    ],
    function(
        EventManager, HomeUi
    ){
        "use strict";
        var homeUi = new HomeUi();

        return EventManager.listen( "home", {
            "home:ux:start": function(){
                homeUi.startUx();
            }
        } );
    }
);
