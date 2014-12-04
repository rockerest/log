define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Helpers
        "objects/Security",
        // Dependencies
        "text!vw/login/authenticate.html",
        // Events
        "events/login/authenticate"
    ],
    function(
        Backbone, _,
        Security,
        tmpl,
        vent
    ){
        var LoginAuthenticateView = Backbone.View.extend({
            "template": _.template( tmpl ),

            "events": {
                "blur input": function( e ){
                    vent.trigger( "blur:field:authenticate", { "input": e.target } );
                },
                "submit form": function( e ){
                    vent.trigger( "submit:form:authenticate", {"form": e.target} );
                    return false;
                },
                "click .toggle": function( e ){
                    vent.trigger( "click:toggle:remember", { "clicked": e.target } );
                }
            },

            "render": function( data ){
                this.$el.html( this.template({
                    "forward": data.fwd,
                    "remember": Security.recall()
                }) );

                vent.trigger( "subscription:expiration:verify", { "expiration": data.expiration } );

                return this;
            },

            "initialize": function( data ){
                this.render( data );
            }
        });

        return LoginAuthenticateView;
    }
);
