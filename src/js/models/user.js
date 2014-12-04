define(
    [
        // Libraries
        "strap/backbone", "underscore"
    ],
    function(
        Backbone, _
    ){
        var UserModel = Backbone.NestedModel.extend({});

        return UserModel;
    }
);
