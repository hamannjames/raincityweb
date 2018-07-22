const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge-stream');

const sassFiles = './sass/**/*.scss';
const sassEntry = './sass/style.scss';
const sassDest = '../../public/css';

const jsFooterFiles = './js/footer/**/*.js';
const jsHeaderFiles = './js/header/**/*.js';
const jsDest = '../../public/js';

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

const runHeaderJs = () => {
	const prod = gulp.src(jsHeaderFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('header.rcw.js'))
		.pipe(babel())
		.pipe(minify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(jsDest + '/bin'));

	const stage = gulp.src(jsHeaderFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('header.rcw.js'))
		.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(jsDest + '/src'));

	return merge(prod, stage);
}

const runFooterJs = () => {
	const prod = gulp.src('./js/footer/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('footer.rcw.js'))
		.pipe(babel())
		.pipe(minify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(jsDest + '/bin'));

	const stage = gulp.src('./js/footer/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('footer.rcw.js'))
		.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(jsDest + '/src'));

	return merge(prod, stage);
}

gulp.task('watchSass', () => {
	runSass();

	let watcher = gulp.watch(sassFiles, runSass);

	watcher.on('change', (e) => {
		console.log(`File ${e.path} was ${e.type}`);
	});
});

gulp.task('watchHeaderJs', () => {
	runHeaderJs();

	let watcher = gulp.watch(jsHeaderFiles, runHeaderJs);

	watcher.on('change', (e) => {
		console.log(`File ${e.path} was ${e.type}`);
	});
});

gulp.task('watchFooterJs', () => {
	runFooterJs();

	let watcher = gulp.watch(jsFooterFiles, runFooterJs);

	watcher.on('change', (e) => {
		console.log(`File ${e.path} was ${e.type}`);
	});
});