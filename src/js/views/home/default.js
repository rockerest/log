define(
    [
        // Libraries
        "strap/backbone", "underscore", "moment",
        // collections
        "collections/posts",
        // posts
        "json!data/posts.json",
        // Views
        "views/post/default"
    ],
    function(
        Backbone, _, Moment,
        PostCollection,
        posts,
        PostView
    ){
        var DefaultHomeView = Backbone.View.extend({
            "render": function(){
                var self = this,
                    cont;

                _( this.posts ).each( function( post ){
                    post.render();

                    self.$el.append( post.$el );
                });

                return this;
            },

            "initialize": function(){
                var postList = new PostCollection( posts ),
                    Posts = [];

                postList.each( function( post ){
                    Posts.push( new PostView( post ) );
                });

                this.posts = Posts;

                this.render();
            }
        });

        return DefaultHomeView;
    }
);
