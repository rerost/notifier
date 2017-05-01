var babelify = require('babelify');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");

const client  = ["./app/client/column.jsx", "./app/client/main.jsx", "./app/client/table.jsx"]
const service = ['./app/service/github.js', "./app/service/event.js"]

gulp.task('browserify', function(){
  var b = browserify({entries: client.concat(service)})
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/build'));
});
