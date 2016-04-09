var scss_path = "_src/scss/";
var css_path = "css/";

var gulp            = require('gulp'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    data            = require('gulp-data'),

    sass            = require('gulp-sass'),
    cmq             = require('gulp-combine-media-queries'),
    cssnano         = require('gulp-cssnano'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),

    watch           = require('gulp-watch');

// Clear caching in Data files
function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}

// Show the error in the console and keep watching
function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}


gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure(['_src/templates/']);

    // Gets .html and .nunjucks files in pages
    return gulp.src('./_src/pages/**/*.+(html|nunjucks|njk)')
        // get data files
        .pipe(data(function(file) {
            return requireUncached('./_src/data/terreiro-barreiro.json')
        }))
        .pipe(data(function(file) {
            return requireUncached('./_src/data/barreiro-terreiro.json')
        }))
        // Renders template with nunjucks
        .pipe(nunjucksRender())
        .on('error', swallowError)
        // output files in app folder
        .pipe(gulp.dest('./'))
});


gulp.task('styles', function() {

    gulp.src([scss_path +'main.scss'])

        .pipe(plumber())

        .pipe(sass({
            style: 'expanded',
            onError: function(err) {
                return notify({
                    title: "Sass error"
                }).write(err);
            }
        }))
        .pipe(gulp.dest(css_path))

        .pipe(cmq({
            log: false
        }))
        .pipe(gulp.dest(css_path))

        .pipe(cssnano())
        .pipe(gulp.dest(css_path))

        .pipe(notify({
            title: "Gulp sass",
            message: 'Great success!'
        }))

});



gulp.task('watch', function() {
    gulp.watch('_src/**/*.njk', ['nunjucks']);
    gulp.watch(scss_path +'**/*.scss', ['styles']);

});
gulp.task('default', ['watch'], function() {

});
