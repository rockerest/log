requirejs.config( {
    "paths": {
        // SHORTCUTS
        "vw": "../content/templates/views",
        "lyt": "../content/templates/layouts",
        "translations": "../content/translations",
        "data": "../content/data",
        "strap": "objects/bootstrappers",
        "hljs-langs": "../../node_modules/highlight.js/lib/languages",

        // LIBRARIES
        "backbone": "../../node_modules/backbone/backbone",
        "underscore": "../../node_modules/underscore/underscore",
        "sammy": "../../node_modules/sammy/lib/sammy",
        "jquery": [ "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min", "../../node_modules/jquery/dist/jquery" ],
        "ribcage": "../../node_modules/backbone-ribcage/build/ribcage",
        "moment": "../../node_modules/moment/min/moment-with-locales",
        "hljs": "../../node_modules/highlight.js/lib/highlight",

        // LIBRARY PLUGINS
        // jQuery Plugins
        "qtip2": "../../node_modules/qtip2/dist/jquery.qtip",
        "noty": "../../node_modules/noty/js/noty/packaged/jquery.noty.packaged",
        // Moment Plugins
        "moment-timezone": "../../node_modules/moment-timezone/builds/moment-timezone-with-data-2010-2020",
        // Require plugins
        "text": "../../node_modules/requirejs-text/text",
        "json": "../../node_modules/requirejs-plugins/src/json",
        "i18n": "../../node_modules/i18n/i18n",
        // Backbone plugins
        "backbone.validation": "../../node_modules/backbone-validation/dist/backbone-validation-amd"
    },
    "shim": {
        "backbone": {
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        },
        "jquery": {
            "exports": "jQuery"
        }
    },
    "map": {
        "*": {
            "moment": "moment-timezone",
            "highlight": "strap/highlight"
        },
        "moment-timezone": {
            "moment": "moment"
        }
    }
} );

window.ns = "dotlog";

window.dotlog = {
    "channels": {},
    "layouts": {},
    "storage": {}
};

require(
    [ "routes" ],
    function( Routes ){
        "use strict";
        Routes.startup();
    }
);
