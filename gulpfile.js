var gulp = require( 'gulp' );
var buildConfig = require( './config.js' );
var concat = require( 'gulp-concat' );

gulp.task( 'default', [ 'copyconfig' ], function() {
    return gulp.src( buildConfig.src.js )
            .pipe( concat( 'pibot.js' ) )
            .pipe( gulp.dest( buildConfig.dist.js ) );
} );

gulp.task( 'copyconfig', function() {
    return gulp.src( buildConfig.src.piconfig )
            .pipe( gulp.dest( buildConfig.dist.piconfig ) )
} )