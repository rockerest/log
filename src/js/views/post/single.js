define(
    [
        // Libraries
        "strap/backbone", "underscore", "moment",
        // collections
        "collections/posts",
        // posts
        "json!data/posts.json",
        // Views
        "views/post/default",
        // Helpers
        "utilities"
    ],
    function(
        Backbone, _, Moment,
        PostCollection,
        posts,
        PostView,
        Utilities
    ){
        var SinglePostView = Backbone.View.extend({
            "render": function(){
                Utilities.setTitle( this.post.getInformation().title );

                this.view.render();
                this.$el.append( this.view.$el );

                return this;
            },

            "initialize": function( options ){
                var postList = new PostCollection( posts ),
                    identifiedPost = postList.filter( function( post ){
                        return post.getInformation().safeTitle === options.title;
                    });

                if( identifiedPost.length === 1 ){
                    this.post = identifiedPost[0];
                    this.view = new PostView( identifiedPost[0] );
                    this.render();
                }
                else{
                    location.href = "#/error/404/" + options.route;
                    return false;
                }
            }
        });

        return SinglePostView;
    }
);
