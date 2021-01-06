var gulp            = require('gulp');
var sourcemaps      = require('gulp-sourcemaps');
var gulp_sass       = require('gulp-sass');
var notify          = require("gulp-notify");
var autoprefixer    = require('gulp-autoprefixer');

gulp_sass.compiler = require('node-sass');

function buildSass(name, browserSync){
    var entry = './dev/'+name+'/_styles/scss/main.scss';
    return gulp.src(entry)   
        .pipe(sourcemaps.init())
        .pipe(gulp_sass.sync({ outputStyle: 'expanded'})
            .on('error', gulp_sass.logError))
            .on('error', notify.onError({message:"<%= error.message %>", wait: false}))               
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dev/'+name+'/_styles/css'))
        .pipe(browserSync.stream());
}

module.exports = buildSass;

