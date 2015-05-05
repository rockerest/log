define(
    [
        "highlight",
        "interface/ui"
    ],
    function(
        Highlight,
        Ui
    ){
        "use strict";
        var SinglePostUi = function(){};

        SinglePostUi.prototype = new Ui();

        SinglePostUi.prototype.startUx = function(){
            this.$( ".hide" )
                .hide()
                .removeClass( "hide" );

            this.$( "div.more" ).hide();

            if( this.hasCode() ){
                this.$( this.getPost() ).find( "pre code" ).each( function( i, code ){
                    Highlight.highlightBlock( code );
                } );
            }
        };

        SinglePostUi.prototype.getFootnoteSignalledBy = function( element ){
            var footnote = this.$( element ).data( "href" );

            return this.$( footnote )[ 0 ];
        };

        SinglePostUi.prototype.scrollTo = function( element ){
            this.$( "html, body" ).animate( {
                "scrollTop": this.$( element ).offset().top
            }, 800 );
        };

        SinglePostUi.prototype.loadComments = function( Post ){
            this.$( ".comments .load" ).hide();

            this.loadDisqusThread( Post );
        };

        SinglePostUi.prototype.loadDisqusThread = function( Post ){
            var shortName = "tomrandolph",
                scriptSrc = "//" + shortName + ".disqus.com/embed.js",
                identifier = Post.getInformation().safeTitle,
                url = "http://log.local.com/#!/post/" + identifier;

            /*eslint camelcase:0*/
            window.disqus_identifier = identifier;
            window.disqus_shortname = shortName;
            window.disqus_url = url;
            window.disqus_title = document.title;

            if( !window.DISQUS ){
                this.$.ajax( {
                    "url": scriptSrc,
                    "dataType": "script"
                } );
            }
            else{
                window.DISQUS.reset( {
                    "reload": true,
                    "config": function(){
                        this.page.identifier = identifier;
                        this.page.url = url;
                    }
                } );
            }

            this.showDisqusThread();
        };

        SinglePostUi.prototype.getPost = function(){
            return this.$( "div.post div.body" )[ 0 ];
        };

        SinglePostUi.prototype.showDisqusThread = function(){
            this.$( "#disqus_thread" ).show();
        };

        SinglePostUi.prototype.hasCode = function(){
            return this.$( this.getPost() ).find( "pre code" ).length;
        };

        return SinglePostUi;
    }
);
