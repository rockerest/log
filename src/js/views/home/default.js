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
        // Events
        "events/home/default"
    ],
    function(
        Backbone, _, Moment,
        PostCollection,
        posts,
        PostView,
        vent
    ){
        "use strict";
        var DefaultHomeView = Backbone.View.extend( {
            "render": function(){
                var self = this;

                self.$el.addClass( "all-posts" );

                _( this.posts ).each( function( post ){
                    post.render();

                    self.$el.append( post.$el );
                } );

                vent.trigger( "home:ux:start" );

                return this;
            },

            "initialize": function(){
                var postList = new PostCollection( posts );
                var Posts = [];

                postList.each( function( post ){
                    if( !post.getPublishedMoment().isAfter() ){
                        Posts.push( new PostView( post ) );
                    }
                } );

                this.posts = Posts;

                this.render();
            }
        } );

        return DefaultHomeView;
    }
);
