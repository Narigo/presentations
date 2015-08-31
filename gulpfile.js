var gulp = require('gulp');
var gutil = require('gulp-util');

var Path = require('path');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var fs = require('fs');
var browserify = require('browserify');
var ghPages = require('gulp-gh-pages');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var inject = require('gulp-inject');
var es = require('event-stream');

gulp.task('index', buildIndex);
gulp.task('assets', ['index'], assetCopy);
gulp.task('sass', ['assets'], sassCompile);
gulp.task('scripts', scriptCompile);
gulp.task('clean', clean);

gulp.task('reloader', ['build'], reload);
gulp.task('dev', ['build'], server);

gulp.task('build', ['assets', 'sass', 'scripts']);
gulp.task('deploy', ['build'], deployGhPages);
gulp.task('default', ['build']);

var projects = fs.readdirSync('src/presentations');
var outDir = 'out';
var ghPagesDir = '.tmp/publish';

function buildIndex() {
  return gulp.src('src/index.html')
    .pipe(inject(gulp.src('src/presentations/*'), {
      starttag : '<!-- inject:presentations -->',
      transform : function (filePath, file) {
        // return file contents as string
        return '<li><a href="presentations/' + file.relative + '">' + nameFromPath(file.relative) + '</a></li>';
      }
    }))
    .pipe(gulp.dest(outDir));

  function nameFromPath(dirName) {
    return dirName.replace(/-/g, ' ').replace(/\b(\w)(\w+)\b/g,
      function (match, firstLetter, word) {
        return firstLetter.toUpperCase() + word;
      });
  }
}

function assetCopy() {
  return gulp.src([
    'src/**',
    '!src/index.html',
    '!src/presentations/*/js/**',
    '!src/presentations/*/scss',
    '!src/presentations/*/scss/**'])
    .pipe(gulp.dest(outDir));
}

function sassCompile(cb) {
  var sassStreams = projects.map(function (name) {
    return gulp.src('src/presentations/' + name + '/scss/main.scss')
      .pipe(plumber({
        errorHandler : function (error) {
          gutil.log('error while looking at project ' + name);
          gutil.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(compass({
        project : Path.join(__dirname),
        css : '.tmp/css/' + name,
        sass : 'src/presentations/' + name + '/scss',
        image : 'src/presentations/' + name + '/img',
        font : 'src/lib/font'
      }))
      .pipe(plumber({
        errorHandler : function (error) {
          gutil.log('error in minification while looking at project ' + name);
          gutil.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(minifyCss())
      .pipe(gulp.dest(outDir + '/presentations/' + name + '/css/'));
  });

  es.merge.apply(null, sassStreams)
    .on('end', cb);
}

function scriptCompile(cb) {
  var scriptStreams = projects.map(function (name) {
    return browserify('./src/presentations/' + name + '/js/app.js')
      .bundle()
      .on('error', function (err) {
        console.log('error', err);
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest(outDir + '/presentations/' + name + '/js/'));
  });

  es.merge.apply(null, scriptStreams)
    .on('end', cb);
}

function server() {
  browserSync({
    server : {
      baseDir : outDir
    }
  });

  gulp.watch(['src/**'], {}, ['reloader']);
}

function deployGhPages() {
  return gulp.src(outDir + '/**')
    .pipe(ghPages({
      cacheDir : ghPagesDir
    }));
}

function clean(cb) {
  del([outDir, ghPagesDir], cb);
}
