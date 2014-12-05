module.exports = function(grunt){
    String.prototype.reverse = function(){
        return this.split( "" ).reverse().join( "" );
    };

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
                        "cwd":  'src/img/',
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
        "replace": {
            "dev":{
                "src": ['build/js/*.js'],
                "overwrite": true,
                "replacements":[
                    {
                        "from": '"@@!UrlArgs!@@"',
                        "to": '"_=' + (new Date()).getTime() + '"'
                    }
                ]
            }
        },
        "sass": {
            "dev": {
                "options": {
                    "style": 'expanded'
                },
                "files": {
                    "build/css/screen.min.css": "src/sass/screen.scss"
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
                "tasks": ['code', 'copy', 'replace:dev']
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

    // Non-contrib tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );
    grunt.loadNpmTasks( 'grunt-text-replace' );
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
        var postFiles = grunt.file.expand([ 'src/content/posts/**/*.html' ]),
            contents = [];

        postFiles.forEach( function( file ){
            var friendlyName = file
                                .split( "/" ).pop() // get the filename
                                .reverse() // reverse it so the extension is first
                                .replace( "lmth.", "" ) // replace the first occurrence of ".html" in reverse
                                .reverse(); // get the original filename

            contents.push({
                "name": friendlyName,
                "post": grunt.file.read( file )
            });
        });

        grunt.file.write( 'src/content/data/posts.json', JSON.stringify( contents ) );
    });

    grunt.registerTask( 'style', 'Compile the SASS', function(){
        grunt.task.run(['sass:dev', 'notify:sass']);
    });

    grunt.registerTask( 'code', 'Compile the code', function(){
        grunt.task.run(['jshint:main', 'requirejs:compile', 'notify:requirejs']);
    });

    grunt.registerTask( 'build', 'Do a system build', function(){
        grunt.task.run(['style', 'code', 'copy:i18n', 'copy:images', 'copy:vendor', 'copy:data', 'replace:dev']);
    });

    grunt.registerTask( 'setup', ['prepare', 'bower:install'] );
    grunt.registerTask( 'default', ['build', 'watch'] );
    grunt.registerTask( 'parsePosts', ['generatePostJSON'] );
};
