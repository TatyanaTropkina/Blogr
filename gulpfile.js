let project_folder = 'dist';

let fs = require('fs');
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        scss: project_folder + "/scss/",
        js: project_folder + "/js/",
        images: project_folder + "/images/",
    },
    src: {
        html: ["app/*.html", "!app/_*.html"],
        scss: "app/scss/**/*.scss",
        js: ["app/js/**/*.js", '!app/js/**/webp.js'],
        images: "app/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
}

let {
    src,
    dest
} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require("gulp-file-include"),
	sass = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require("gulp-group-css-media-queries"),
	uglify = require('gulp-uglify-es').default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webp-css"),
    clean_css = require("gulp-clean-css");

	function watchFiles(params) {
		gulp.watch(['app/*.html'], html);
		gulp.watch(['app/scss/*.scss'], scss);
		gulp.watch(['app/js/*.js'], js);
		gulp.watch(['app/images/**/*.{jpg,png,svg,gif,ico,webp}'], images);

	}
	
	
	function browserSync(params) {
		browsersync.init({
			server: {
				baseDir: "./dist/"
			},
			port: 3000,
		})
	}
	function html() {
		return src(path.src.html)
			.pipe(fileinclude())
			.pipe(webphtml())
			.pipe(dest(path.build.html))
			.pipe(browsersync.stream())
	}

	function css() {
		return gulp.src([
			'node_modules/normalize.css/normalize.css',
	])
			.pipe(concat('_libs.scss'))
			.pipe(dest('app/scss'))
			.pipe(browsersync.stream())
	}
	
	function scss() {
		return src(path.src.scss)
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer({
				overrideBrowserslist: ['last 5 versions']
			}))
			.pipe(group_media())
			.pipe(webpcss())
			
			.pipe(clean_css())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(dest(path.build.css))
			.pipe(browsersync.stream())
	}	
	function addScript() {
		return gulp.src([
			'app/js/webp.js',
	])
			.pipe(concat('libs.min.js'))
			.pipe(uglify())
			.pipe(dest('app/js'))
			.pipe(dest(path.build.js))
			.pipe(browsersync.stream())
	}
	function js() {
		return src(['app/js/main.js'])
		.pipe(fileinclude())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
			.pipe(dest(path.build.js))
			.pipe(browsersync.stream())
		
	}
	function images() {
		return src(path.src.images)
			.pipe(webp({
					quality: 70
				}))
			.pipe(dest(path.build.images))

			.pipe(src(path.src.images))
			.pipe(imagemin([
					imagemin.gifsicle({interlaced: true}),
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 3}),
				]))
			.pipe(dest(path.build.images))
			.pipe(browsersync.stream())
	}

	function clean(params) {
		return del('./dist/');
	}
	function cb() {

	}
	let build = gulp.series(clean, gulp.parallel(js, scss, css, html, images, addScript));
	let watch = gulp.parallel(build, watchFiles, browserSync);

exports.addScript = addScript;
exports.js = js;
exports.images = images;
exports.css = css;
exports.scss = scss;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;