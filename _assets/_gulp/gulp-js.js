var browserify  = require('browserify');
var notify      = require("gulp-notify");
var babel       = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var sourcemaps  = require('gulp-sourcemaps');
var gulp        = require('gulp');


function buildJS(name, browserSync){
    var entry = './dev/'+name+'/_js/main.js';
    var output = './dev/'+name+'/_bundled/main.js';
    var b = browserify({ entries: [entry], debug:true }).transform(babel);           

    
    return b.bundle()
        .on('error', notify.onError({message:"<%= error.message %>", wait: false}))    
        .pipe(source(output))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file                
        .pipe(sourcemaps.write('.')) // writes .map file                
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
    
}

module.exports = buildJS;