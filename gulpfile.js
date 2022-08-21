const browserSync = require("browser-sync").create();
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");
const useRef = require("gulp-useref");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const cssnano = require("gulp-cssnano");
const cache = require("gulp-cache");
// const imagemin = require("gulp-imagemin");

function setBrowserSync(cb) {
  browserSync.init({ server: { baseDir: "app" }, notify: false });
  cb();
}

function buildHtml() {
  return src("app/*.html")
    .pipe(useRef())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(dest("dist"));
}

function buildConstant() {
  return src("app/constant/**/*.+(json)").pipe(dest("dist/constant"));
}

function buildImages() {
  return src("app/images/**/*.+(png|jpg|gif|svg)").pipe(dest("dist/images"));
}

function buildJs() {
  return src("app/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist/js", { sourcemaps: "." }))
    .pipe(browserSync.stream({ server: true }));
}

function watchStyles() {
  return src("app/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("app/css", { sourcemaps: "." }))
    .pipe(browserSync.stream({ server: true }));
}

function buildStyles() {
  return src("app/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("dist/css", { sourcemaps: "." }))
    .pipe(browserSync.stream({ server: true }));
}

function watchTask(cb) {
  watch("app/*.html").on("change", browserSync.reload);
  watch("app/js/**/*.js", buildJs);
  watch("app/scss/**/*.scss", watchStyles);
}

exports.default = series(
  buildHtml,
  watchStyles,
  buildImages,
  setBrowserSync,
  watchTask
);

exports.build = series(buildHtml, buildStyles, buildImages, buildConstant);
