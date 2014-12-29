define(
    [
        "underscore", "jquery",
        "qtip2"
    ],
    function(
        _, $,
        Timezone
    ){
        var Interface = function(){
            this.$ = $;
            this._ = _;
        };

        Interface.prototype.makeSpinner = function( element, replace ){
            if( !replace ){
                replace = false;
            }

            var spinner = $( '<span class="fa fa-spin fa-circle-o-notch"></span>' ),
            $element = $( element ),
            content = $element.html();

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
