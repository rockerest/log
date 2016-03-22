/**
 * The event manager that creates other event listeners
 * @module objects/EventManager
 *
 * @requires strap/backbone
 * @requires underscore
 * @requires objects/Storage
 */
define(
    [
        // Libraries
        "strap/backbone", "underscore",
        // Helpers
        "objects/Storage"
    ],
    function(
        Backbone, _,
        Storage
    ){
        "use strict";

        var EventManager;

        function getArgsArray( args ){
            return Array.prototype.slice.call( args );
        }

        /** @alias module:objects/EventManager */
        EventManager = _.extend( {}, Backbone.Events, {
            /**
             * Creates a listener in the channel listing
             *
             * @memberof module:objects/EventManager
             * @param {string} scope - the name of the listener
             * @param {Object.<string, Function>} events - the hash of event names and handlers
             *
             * @example
             * // Sets up an event listener for the event "test" in the scope "Documentation"
             * var vent = EventManager.listen( "Documentation", {
             *     "test": function(){
             *         console.log( "the `test` event was fired on the `Documentation` scope!" );
             *     }
             * } );
             *
             * @returns {Object} vent - An event listener bound to the specified scope
             */
            "listen": function( scope, events ){
                var list = window[ window.ns ].channels[ scope ] = _.extend( {}, Backbone.Events, {
                    "info": {
                        "name": scope
                    },
                    "broadcast": function broadcast(){
                        EventManager.trigger.apply( EventManager, getArgsArray( arguments ) );
                    },
                    "emit": function emitter(){
                        list.trigger.apply( list, getArgsArray( arguments ) );
                    }
                } );

                _( events ).each( function( behavior, name ){
                    list.on( name, function(){
                        var args = getArgsArray( arguments );

                        behavior.apply( list, args );
                    } );
                } );

                list.on( "all", function(){
                    var args = getArgsArray( arguments );
                    var name = args.shift();
                    var parts = name.split( ":" );
                    var topScope = parts.shift();
                    var channels = _( window[ window.ns ].channels ).keys();

                    if( _( channels ).indexOf( topScope ) === -1 ){
                        parts.unshift( topScope );
                        args.unshift( scope + ":__bubbling__:" + parts.join( ":" ) );

                        // FIXME - This is just a hack to test for app-only events
                        // TODO - Why are odd events being fired on these event handlers?
                        if( name.charAt( name.length - 1 ) !== ":" ){
                            EventManager.trigger.apply( EventManager, args );
                        }
                    }
                } );

                list.listenTo(
                    EventManager,
                    "all",
                    function eventManagerInternalAllListener(){
                        var args = getArgsArray( arguments ); // eg: [ "scope:event:fire", param1, param2 ]
                        var parts = args.shift().split( ":" ); // [ "scope", "event", "fire" ]
                        var topScope = parts.shift(); // "scope"
                        var bubbling = false;
                        var matching = scope === topScope;
                        var eventName;

                        function isBubblingSetter(){
                            if( parts[ 0 ] === "__bubbling__" ){
                                parts.shift();
                                bubbling = true;
                            }
                        }

                        function addScopeIfNotMatching(){
                            if( !matching ){
                                eventName = topScope + ":" + eventName;
                            }
                        }

                        function emitter(){
                            if( ( !bubbling && matching ) || !matching ){
                                list.trigger.apply( list, args );
                            }
                        }

                        isBubblingSetter();
                        eventName = parts.join( ":" );
                        addScopeIfNotMatching();

                        args.unshift( eventName );
                        emitter();
                    }
                );

                return list;
            },
            /**
             * Retrieves an event listener by name
             *
             * @memberof module:objects/EventManager
             *
             * @param {string} scope - The name of the listener
             * @returns {Object|undefined} vent - The scoped event listener or undefined (if the scope doesn't exist)
             */
            "getScope": function( scope ){
                return window[ window.ns ].channels[ scope ];
            }
        } );

        EventManager.listen( "core", {
            /**
             * Stores data in in-memory storage
             *
             * @event module:objects/EventManager.data:store
             * @param {Object} map - A hash representing keys and data to set in the application's storage container
             * @example
             * // Sets { "stuff": "mine" } to "general" and the number 4 to "logins"
             * vent.trigger( "core:data:store", {
             *     "general": {
             *         "stuff": "mine"
             *     },
             *     "logins": 4
             * } );
             * @returns {undefined}
             *
             * @see module:objects/Storage.set
             */
            "data:store": function( map ){
                _( map ).each( function( data, key ){
                    Storage.set( key, data );
                } );
            },
            /**
             * Removes data from in-memory storage
             *
             * @event module:objects/EventManager.data:remove
             * @param {Array} keys - a flat list of keys to delete from this application's storage container
             * @example
             * // Deletes "profile" and "authentication"
             * vent.trigger( "core:data:remove", [ "profile", "authentication" ] );
             * @returns {undefined}
             *
             * @see module:objects/Storage.del
             */
            "data:remove": function( keys ){
                _( keys ).each( function( key ){
                    Storage.del( key );
                } );
            },
            /**
             * Gets data out of in-memory storage
             *
             * @event module:objects/EventManager.data:get
             * @param {Object} map - A hash of keys to fetch and their associated callback handlers
             * @example
             * // Fetches "logins" and logs it to the console
             * vent.trigger( "core:data:get", {
             *     "logins": function( logins ){
             *         console.log( logins );
             *     }
             * } );
             * @returns {undefined}
             *
             * @see module:objects/Storage.get
             */
            "data:get": function( map ){
                _( map ).each( function( handler, key ){
                    handler( Storage.get( key ) );
                } );
            },
            /**
             * Sets a payload to be grabbed in the future (often the next time a route is matched)
             *
             * @event module:objects/EventManager.data:payload:prime
             * @param {Function} callback - a function to run when payload is fetched
             * @returns {undefined}
             */
            "data:payload:prime": function( callback ){
                Storage.set( "payload", callback );
            }
        } );

        return EventManager;
    }
);
