define(
    [
        // Libraries
        "jquery", "cookies",
        // Models & Collections
        "models/user"
    ],
    function(
        $, Cookies,
        UserModel
    ){
        var UserManager = {};

        UserManager.wrap = function( json ){
            return new UserModel( json, {"parse": true} );
        };

        UserManager.getLoggedInUser = function(){
            var user = Cookies( "user" ) || "{}";

            return UserManager.wrap( JSON.parse( user ) );
        };

        UserManager.setLoggedInUser = function( userModel ){
            Cookies( "user", JSON.stringify( userModel ) );
        };

        return UserManager;
    }
);
