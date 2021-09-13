module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        uglify: {
            build: {
                files: {
                    'src/templates/jsroute.min.js': 'src/templates/jsroute.js'
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.registerTask( 'default',[ 'uglify' ] );
};
