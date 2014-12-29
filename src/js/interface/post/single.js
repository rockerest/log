define(
    [
        "highlight",
        "interface/ui"
    ],
    function(
        Highlight,
        Ui
    ){
        var SinglePostUi = function(){};

        SinglePostUi.prototype = new Ui();

        SinglePostUi.prototype.startUx = function( Post ){
            var shortName = "tomrandolph",
                scriptSrc = "//" + shortName + ".disqus.com/embed.js",
                identifier = Post.getInformation().safeTitle,
                url = "http://log.local.com/#!/post/" + identifier;
                
            window.disqus_identifier = identifier;
            window.disqus_shortname = shortName;
            window.disqus_url = url;
            window.disqus_title = document.title;
                        
            Highlight.highlightBlock( this.$( this.getPost() ).find( "pre code" )[0] );

            if( !window.DISQUS ){
                this.$.ajax({
                    "url": scriptSrc,
                    "dataType": "script"
                });
            }
            else{
                window.DISQUS.reset({
                    "reload": true,
                    "config": function(){
                        this.page.identifier = identifier;
                        this.page.url = url;
                    }
                });
            }
        };
        
        SinglePostUi.prototype.getPost = function(){
            return this.$( "div.post div.body" )[0];
        };

        return SinglePostUi;
    }
);
