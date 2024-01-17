const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')

function compilaSass(){
  return gulp.src('./source/styles/main.scss') // seleciona o arquivo .scss
    .pipe(sourcemaps.init()) // inicia o mapeamento do arquivo .scss 
    .pipe(sass({
      outputStyle: 'compressed' // comprime o arquivo .css
    }))
    .pipe(sourcemaps.write('./maps')) // escreve o arquivo .css mapeado
    .pipe(gulp.dest('./build/styles')) // salva o arquivo .css na pasta build
}

function comprimeJavaScript() {
  return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
}

function comprimeImagens() {
  return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

exports.default = function(){
  gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass)) // monitora alterações nos arquivos .scss e executa a função compilaSass
  gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript))
  gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens))
}
