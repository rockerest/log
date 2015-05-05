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
        var getArgsArray = function( args ){
            return Array.prototype.slice.call( args );
        };
        /** @alias module:objects/EventManager */
        var EventManager = _.extend( {}, Backbone.Events, {
            /**
             * Creates a listener in the channel listing
             *
             * @memberof module:objects/EventManager
             * @param {string} scope - the name of the listener
             * @param {Object.<string, Function>} events - the hash of event names and handlers
             *
             * @returns {Object}
             */
            "listen": function( scope, events ){
                var list = window.dotlog.channels[ scope ] = _.extend( {}, Backbone.Events, {
                        "broadcast": EventManager
                    } );

                _( events ).each( function( behavior, name ){
                    list.on( name, function(){
                        var args = getArgsArray( arguments );

                        behavior.apply( list, args );
                    } );
                } );

                list.on( "all", function(){
                    var args = getArgsArray( arguments ),
                        name = args.shift(),
                        parts = name.split( ":" ),
                        topScope = parts.shift(),
                        channels = _( window.dotlog.channels ).keys();

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
                    function(){
                        var args = getArgsArray( arguments ), // eg: [ "scope:event:fire", param1, param2 ]
                            parts = args.shift().split( ":" ), // [ "scope", "event", "fire" ]
                            topScope = parts.shift(), // "scope"
                            bubbling = false,
                            matching = scope === topScope,
                            eventName;

                        if( parts[ 0 ] === "__bubbling__" ){
                            parts.shift();
                            bubbling = true;
                        }
                        else{
                            bubbling = false;
                        }

                        eventName = parts.join( ":" );
                        if( !matching ){
                            eventName = topScope + ":" + eventName;
                        }

                        args.unshift( eventName );

                        if( ( !bubbling && matching ) || !matching ){
                            list.trigger.apply( list, args );
                        }
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
             * @returns {Object|undefined}
             */
            "getScope": function( scope ){
                return window.dotlog.channels[ scope ];
            }
        } );

        EventManager.listen( "core", {
            /**
             * Stores data in in-memory storage
             *
             * @event module:objects/EventManager.data:store
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
             *
             * @see module:objects/Storage.get
             */
            "data:get": function( map ){
                _( map ).each( function( handler, key ){
                    handler( Storage.get( key ) );
                } );
            },
            /**
             * Sets a payload
             *
             * @event module:objects/EventManager.data:payload:prime
             */
            "data:payload:prime": function( callback ){
                Storage.set( "payload", callback );
            },
            /**
             * Navigates to a new location.
             * <br />
             * Allows an optional payload to be triggered upon arrival at the destination.
             *
             * @event module:objects/EventManager.chrome:navigate
             *
             * @fires module:objects/EventManager.data:payload:prime
             */
            "chrome:navigate": function( href, options ){
                var sammyAppRouter = window.dotlog.router;

                if( options === undefined ){
                    options = {};
                }

                if( options.payload ){
                    this.trigger( "data:payload:prime", options.payload );
                }

                if( href.indexOf( "http" ) > -1 ){
                    window.location = href;
                }
                else{
                    sammyAppRouter.setLocation( href );
                }
            }
        } );

        return EventManager;
    }
);
