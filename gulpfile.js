const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const changed = require('gulp-changed');
const notify = require('gulp-notify');

const path = {
  src : './src/',
  dist: './dist/',
};

gulp.task('imagemin', () => {
  return gulp.src(`${path.src}**/*.{png,jpg}`)
    .pipe(changed(path.dist))
    .pipe(imagemin([
      pngquant({
        quality: '65-80',
        speed: 1, // 最低のスピード
        floyd: 0, // ディザリングなし
      }),
      mozjpeg({
        quality: 85,
        progressive: true,
      })
    ], {
      verbose: true,
    }))
    .pipe(imagemin()) // メタ情報を削除
    .pipe(gulp.dest(path.dist));
});