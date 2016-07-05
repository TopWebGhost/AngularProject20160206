module.exports = function(grunt) {
    var debugFile = "public/dist/app.debug.js",
        minFile = debugFile.replace('debug', 'min'),
        jsList = [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-animate/angular-animate.js',
            'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/bower_components/angular-cookies/angular-cookies.js',
            'public/bower_components/jquery/dist/jquery.js',
            'public/bower_components/lodash/lodash.js'
        ],
        appSrc = 'public/js/**/*.js',
        uglifyFiles = {};

    jsList.push(appSrc);
    uglifyFiles[minFile] = debugFile;

    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),
        clean:  {
            app: ['dist']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: jsList,
                dest: debugFile
            }
        },
        uglify: {
            dist: {
                files: uglifyFiles,
                options: {
                    mangle: false
                }
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask ('default', ['clean:app', 'concat']);
    grunt.registerTask ('release', ['default', 'uglify']);

};
