module.exports = function( grunt ){
    'use strict';

    grunt.registerTask( 'style', 'Compile the SASS', function(){
        grunt.task.run( [
            'sass:dev',
            'cssmin'
        ] );
    } );

    grunt.registerTask( 'code', 'Compile the code', function(){
        grunt.task.run( [
            'requirejs:compile'
        ] );
    } );

    grunt.registerTask( 'build', 'Do a system build', function(){
        grunt.task.run( [
            'eslint:all',
            'style',
            'code',
            'copy:i18n',
            'copy:images',
            'copy:vendor',
            'copy:data',
            'uglify'
        ] );
    } );

    grunt.registerTask( 'setup', [
        'prepare'
    ] );

    grunt.registerTask( 'default', [
        'build'
    ] );

    grunt.registerTask( 'parsePosts', [
        'scanPosts',
        'generatePostJSON',
        'build'
    ] );
};
