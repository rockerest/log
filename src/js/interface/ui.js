define(
    [
        "underscore", "jquery",
        "qtip2"
    ],
    function(
        _, $
    ){
        "use strict";
        var Interface = function(){
            this.$ = $;
            this._ = _;
        };

        Interface.prototype.makeSpinner = function( element, replace ){
            var spinner = $( '<span class="fa fa-spin fa-circle-o-notch"></span>' );
            var $element = $( element );
            var content = $element.html();

            if( !replace ){
                replace = false;
            }

            if( replace ){
                $element.html( spinner );
            }
            else{
                $element.prepend( spinner );
            }

            return {
                "restore": function(){
                    $element.html( content );
                    return $element;
                }
            };
        };

        return Interface;
    }
);
