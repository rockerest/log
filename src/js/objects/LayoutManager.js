define(
    [
        "utilities",
        "layouts/log", "layouts/main", "layouts/post"
    ],
    function(
        Utilities,
        LogLayout, MainLayout, PostLayout
    ){
        var LayoutManager = {},
            getLayout, setLayout, clearLayout, hasLayout;

        LayoutManager.getStandardLayout = function( moduleName ){
            return this.getLayout( function(){
                var iLayout = new LogLayout( moduleName );

                iLayout.render();
                iLayout.explore( "content" ).show( MainLayout );
                iLayout.explore( "content.page" ).show( PostLayout );

                return iLayout;
            });
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
