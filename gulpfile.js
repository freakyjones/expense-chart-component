const browserSync = require("browser-sync").create();
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");
function setBrowserSync(cb) {
  browserSync.init({ server: { baseDir: "app" }, notify: false });
  cb();
}

function buildJs() {
  return src("app/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(browserSync.stream({ server: true }));
}
function buildStyles() {
  return src("app/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("app/css", { sourcemaps: "." }))
    .pipe(browserSync.stream({ server: true }));
}
function watchTask(cb) {
  watch("app/*.html").on("change", browserSync.reload);
  watch("app/js/**/*.js", buildJs);
  watch("app/scss/**/*.scss", buildStyles);
}

exports.default = series(buildStyles, setBrowserSync, watchTask);
