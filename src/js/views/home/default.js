define(
    [
        // Libraries
        "strap/backbone", "underscore", "moment",
        // collections
        "collections/posts",
        // posts
        "json!data/posts.json"
    ],
    function(
        Backbone, _, Moment,
        PostCollection,
        posts
    ){
        var DefaultHomeView = Backbone.View.extend({
            "render": function(){
                this.$el.html( this.template({
                    "moment": Moment
                }));
                return this;
            },

            "initialize": function(){
                var postList = new PostCollection( posts );

                this.post = postList.at( 0 );
                this.template = _.template( this.post.getPost() );

                this.render();
            }
        });

        return DefaultHomeView;
    }
);
