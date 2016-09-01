/* Created by Vasiliy on 2/20/2015. */
/* jshint camelcase:false */
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy : true});

var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.allJsFiles)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('clean-build', function(done) {
    var delConfig = [].concat(config.build, config.deploy);
    return clean(delConfig, done);
});

gulp.task('images', ['clean-build', 'copy-index'], function() {
    log('Copying  the images ' + config.images);
    return gulp.src(config.images)
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('fonts', ['images'], function () {
    log('Copying fonts');
    config.fonts.forEach(function (font) {
        gulp.src(font.from).pipe(gulp.dest(font.to));
    });
});

gulp.task('templatecache', ['fonts'], function () {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmlTemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.build + 'js'));
});


gulp.task('wiredep-build', ['templatecache'], function () {
    return wiredep(config);
});

gulp.task('optimize', ['wiredep-build'], function () {
    log('Optimizing the javascript, css, html');
    var useref = $.useref({searchPath: './'});
    var templateCache = config.build + 'js/' + config.templateCache.file;
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsLibFilter = $.filter('**/lib.js', {restore: true});
    var jsAppFilter = $.filter('**/app.js', {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->',
            ignorePath: '/build/',
            removeTags: true
        }))

        .pipe(useref)

        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)

        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)

        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)

        .pipe(gulp.dest(config.build));
});

gulp.task('revision', ['optimize'], function () {
    return gulp.src(['./build/**/*.css', './build/**/*.js'])
            .pipe($.rev())
            .pipe(gulp.dest('./build'))
            .pipe($.revNapkin())
            .pipe($.rev.manifest())
            .pipe(gulp.dest('./build'));
});

gulp.task('rev-replace', ['revision'], function() {
    var manifest = gulp.src(config.build + 'rev-manifest.json');
    return gulp
            .src(config.build + 'index.html')
            .pipe($.revReplace({manifest: manifest}))
            .pipe(gulp.dest(config.build));
});

gulp.task('build', ['rev-replace']);

gulp.task('serve-build', ['build'], function(done) {
    process.env.NODE_ENV = 'build';
    serve(done);
});

/**
 * serve the dev environment
 */
gulp.task('copy-index', function () {
    log(config.index);
    return gulp.src(config.indexDev)
            .pipe($.rename('index.html'))
            .pipe(gulp.dest(config.client));
});

gulp.task('wiredep-dev', ['copy-index'], function () {
    return wiredep(config);
});

gulp.task('serve-dev',  ['wiredep-dev'], function(done) {
    process.env.NODE_ENV = 'dev';
    serve(done);
});

gulp.task('default', ['serve-dev']);

////////////////////////

function serve (cb) {
    require('./src/server/app');
    var watchFiles = ['./client/**/*.html', './client/**/*.js', './client/**/*.css'];
    var options = {
        proxy: 'localhost:3010/', // port is defined in server/server.js
        port: 3000, // must be 3000 because it allowed on api server (localhost:3000)
        ghostMode: {
            forms: true,
            clicks: true,
            scroll: true,
            location: true
        },
        browser: [
            'chrome'
            //'firefox'
        ],
        files: watchFiles,
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'test-task',
        reloadDelay: 0,
        notify: false // if true - issue for protractor, the hindrance for clicking on login button on landing pag
    };
    browserSync.init(options);
    return cb();
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function wiredep(config) {
    log('Wire up the bower css js and our app js into the html');

    var options = config.wiredepDefaultOptions;
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
}