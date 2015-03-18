requirejs.config({
    "paths": {
        // SHORTCUTS
        "vw":                       "../content/templates/views",
        "lyt":                      "../content/templates/layouts",
        "translations":             "../content/translations",
        "data":                     "../content/data",
        "strap":                    "objects/bootstrappers",

        // LIBRARIES
        "backbone":                 "../../vendor/backbone/backbone",
        "underscore":               "../../vendor/underscore/underscore",
        "sammy":                    "../../vendor/sammy/sammy",
        "jquery":                   ["//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min", "../../vendor/jquery/jquery"],
        "ribcage":                  "../../vendor/ribcage/ribcage",
        "cookies":                  "../../vendor/Cookies/cookies",
        "backgrid":                 "../../vendor/backgrid/backgrid",
        "moment":                   "../../vendor/moment/moment",
        "pikaday":                  "../../vendor/pikaday/pikaday",
        "highlight":                "../vendor/highlightjs/highlight.pack",

        // LIBRARY PLUGINS
        // jQuery Plugins
        "qtip2":                    "../../vendor/qtip2/jquery.qtip.min",
        "noty":                     "../../vendor/noty/jquery.noty.packaged",
        // Moment Plugins
        "moment-timezone":          "../../vendor/moment-timezone/moment-timezone-with-data-2010-2020",
        // Require plugins
        "text":                     "../../vendor/requirejs-text/text",
        //"async":                  '../../vendor/requirejs-plugins/async',
        //"font":                   '../../vendor/requirejs-plugins/font',
        //"goog":                   '../../vendor/requirejs-plugins/goog',
        //"image":                  '../../vendor/requirejs-plugins/image',
        "json":                     '../../vendor/requirejs-plugins/json',
        //"noext":                  '../../vendor/requirejs-plugins/noext',
        //"mdown":                  '../../vendor/requirejs-plugins/mdown',
        //"propertyParser":         '../../vendor/requirejs-plugins/propertyParser',
        //"markdownConverter":      '../../vendor/requirejs-plugins/Markdown.Converter',
        "i18n":                     '../../vendor/requirejs-i18n/i18n',
        // Backbone plugins
        "backbone.localstorage":    '../../vendor/backbone.localStorage/backbone.localStorage',
        "backbone.paginator":       '../../vendor/backbone.paginator/lib/backbone.paginator',
        "backbone.validation":      '../../vendor/backbone.validation/dist/backbone-validation-amd-min',
        "backbone.nested-model":    '../../vendor/backbone-nested-model/backbone-nested',
        // Backgrid plugins
        "backgrid-moment-cell":     '../../vendor/backgrid-moment-cell/backgrid-moment-cell',
        "backgrid-filter":          '../../vendor/backgrid-filter/backgrid-filter',
        "backgrid-paginator":       '../../vendor/backgrid-paginator/backgrid-paginator'
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
            "moment": "moment-timezone"
        },
        "moment-timezone": {
            "moment": "moment"
        }
    }
});

window.dotlog = {
    "channels": {},
    "layouts": {},
    "storage": {}
};

require(
    ["routes"],
    function( Routes ){
        Routes.startup();
    }
);
