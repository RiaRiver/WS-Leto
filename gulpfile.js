const {
  src,
  dest,
  watch,
  series
} = require('gulp')
const gulp = require('gulp')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const minifyJS = require('gulp-minify')
const htmlmin = require('gulp-htmlmin')
const tinypng = require('gulp-tinypng-compress')

// Static server
function bs () {
  serveSass()
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  })
  watch('./src/*.html').on('change', browserSync.reload)
  watch('./src/sass/**/*.sass', serveSass)
  watch('./src/sass/**/*.scss', serveSass)
  watch('./src/js/*.js').on('change', browserSync.reload)
}

function serveSass () {
  return src('./src/sass/**/*.sass')
    .pipe(sass())
    .pipe((autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })))
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream())
}

function buildCSS (done) {
  src('src/css/**/**.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css'))
  done()
}
function buildJS (done) {
  src(['src/js/**.js', '!src/js/**.min.js'])
    .pipe(minifyJS({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(dest('dist/js'))
  src('src/js/**.min.js')
    .pipe(dest('dist/js'))
  done()
}

function buildHTML (done) {
  src('src/**.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'))
  done()
}

function buildPHP (done) {
  src('src/**.php')
    .pipe(dest('dist/'))

  src('src/phpmailer/**/**')
    .pipe(dest('dist/phpmailer'))
  done()
}

function buildFonts (done) {
  src('src/fonts/**/**')
    .pipe(dest('dist/fonts'))
  done()
}

function buildImg (done) {
  src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'S1TbQQp1P2FZSGkMLvHKJCGy4HF0Kz1W'
    }))
    .pipe(dest('dist/img/'))

  src('src/img/**/*.{svg,ico}')
    .pipe(dest('dist/img/'))
  done()
}

function depl () {
  var conn = ftp.create({
    host: '136.243.147.150',
    user: 'riari847',
    password: 'mYqJ83ALHp',
    parallel: 10,
    log: gutil.log
  })

  var globs = [
    'dist/**'
  ]
  return gulp.src(globs, { buffer: false })
    .pipe(conn.dest('/www/riariver.ru/leto'))
}

exports.server = bs
exports.build = series(buildCSS, buildJS, buildHTML, buildPHP, buildFonts, buildImg)
exports.deploy = depl
