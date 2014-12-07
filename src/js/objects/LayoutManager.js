define(
    [
        "utilities",
        "layouts/log", "layouts/main"
    ],
    function(
        Utilities,
        LogLayout, MainLayout
    ){
        var LayoutManager = {},
            getLayout, setLayout, clearLayout, hasLayout;

        LayoutManager.getStandardLayout = function( force ){
            if( force === undefined ){
                force = true;
            }

            var layout = this.getLayout( function(){
                var iLayout = new LogLayout();

                iLayout.render();

                // Had to fall back, switch force to true
                force = true;

                return iLayout;
            });

            if( force ){
                layout.explore( "content" ).show( MainLayout );
            }

            return layout;
        };

        LayoutManager.getLayout = function( fallback ){
            var layout;

            if( hasLayout() ){
                return getLayout();
            }
            else{
                layout = fallback();

                setLayout( layout );

                return layout;
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
            return window.dotlog.layouts.__managed;
        };

        setLayout = function( renderedLayout ){
            window.dotlog.layouts.__managed = renderedLayout;
            window.dotlog.layouts.hasManagedLayout = true;
        };

        clearLayout = function(){
            window.dotlog.layouts.hasManagedLayout = false;
        };

        return LayoutManager;
    }
);
