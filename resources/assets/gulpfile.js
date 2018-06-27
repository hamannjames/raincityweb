const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge-stream');

const sassFiles = './sass/**/*.scss';
const sassEntry = './sass/style.scss';
const sassDest = '../../public/css';

const runSass = () => {
	const prod = gulp.src(sassEntry)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
	  .pipe(gulp.dest(sassDest + '/bin'));

	const stage = gulp.src(sassEntry)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(sassDest + '/src'));

	return merge(prod, stage);
}

gulp.task('watchSass', () => {
	runSass();

	let watcher = gulp.watch(sassFiles, runSass);

	watcher.on('change', (e) => {
		console.log(`File ${e.path} was ${e.type}`);
	});
});