define(
    [
        // Libraries
        "strap/backbone",
        // Models
        "models/post"
    ],
    function(
        Backbone,
        PostModel
    ){
        var PostCollection = Backbone.PageableCollection.extend({
            "model": PostModel,
            "mode": "client"
        });

        return PostCollection;
    }
);
