define(
    [
        "backbone", "underscore",
        "objects/extensions/backbone/Collection", "objects/extensions/backbone/Model", "objects/extensions/backbone/View",
        "backbone.validation"
    ],
    function( Backbone, _, C, M, V ){
        "use strict";

        _( Backbone.Model.prototype ).extend( M );
        _( Backbone.Collection.prototype ).extend( C );
        _( Backbone.View.prototype ).extend( V );

        return Backbone;
    }
);
