var gulp            = require('gulp');
var notify          = require("gulp-notify");
var htmlmin         = require('gulp-htmlmin');
var replace         = require('gulp-replace');
var inlinesource    = require('gulp-inline-source');
var stripDebug      = require('gulp-strip-debug');
var rename          = require('gulp-rename');
var moment          = require('moment');


const zip           = require('gulp-zip');


function deploy(projectName){
	var entry = './dev/'+projectName+'/index.html';
	var stream =  gulp.src(entry)
        .pipe(replace("main.js", 'log-free.js'))
        .pipe(htmlmin({removeComments:true, collapseWhitespace:true, preserveLineBreaks:true}))
        
        .pipe(inlinesource({compress:true, svgAsImage:true}))
        .on('error', notify.onError({message:"<%= error.message %>", wait: false}))               
        .pipe(replace('data:image/svg+xml;utf8', 'data:image/svg+xml;charset=utf-8'))
        .pipe(replace('<script type="text/javascript" src="http://localhost:48626/takana.js"></script>', ''))
        .pipe(replace("takanaClient.run({host: 'localhost:48626'});", ''))
        .pipe(replace("<title>", '<title>Created: '+moment().format('MMM D, h:mm')))
        .pipe(replace("./images/", ''))
        .pipe(gulp.dest('./docs/deploy/'+projectName));
        
        return stream;
}


function log_free(projectName){    
    var stream = gulp.src('./dev/'+projectName+'/_bundled/main.js')
        .pipe(stripDebug())
        .pipe(rename("log-free.js"))
        .pipe(gulp.dest(function(file){            
            return file.base;
        }))


        
    var stream2 =  gulp.src('./dev/'+projectName+'/images/**.*')
    .pipe(gulp.dest('./docs/deploy/'+projectName));
        

        stream.on('end', function(){
            deploy(projectName).on("end", function(){
                gulp.src('./docs/deploy/'+projectName+'/**',  { base : "./docs/deploy" })
                    .pipe(zip(projectName+'.zip'))
                    .pipe(gulp.dest('./docs/zips'));
                return;
            })
            return;            
        })
        return stream;
}

module.exports = log_free;

