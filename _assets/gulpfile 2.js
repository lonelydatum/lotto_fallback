global.Promise      = require('bluebird');
var gulp            = require('gulp');
var argv            = require('yargs').argv;
var nodifer         = require('node-notifier');
var live_server     = require('live-server');
var glob            = require('glob');
var es              = require('event-stream');
var takana          = require('takana');

var _JS_        = require('./_assets/_gulp/gulp-js.js');
var _SCSS_      = require('./_assets/_gulp/gulp-scss.js');
var _HTML_      = require('./_assets/_gulp/gulp-html.js');
var _DEPLOY_    = require('./_assets/_gulp/gulp-deploy.js');
var _projectName = '';


var browserSync = require('browser-sync').create();



/*--------------------------------------------------------------------*/
// helpers
/*--------------------------------------------------------------------*/
gulp.task('takana', function() {
    loadTakana();
});

gulp.task('set-project-name', function(done){
    _projectName = getProjectName(done);
    done();
})
/*--------------------------------------------------------------------*/
// helpers
/*--------------------------------------------------------------------*/





/*--------------------------------------------------------------------*/
// single
/*--------------------------------------------------------------------*/
gulp.task('js-single', ['set-project-name'], function(){
    _JS_(_projectName);
})
gulp.task('ejs-single', ['set-project-name'], function(){
    _HTML_(_projectName);
})
gulp.task('sass-single', ['set-project-name'], function(){
    _SCSS_(_projectName);
})
gulp.task('log-free-single', function () {
    return log_free(_projectName);
});



gulp.task('dev-single', [ 'set-project-name'], function(){
    var folderPath = './dev/'+_projectName+"/";
    var jsWatch = ['./dev/_common/_js/*.js', folderPath+'_js/*.js'];
    gulp.watch( jsWatch, ["js-single"]);

    var ejsWatch = ['./dev/_common/templates/*.ejs', folderPath+'index.ejs', folderPath+'templates/*.ejs']
    gulp.watch(ejsWatch, ["ejs-single"]);

    var stylesWatch = ['./dev/_common/_styles/scss/*.scss', folderPath+'_styles/scss/*.scss'];
    gulp.watch(stylesWatch, ['sass-single']);
    _HTML_(_projectName);

    _JS_(_projectName);
    _SCSS_(_projectName);
    takana.run({path:__dirname, includePaths:[]});

});

gulp.task('deploy-single', ['set-project-name', 'sass-single', 'js-single', 'ejs-single'], function(){
    _DEPLOY_(_projectName);
})
/*--------------------------------------------------------------------*/
// single
/*--------------------------------------------------------------------*/






/*--------------------------------------------------------------------*/
// all
/*--------------------------------------------------------------------*/
gulp.task('deploy', ['sass-all', 'js-all', 'ejs-all'], function(done){
    glob('./dev/**/index.html', function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _DEPLOY_(project);
        });
        es.merge(tasks).on('end', done);
    })
})




gulp.task('dev-all-basic', function(){
    gulp.watch(["dev/**/*.js", "dev/_common/js/*.js", "!dev/**/_bundled/*.js"], ["js-all"]);
    gulp.watch(["dev/*/*.ejs", "dev/_common/templates/*.ejs"], ["ejs-all"]);
    gulp.watch(["dev/**/_styles/scss/*.scss", "dev/_common/styles/*.scss"], ["sass-all"]);

    gulp.start('ejs-all');
    gulp.start('sass-all');
    gulp.start('js-all');

    var params = {
        port: 1111, // Set the server port. Defaults to 8080.
        host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0.
        open: true, // When false, it won't load your browser by default.
        ignore: 'node-modules', // comma-separated string for paths to ignore
        wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
    };

    browserSync.init({
        server: {
            baseDir: "./",
            
            port: 1111,
            directory: true
        }
    });


    //live_server.start(params);
});

gulp.task('dev', ['dev-all-basic'], function(){
    loadTakana();
});


gulp.task('js-all', function(done){
    glob('./dev/*/_js/main.js', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _JS_(project, browserSync)
        });
        es.merge(tasks).on('end', done);
    });
})

gulp.task('sass-all', function(done) {
     glob('./dev/**/_styles/scss/main.scss', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _SCSS_(project, browserSync);
        });
        es.merge(tasks).on('end', done);
    });
})

gulp.task('ejs-all', function(done) {
     glob('./dev/**/index.ejs', function(err, files) {
        var tasks = files.map(function(entry) {
            var project = entry.split('/')[2];
            return _HTML_(project, browserSync);
        });
        es.merge(tasks).on('end', done);
    });
})
/*--------------------------------------------------------------------*/
// all
/*--------------------------------------------------------------------*/







function loadTakana(){
    takana.run({path:__dirname, includePaths:[] });
}

function boneHead(msg, done){
    var boneheadMessage = {title:'Use that lump inside your head',message: ''}
    boneheadMessage.message = msg;
    nodifer.notify(boneheadMessage);
    done(new Error("OOOOPSS"));
}

function getProjectName(done){
    if(!argv.path){
        boneHead( 'You need to include a project name. --path abc_300x250', done );
    }

    var projectName
    var parts = argv.path.split("/");

    if(parts.length==1){
        // just the project neame
        projectName = parts[0];
    }else if(parts.length>1){
        // includes the whole path
        parts.forEach(function(item){
            if(item.indexOf("x")>=0){
                projectName = item;
            }
        })
    }
    //todo: verify if the user entered a valid project folder
    return projectName;
}

