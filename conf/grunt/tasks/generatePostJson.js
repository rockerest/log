module.exports = function( grunt ){
    'use strict';

    var _ = require( 'underscore' );

    if( !String.prototype.reverse ){
        String.prototype.reverse = function(){
            return this.split( '' ).reverse().join( '' );
        };
    }

    grunt.registerTask( 'generatePostJSON', 'Read in all posts and generate flat JSON for them', function(){
        var posts = grunt.file.expand( [ 'src/content/posts/**/*.html' ] );
        var meta = grunt.file.readJSON( 'src/content/data/index.json' );
        var contents = [];

        posts.forEach( function( file ){
            var friendlyName = file
                                .split( '/' ).pop() // get the filename
                                .reverse() // reverse it so the extension is first
                                .replace( 'lmth.', '' ) // replace the first occurrence of '.html' in reverse
                                .reverse(); // get the original filename

            contents.push( {
                'meta': _( meta ).findWhere( { 'safeTitle': friendlyName } ),
                'post': grunt.file.read( file )
            } );
        } );

        grunt.file.write( 'src/content/data/posts.json', JSON.stringify( contents ) );
    } );
};
