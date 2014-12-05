define(
    [
        "strap/backbone"
    ],
    function(
        Backbone
    ){
        var PostModel = Backbone.NestedModel.extend({
            "getPost": function(){
                return this.get( "post" );
            }
        });

        return PostModel;
    }
);
