module.exports = function( grunt ){
    'use strict';

    grunt.registerTask( 'prepare', 'Prepare directory structure for anything necessary', function(){
        grunt.task.run( [ 'clean' ] );
        grunt.file.mkdir( './build' );
        grunt.task.run( [ 'rename' ] );
    } );
};
