/* Broken Rules - A Haiku by Tom Randolph

    A file of sorrows
    It breaks the linter's good rules
    Truly, sadness lasts

*/

/* eslint no-underscore-dangle:0 */
/* eslint no-console:0 */

define(
    function(){
        'use strict';
        var RuleBreaker = {};

        RuleBreaker.console = {
            'warn': function( message ){
                if( console && console.warn ){
                    console.warn( message );
                }
            },
            'error': function( message ){
                if( console && console.error ){
                    console.error( message );
                }
            }
        };

        return RuleBreaker;
    }
);
