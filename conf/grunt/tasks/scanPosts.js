module.exports = function( grunt ){
    'use strict';

    var _ = require( 'underscore' );

    if( !String.prototype.reverse ){
        String.prototype.reverse = function(){
            return this.split( '' ).reverse().join( '' );
        };
    }

    grunt.registerTask( 'scanPosts', 'Compare posts and index to see if there are any discrepancies', function(){
        var posts           = grunt.file.expand( [ 'src/content/posts/**/*.html' ] );
        var postTitles      = _( posts ).map( function( p ){
            return p
                .split( '/' )
                .pop()
                .reverse()
                .replace( 'lmth.', '' )
                .reverse();
        } );
        var meta            = grunt.file.readJSON( 'src/content/data/index.json' );
        var metaTitles      = _( meta ).pluck( 'safeTitle' );
        var missingPosts    = _( metaTitles ).difference( postTitles );
        var missingMeta     = _( postTitles ).difference( metaTitles );
        var outputPosts     = missingPosts.length === 1 ?
                                [ ' is 1 information block ', 'does' ] :
                                [ ' are ' + missingPosts.length + ' information blocks ', 'do' ];
        var outputMeta      = missingMeta.length === 1 ?
                                [ ' is 1 post ', 'does' ] :
                                [ ' are ' + missingMeta.length + ' posts ', 'do' ];
        var uniqMeta        = _( metaTitles ).uniq();
        var counts = {};
        var dupeTitles = [];

        if( missingPosts.length > 0 ){
            grunt.log.error( 'There' + outputPosts[0] + 'in the index that ' + outputPosts[1] + ' not have associated content:\n' + grunt.log.wordlist( missingPosts ) );
        }
        else{
            grunt.log.ok( missingPosts.length + ' missing content.' );
        }

        if( missingMeta.length > 0 ){
            grunt.log.error( 'There' + outputMeta[0] + 'that ' + outputMeta[1] + ' not have associated information in the index:\n' + grunt.log.wordlist( missingMeta ) );
            grunt.fail.warn( 'It is important that each of these posts is identified in the index: ' + grunt.log.wordlist( missingMeta ) + '.' );
        }
        else{
            grunt.log.ok( missingMeta.length + ' missing information.' );
        }

        if( uniqMeta.length !== metaTitles.length ){
            counts = {};
            dupeTitles = [];

            _( metaTitles ).each( function( title ){
                if( _( counts ).has( title ) ){
                    counts[ title ] += 1;
                }
                else{
                    counts[ title ] = 1;
                }
            } );

            _( counts ).each( function( count, title ){
                if( count > 1 ){
                    dupeTitles.push( title );
                }
            } );

            grunt.log.error( 'Non-unique URL-safe titles: ' + grunt.log.wordlist( dupeTitles ) );
            grunt.fail.warn( 'All posts should have a unique URL-safe title.\n' );
        }
        else{
            grunt.log.ok( 'All posts have unique URL-safe titles' );
        }
    } );
};
