define(
    [
        // Libraries
        "strap/backbone", "moment",
        // Models
        "models/post"
    ],
    function(
        Backbone, Moment,
        PostModel
    ){
        var PostCollection = Backbone.Collection.extend({
            "model": PostModel,
            "comparator": function( a, b ){
                var firstMoment = a.getPublishedMoment(),
                    secondMoment = b.getPublishedMoment();

                return secondMoment.diff( firstMoment );
            },
            "mode": "client"
        });

        return PostCollection;
    }
);
