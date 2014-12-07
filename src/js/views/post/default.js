define(
    [
        // Libraries
        "strap/backbone", "underscore", "moment",
        // Dependencies
        "text!vw/posts/default.html"
    ],
    function(
        Backbone, _, Moment,
        tmpl
    ){
        var DefaultErrorView = Backbone.View.extend({
            "template": _.template( tmpl ),

            "tagName": "div",
            "className": "post",

            "events": {
                "click header": function( e ){
                    console.log( this.meta );
                }
            },

            "render": function(){
                this.$el.html( this.template({
                    "meta": this.meta,
                    "post": this.post
                }) );

                this.delegateEvents();

                return this;
            },

            "initialize": function( Post ){
                var meta = Post.getInformation(),
                    content = Post.getPost();

                meta.pubMoment = Post.getPublishedMoment();

                this.meta = meta;
                this.post = content;

                this.render();
            }
        });

        return DefaultErrorView;
    }
);
