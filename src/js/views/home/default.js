define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Dependencies
        "text!vw/home/default.html",
    ],
    function(
        Backbone, _,
        tmpl
    ){
        var DefaultHomeView = Backbone.View.extend({
            "template": _.template( tmpl ),

            "render": function(){
                this.$el.html( this.template() );
                return this;
            },

            "initialize": function(){
                this.render();
            }
        });

        return DefaultHomeView;
    }
);
