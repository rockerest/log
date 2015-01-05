define(
    [
        "strap/backbone", "moment"
    ],
    function(
        Backbone, Moment
    ){
        var PostModel = Backbone.NestedModel.extend({
            "getPost": function(){
                return this.get( "post" );
            },
            "getInformation": function(){
                return this.get( "meta" );
            },

            // helpers
            "getPublishedMoment": function(){
                return Moment( this.getInformation().published );
            }
        });

        return PostModel;
    }
);
