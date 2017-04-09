var babelify = require('babelify');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");

gulp.task('browserify', function(){
  var b = browserify({entries: ["./app/client/column.jsx", "./app/client/main.jsx", "./app/client/table.jsx"]})
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/build'));
});
