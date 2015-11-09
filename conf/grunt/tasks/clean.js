module.exports = function( grunt ){
    'use strict';

    grunt.registerTask( 'clean', 'Wipe the build directory', function(){
        grunt.file.delete( './build' );
    } );
};
