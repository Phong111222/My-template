const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create(),
  reload = browserSync.reload;
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const terser = require("gulp-terser");
gulp.task("MinifySass", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest("dist/css"));
});
// gulp.task("sass", function () {
//   return gulp.src("app/scss/**/*.scss").pipe(sass()).pipe(gulp.dest("app/css"));
// });
gulp.task("js", function () {
  return gulp
    .src("app/js/**/*.js")
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("dist/js"));
});
gulp.task("html", function () {
  gulp.src("*.html").pipe(gulp.dest("app"));
});
gulp.task("watch", function () {
  browserSync.init({
    server: "./app",
    port: 8080,
    host: "app1.example.org",
  });
  gulp
    .watch("app/scss/**/*.scss", gulp.series("MinifySass"))
    .on("change", reload);
  gulp.watch("app/*.html", gulp.series(["html"])).on("change", reload);
  gulp.watch("app/js/**/*.js", gulp.series("js")).on("change", reload);
});
