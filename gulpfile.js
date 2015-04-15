var gulp = require('gulp');

var Path = require('path');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var fs = require('fs');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var es = require('event-stream');

gulp.task('sass', sassCompile);
gulp.task('assets', assetCopy);
gulp.task('scripts', scriptCompile);
gulp.task('clean', clean);

gulp.task('reloader', ['build'], reload);
gulp.task('dev', ['build'], server);

gulp.task('build', ['sass', 'assets', 'scripts']);
gulp.task('default', ['build']);

var projects = [
  'linkwork', 'postillon'
];

function assetCopy(cb) {
  var assetStreams = projects.map(function (name) {
    return gulp.src(['src/' + name + '/**', '!src/' + name + '/js/**', '!src/' + name + '/scss',
      '!src/' + name + '/scss/**'])
      .pipe(gulp.dest('out/' + name));
  });

  es.merge.apply(null, assetStreams)
    .on('end', cb);
}

function sassCompile(cb) {
  var sassStreams = projects.map(function (name) {
    return gulp.src('src/' + name + '/scss/main.scss')
      .pipe(plumber({
        errorHandler : function (error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(compass({
        project : Path.join(__dirname),
        css : 'out/tmp-css',
        sass : 'src/' + name + '/scss',
        image : 'src/' + name + '/img'
      }))
      .pipe(minifyCss())
      .pipe(gulp.dest('out/' + name + '/css/'));
  });

  es.merge.apply(null, sassStreams)
    .on('end', cb);
}

function scriptCompile(cb) {
  var scriptStreams = projects.map(function (name) {
    return browserify('./src/' + name + '/js/app.js')
      .bundle()
      .on('error', function (err) {
        console.log('error', err);
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest('out/' + name + '/js/'));
  });

  es.merge.apply(null, scriptStreams)
    .on('end', cb);
}

function server() {
  browserSync({
    server : {
      baseDir : 'out'
    }
  });

  gulp.watch(['src/*/**'], {}, ['reloader']);
}

function clean(cb) {
  del(['out/'], cb);
}
