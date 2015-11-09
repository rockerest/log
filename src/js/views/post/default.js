define(
    [
        // Libraries
        'strap/backbone', 'underscore', 'moment',
        // Dependencies
        'text!vw/posts/default.html'
    ],
    function(
        Backbone, _, Moment,
        tmpl
    ){
        'use strict';
        var PostView = Backbone.View.extend( {
            'template': _.template( tmpl ),

            'tagName': 'div',
            'className': 'post',

            'render': function(){
                this.$el.html( this.template( {
                    'meta': this.meta,
                    'post': this.post
                } ) );

                this.delegateEvents();

                return this;
            },

            'initialize': function( Post ){
                var meta = Post.getInformation();
                var content = Post.getPost();

                meta.pubMoment = Post.getPublishedMoment();

                this.meta = meta;
                this.post = content;

                this.render();
            }
        } );

        return PostView;
    }
);
