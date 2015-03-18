module.exports = function(grunt){
    String.prototype.reverse = function(){
        return this.split( "" ).reverse().join( "" );
    };

    var _ = require( "underscore" );

    grunt.initConfig({
        "pkg": grunt.file.readJSON( "package.json" ),
        "bower": {
            "install":{
                "options":{
                    "layout": "byComponent",
                    "targetDir": "./vendor",
                    "cleanBowerDir": true,
                    "verbose": true
                }
            }
        },
        "uglify": {
            "build": {
                "files": {
                    './build/js/log.min.js': './build/js/log.js'
                }
            },
            "vendor": {
                "files": {
                    './build/vendor/require/require.min.js': './build/vendor/require/require.min.js'
                }
            }
        },
        "copy": {
            "i18n": {
                "files": [
                    {
                        "expand": true,
                        "cwd": 'src/js/nls/',
                        "src": ['**'],
                        "dest": 'build/js/nls/'
                    }
                ]
            },
            "images": {
                "files": [
                    {
                        "expand": true,
                        "cwd":  'src/images/',
                        "src": ['**'],
                        "dest": 'build/img/'
                    }
                ]
            },
            "vendor": {
                "files": [
                    {
                        "src": './vendor/require/require.js',
                        "dest": './build/vendor/require/require.min.js'
                    },
                    {
                        "expand": true,
                        "cwd": 'vendor/font-awesome/fonts/',
                        "src": ['**'],
                        "dest": 'build/vendor/font-awesome/'
                    }
                ]
            },
            "data": {
                "files": [
                    {
                        "expand": true,
                        "cwd": 'src/content/data',
                        "src": ['**/*.json'],
                        "dest": 'build/data/'
                    }
                ]
            }
        },
        "notify": {
            "requirejs": {
                "options": {
                    "title": 'Build Succeeded',
                    "message": 'RequireJS has finished compiling'
                }
            },
            "sass": {
                "options": {
                    "title": 'SASS Compile Succeeded',
                    "message": "The stylesheets have been compiled successfully"
                }
            }
        },
        "cssmin": {
            "build": {
                "files": [{
                    "expand": true,
                    "cwd": 'build/css',
                    "src": ['*.css', '!*.min.css'],
                    "dest": 'build/css',
                    "ext": '.min.css'
                }]
            }
        },
        "sass": {
            "dev": {
                "options": {
                    "style": 'expanded'
                },
                "files": {
                    "build/css/screen.css": "src/sass/screen.scss"
                }
            }
        },
        "jshint":{
            "main": {
                "src": ["src/js/**/*.js"]
            }
        },
        "requirejs":{
            "compile":{
                "options":{
                    "baseUrl": "src/js/",
                    "paths":{
                        "jquery": "empty:"
                    },
                    "mainConfigFile": "src/js/bootstrap.js",
                    "stubModules": ['text'],
                    "optimize": "uglify2",
                    "generateSourceMaps": true,
                    "preserveLicenseComments": false,
                    "name": "bootstrap",
                    "out": "build/js/log.js"
                }
            }
        },
        "watch": {
            "js": {
                "files": ['src/js/**/*.json', 'src/js/**/*.js', 'src/content/**/*.html', 'Gruntfile.js', 'config.json'],
                "tasks": ['code', 'copy']
            },
            "sass": {
                "files": ['src/sass/**/*.scss'],
                "tasks": ['style']
            },
            "i18n": {
                "files": ['src/js/nls/**/*.js', 'src/content/translations/**/*.json'],
                "tasks": ['code', 'copy:i18n']
            },
            "images": {
                "files": ['src/img/**/*'],
                "tasks": ['copy:images']
            },
            "data": {
                "files": ['src/content/data/**/*.json'],
                "tasks": ['copy:data']
            }
        }
    });

    // contrib tasks
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-rename' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    // Non-contrib tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );
    grunt.loadNpmTasks( 'grunt-notify' );

    // Custom tasks
    grunt.registerTask( 'clean', "Wipe the build directory", function(){
        grunt.file.delete( "./build" );
        grunt.file.delete( "./vendor" );
    });

    grunt.registerTask( 'prepare', "Prepare directory structure for anything necessary", function(){
        grunt.task.run( ['clean'] );
        grunt.file.mkdir( "./build" );
        grunt.file.mkdir( "./vendor" );
    });

    grunt.registerTask( 'generatePostJSON', "Read in all posts and generate flat JSON for them", function(){
        var posts = grunt.file.expand([ 'src/content/posts/**/*.html' ]),
            meta = grunt.file.readJSON( 'src/content/data/index.json' ),
            contents = [];

        posts.forEach( function( file ){
            var friendlyName = file
                                .split( "/" ).pop() // get the filename
                                .reverse() // reverse it so the extension is first
                                .replace( "lmth.", "" ) // replace the first occurrence of ".html" in reverse
                                .reverse(); // get the original filename

            contents.push({
                "meta": _( meta ).findWhere({ "safeTitle": friendlyName }),
                "post": grunt.file.read( file )
            });
        });

        grunt.file.write( 'src/content/data/posts.json', JSON.stringify( contents ) );
    });

    grunt.registerTask( 'scanPosts', "Compare posts and index to see if there are any discrepancies", function(){
        var posts           = grunt.file.expand([ 'src/content/posts/**/*.html' ]),
            postTitles      = _( posts ).map( function( p ){ return p.split( "/" ).pop().reverse().replace( "lmth.", "" ).reverse() } ),
            meta            = grunt.file.readJSON( 'src/content/data/index.json' ),
            metaTitles      = _( meta ).pluck( 'safeTitle' ),
            missingPosts    = _( metaTitles ).difference( postTitles ),
            missingMeta     = _( postTitles ).difference( metaTitles ),
            outputPosts     = missingPosts.length === 1 ?
                                [" is 1 information block ", "does"] :
                                [" are " + missingPosts.length + " information blocks ", "do"],
            outputMeta      = missingMeta.length === 1 ?
                                [" is 1 post ", "does"] :
                                [" are " + missingMeta.length + " posts ", "do"],
            uniqMeta        = _(metaTitles).uniq();

        if( missingPosts.length > 0 ){
            grunt.log.error( "There" + outputPosts[0] + "in the index that " + outputPosts[1] + " not have associated content:\n" + grunt.log.wordlist( missingPosts ) );
        }
        else{
            grunt.log.ok( missingPosts.length + " missing content." );
        }

        if( missingMeta.length > 0 ){
            grunt.log.error( "There" + outputMeta[0] + "that " + outputMeta[1] + " not have associated information in the index:\n" + grunt.log.wordlist( missingMeta ) );
            grunt.fail.warn( "It is important that each of these posts is identified in the index: " + grunt.log.wordlist( missingMeta ) + "." );
        }
        else{
            grunt.log.ok( missingMeta.length + " missing information." );
        }
        
        if( uniqMeta.length !== metaTitles.length ){
            var counts = {},
                dupeTitles = [];
            
            _(metaTitles).each( function( title ){
                if( _(counts).has( title ) ){
                    counts[ title ] += 1;
                }
                else{
                    counts[ title ] = 1;
                }
            });
            
            _( counts ).each( function( count, title ){
                if( count > 1 ){
                    dupeTitles.push( title );
                }
            });
            
            grunt.log.error( "Non-unique URL-safe titles: " + grunt.log.wordlist( dupeTitles ) );
            grunt.fail.warn( "All posts should have a unique URL-safe title.\n");
        }
        else{
            grunt.log.ok( "All posts have unique URL-safe titles" );
        }
    });

    grunt.registerTask( 'style', 'Compile the SASS', function(){
        grunt.task.run(['sass:dev', 'cssmin', 'notify:sass']);
    });

    grunt.registerTask( 'code', 'Compile the code', function(){
        grunt.task.run(['jshint:main', 'requirejs:compile', 'notify:requirejs']);
    });

    grunt.registerTask( 'build', 'Do a system build', function(){
        grunt.task.run([
            'style',
            'code',
            'copy:i18n',
            'copy:images',
            'copy:vendor',
            'copy:data',
            'uglify'
        ]);
    });

    grunt.registerTask( 'setup', ['prepare', 'bower:install'] );
    grunt.registerTask( 'default', ['build', 'watch'] );
    grunt.registerTask( 'parsePosts', ['scanPosts', 'generatePostJSON', 'build'] );
};
