define(
    [
        // Libraries
        "underscore",
        // Helpers
        "objects/Events"
    ],
    function(
        _,
        Events
    ){
        var vent = window.dotlog.channels.authenticate || _.extend( {}, Events );

        window.dotlog.channels.authenticate = vent;
        return vent;
    }
);
