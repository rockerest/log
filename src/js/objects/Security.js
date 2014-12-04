define(
    ["cookies", "objects/UserManager"],
    function( Cookies, UserManager ){
        var Security = {};

        Security.isAuthenticated = function(){
            if( Cookies( "token" ) ){
                return true;
            }
            else{
                return false;
            }
        };

        Security.getLoggedInUser = function(){
            if( Security.isAuthenticated() ){
                return UserManager.getLoggedInUser();
            }
        };

        Security.getToken = function(){
            return Cookies( "token" ) || "";
        };

        Security.getRefreshToken = function(){
            return Cookies( "refreshToken" ) || "";
        };

        Security.setAuthentication = function( tokens ){
            Security.setToken( tokens.auth.token, tokens.auth.expires );
            Security.setRefreshToken( tokens.refresh.token, tokens.refresh.expires );
        };

        Security.setToken = function( token, expires ){
            Cookies( "token", token, {"expires": expires || 600 } );
        };

        Security.setRefreshToken = function( token, expires ){
            Cookies( "refreshToken", token, {"expires": expires || 600 } );
        };

        Security.logout = function(){
            Cookies.expire( "token" );
            Cookies.expire( "refreshToken" );
            Cookies.expire( "user" );
        };

        Security.remember = function( username ){
            Cookies( "remember", username );
        };

        Security.recall = function(){
            return Cookies( "remember" );
        };

        Security.forget = function(){
            Cookies.expire( "remember" );
        };

        return Security;
    }
);
