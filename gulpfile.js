var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    to5ify = require('6to5ify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    mustache = require('gulp-mustache'),
    fs = require('fs-extra');


var dataObj = function () {
    // Function for Get GUID
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    // Get App Configuration
    var configFile = fs.readFileSync('./config.json'),
        configObj = JSON.parse(configFile);

    // Get List of Cartoons form Attachment
    var dataArray = fs.readdirSync('./attachment'),
        regex = /^[.]/g,
        dataList = [],
        categoryList = [];

    var sortByDate = function (a, b) {
        if ( a.date < b.date ) {
            return -1;
        } else if ( a.date > b.date ) {
            return 1;
        } else {
            return 0;
        }
    };

    dataArray.forEach(function(data){
        if ( ! regex.test(data) ) {
            var id = guid(),
                splitedData = data.split('.'),
                format = splitedData[1],
                fileName = splitedData[0],
                splitedFileName = fileName.split('_');
            if ( splitedFileName.length === 3 ) {
                // set data lists
                dataList.push({
                    'id' : id,
                    'fullName' : fileName,
                    'date' : splitedFileName[0],
                    'category' : splitedFileName[1],
                    'name' : splitedFileName[2],
                    'format' : format
                });
                // set category lists
                if( categoryList.indexOf(splitedFileName[1]) === -1 ) {
                    categoryList.push(splitedFileName[1]);
                }
            }
            dataList.sort(sortByDate).reverse();
        }
    });

    // Collapsing Data;
    var dataObj = {
        'config' : configObj,
        'data' : dataList,
        'category' : categoryList
    };

    return dataObj;
};

gulp.task('browserify', function () {
    watchify(browserify('./src/js/app.js'))
        .transform(to5ify)
        .bundle()
        .on('error', function (err) {
            console.error(err.message);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('/map'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('template', function () {
    return gulp.src("./src/template/*.html")
        .pipe(mustache(dataObj()))
        .pipe(gulp.dest("./dist/view"));
});

gulp.task('copyAttachmentToDist', function () {
    console.log('Coping...');
    fs.copy('./attachment', './dist/attachment', function (err) {
        if (err) return console.error(err)
        console.log("success!")
    });
});

gulp.task('default', ['browserify', 'sass', 'template']);

gulp.task('watch', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: false,
            port: 9999,
            fallback: '/dist/view/index.html'
        }));
    gulp.start('default');
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch(['./src/scss/*.scss', './src/scss/**/*.scss', './src/scss/**/**/*.scss'], ['sass']);
    gulp.watch('./src/template/*.html', ['template']);
});

gulp.task('build', ['default', 'copyAttachmentToDist']);