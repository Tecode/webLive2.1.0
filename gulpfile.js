/*
 * gulp配置文件,采用Es6语法
 * */
const gulp = require('gulp'),
    uglify = require('gulp-uglify'),//js压缩
    cleancss = require('gulp-clean-css'),//css压缩
    rename = require('gulp-rename'),//重命名
    htmlmin = require('gulp-htmlmin'),//压缩html
    cshtmlmin = require('gulp-minify-cshtml'),//压缩cshtml
    imagemin = require('gulp-imagemin');//图片压缩

//文件地址定义
const config = {
    //数组传多个
    jsFiles: [
        'js/webLive.im.js'
    ],
    cssFiles: [],
    htmlFiles: []
};
//文件保存地址
const paths = {
    root: './',//
    build: {
        root: 'build/',
        styles: 'build/css/',
        scripts: 'build/js/'
    },
    custom: {
        root: 'custom/',
        styles: 'custom/css/',
        scripts: 'custom/js/'
    },
    dist: {
        root: 'dist/',
        styles: 'dist/css/',
        scripts: 'dist/js/'
    },
    playground: {
        root: 'playground/'
    },
    source: {
        root: 'src/',
        styles: 'src/less/',
        scripts: 'src/js/*.js'
    },
};

//压缩混淆js
gulp.task('jsmin', () => {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）//!src/js/**/{test1,test2}.js'
    //['src/js/*.js', '!src/js/**/{test1,test2}.js']   匹配文件夹下所有js
    return gulp.src(config.jsFiles)
        .pipe(rename({
            // dirname: "main/text/ciao",
            // basename: "aloha",
            // prefix: "bonjour-",
            suffix: ".min"
            // extname: ".md"
        }))
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require', 'exports', 'module', '$']}//排除混淆关键字
        }))
        .pipe(gulp.dest('dist'));
});

//压缩css
gulp.task('cleancss', () => {
    return gulp.src('css/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(rename({
            // dirname: "main/text/ciao",
            // basename: "aloha",
            // prefix: "bonjour-",
            suffix: ".min"
            // extname: ".md"
        }))
        .pipe(gulp.dest('dist'));
});

//压缩图片
gulp.task('imagemin', () => {
        gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
    }
);

//压缩html
gulp.task('htmlmin', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

//压缩cshtml
gulp.task('cshtmlmin',() =>{
    gulp.src('./Views/**/(!(*.min.cshtml)|*.cshtml)')
        .pipe(minifyCshtml({
            comments: true,       // Remove HTML comments <!-- -->
            razorComments: true,  // Remove Razor comments @* *@
            whitespace: true      // Remove white-space
        }))
        .pipe(gulp.dest('./Views/**/*.min.cshtml'));
});