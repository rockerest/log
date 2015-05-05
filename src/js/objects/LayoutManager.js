define(
    [
        "utilities",
        "layouts/log", "layouts/main"
    ],
    function(
        Utilities,
        LogLayout, MainLayout
    ){
        "use strict";
        var LayoutManager = {};
        var layout, getLayout, setLayout, clearLayout, hasLayout;

        LayoutManager.getStandardLayout = function( force ){
            if( force === undefined ){
                force = true;
            }

            layout = this.getLayout( function(){
                var iLayout = new LogLayout();

                iLayout.render();

                // Had to fall back, switch force to true
                force = true;

                return iLayout;
            } );

            if( force ){
                layout.explore( "content" ).show( MainLayout );
            }

            return layout;
        };

        LayoutManager.getLayout = function( fallback ){
            var tempLayout;

            if( hasLayout() ){
                return getLayout();
            }
            else{
                tempLayout = fallback();

                setLayout( tempLayout );

                return tempLayout;
            }
        };

        LayoutManager.clearLayout = function(){
            clearLayout();

            return this;
        };

        LayoutManager.setLayoutTitle = function( name ){
            Utilities.setTitle( name );
        };

        hasLayout = function(){
            return window.dotlog.layouts.hasManagedLayout;
        };

        getLayout = function(){
            return window.dotlog.layouts.managed;
        };

        setLayout = function( renderedLayout ){
            window.dotlog.layouts.managed = renderedLayout;
            window.dotlog.layouts.hasManagedLayout = true;
        };

        clearLayout = function(){
            window.dotlog.layouts.hasManagedLayout = false;
        };

        return LayoutManager;
    }
);
