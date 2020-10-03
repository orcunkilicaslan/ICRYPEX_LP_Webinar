const   gulp                      = require('gulp'),
        del                       = require('del'),
        sourcemaps                = require('gulp-sourcemaps'),
        plumber                   = require('gulp-plumber'),
        sass                      = require('gulp-sass'),
        autoprefixer              = require('gulp-autoprefixer'),
        cssnano                   = require('gulp-cssnano'),
        babel                     = require('gulp-babel'),
        webpack                   = require('webpack-stream'),
        uglify                    = require('gulp-uglify'),
        concat                    = require('gulp-concat'),
        browserSync               = require('browser-sync').create(),

        folder_assets_main        = './assets/',
        folder_src_main           = folder_assets_main + 'src/',
        folder_dist_main          = folder_assets_main + 'dist/',

        folder_node_modules       = './node_modules/',
        folder_dist_node_modules  = folder_assets_main + 'vendor/',

        node_dependencies         = Object.keys(require('./package.json').dependencies || {});

/* LANDINGPAGE START */
gulp.task('sass-core', () => {
    return gulp.src([
        folder_src_main + 'scss/core/**/core.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            flexbox: 'no-2009'
        }))
        .pipe(cssnano({
            reduceIdents: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(concat('core.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(folder_dist_main + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('script-core', () => {
    return gulp.src([
        folder_src_main + 'script/core/**/core.js',
        folder_src_main + 'script/core/**/validations-homepage-register.js'
    ])
        .pipe(plumber())
        .pipe(webpack({
            mode: 'production'
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [ '@babel/env' ]
        }))
        .pipe(concat('core.js'))
        .pipe(uglify('core.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(folder_dist_main + 'js'))
        .pipe(browserSync.stream());
});
/* LANDINGPAGE END */

/* GENERAL START */
gulp.task('clear', () => del([ folder_dist_main, folder_dist_node_modules ]));

gulp.task('vendor', () => {
    if (node_dependencies.length === 0) {
        return new Promise((resolve) => {
            console.log("No dependencies specified");
            resolve();
        });
    }

    return gulp.src(node_dependencies.map(dependency => folder_node_modules + dependency + '/**/*.*'), { base: folder_node_modules })
        .pipe(gulp.dest(folder_dist_node_modules))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    return browserSync.init({
        server: {
            baseDir: [ './' ],
            index: "index.html",
            https: false,
            port: 3000
        },
        //open: "local",
        callbacks: {
            /**
             * This 'ready' callback can be used
             * to access the Browsersync instance
             */
            ready: function(err, bs) {

                // example of accessing URLS
                console.log(bs.options.get('urls'));

                // example of adding a middleware at the end
                // of the stack after Browsersync is running
                bs.addMiddleware("*", function (req, res) {
                    res.writeHead(302, {
                        location: "404.html"
                    });
                    res.end("Redirecting!");
                });
            }
        }
    });
});

gulp.task('watch', () => {
    const watchVendor = [];

    node_dependencies.forEach(dependency => {
        watchVendor.push(folder_node_modules + dependency + '/**/*.*');
    });

    const watch = [
        folder_src_main + 'sass/**/*.scss',
        folder_src_main + 'sass/**/*.sass',
        folder_src_main + 'script/**/*.js'
    ];

    gulp.watch(watch, gulp.series('devel')).on('change', browserSync.reload);
    gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});
/* GENERAL END */

/* GULP START */
gulp.task('landingpage', gulp.series('sass-core', 'script-core'));

gulp.task('build', gulp.series('clear', 'vendor', 'landingpage'));
gulp.task('devel', gulp.series('landingpage', gulp.parallel('watch')));

gulp.task('start', gulp.series('build', gulp.parallel('serve', 'watch')));
gulp.task('default', gulp.series('build', 'devel'));
/* GULP END */