define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Dependencies
        "text!vw/errors/default.html"
    ],
    function(
        Backbone, _,
        tmpl
    ){
        "use strict";
        var DefaultErrorView = Backbone.View.extend( {
            "template": _.template( tmpl ),

            "render": function(){
                this.$el.html( this.template( { "error": this.error, "route": this.route } ) );
                return this;
            },

            "initialize": function( data ){
                this.error = data.error;
                this.route = data.route;
                this.render();
            }
        } );

        return DefaultErrorView;
    }
);
