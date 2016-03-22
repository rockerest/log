define(
    [
        "strap/backbone", "moment"
    ],
    function(
        Backbone, moment
    ){
        "use strict";
        var PostModel = Backbone.Model.extend( {
            "getPost": function(){
                return this.get( "post" );
            },
            "getInformation": function(){
                return this.get( "meta" );
            },

            // helpers
            "getPublishedMoment": function(){
                return moment( this.getInformation().published );
            }
        } );

        return PostModel;
    }
);
