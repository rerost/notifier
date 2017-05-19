var babelify = require('babelify');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");

gulp.task('browserify', function(){
  var b = browserify({entries: ["./app/client/container/main_container.js"]})
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/build'));
});
