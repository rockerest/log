define(
    [
    // Libraries
    "strap/backbone",
    // Helpers
    "objects/Router", "objects/Security",
    // layouts & views
    "layouts/login/default", "views/login/authenticate"
    ],
    function(
        Backbone,
        BaseRouter, Security,
        LoginLayout, AuthenticateView
    ){
        var mod = function(){};

        mod.prototype = new BaseRouter();

        mod.prototype.register = function( rtr ){
            var self = this,
                login = /^\/#\/login(?:(?:\/)?(.*))?/;

            rtr.before({
                "only": {
                    "path": [ login ]
                }
            }, function( ctx ){
                if( Security.isAuthenticated() ){
                    ctx.redirect( "#/" );
                    return false;
                }
            });

            rtr.get( login, function(){
                var layout = self.layoutManager.getStandardLayout();

                layout.explore( "content.page" ).show( LoginLayout );
                layout.explore( "content.page.authentication" ).show(
                    AuthenticateView,
                    {
                        "fwd": this.params.splat[0]
                    }
                );

                self.set({
                    "title": "Login"
                });
            });
        };

        return new mod();
    }
);
