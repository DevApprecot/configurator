const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const embedTemplates = require('gulp-angular-embed-templates');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');

const destination = `./dist/`;
const devAppCssDestination = `./src/app/`
const sassFiles = `./src/assets/styles/sass/**/*.scss`;
const assetScripts = `./src/assets/js/!(bootstrap.min | jquery.min | angular.min)*.js`;
const bootstrapScript = `./src/assets/js/bootstrap.min.js`
const jqueryScript = `./src/assets/js/jquery.min.js`;
const angularScript = `./src/assets/js/angular.min.js`
const assetStyles = `./src/assets/styles/css/*.css`
const appScripts = `./src/app/**/!(app.module)*.js`;
const specFiles = `./src/app/**/*.spec.js`;
const appModule = `./src/app/core/app.module.js`
const appCss = `./src/app/app.css`;
const appTemplates = `./src/app/components/**/**/*.html`;
const fonts = `./src/assets/styles/css/fonts/*`;
const appImages = `./src/assets/img/*`;

gulp.task('styles', () => {
	gulp.src(sassFiles)
		.pipe(sass()
			.on('error', sass.logError))
		.pipe(rename('app.css'))
		.pipe(gulp.dest(devAppCssDestination))
})

//Watch task
gulp.task('serve', () => {
	gulp.watch(sassFiles, ['styles']);
})

/** Concat assets js */
gulp.task('assets-scripts', function() {
	return gulp.src([jqueryScript, bootstrapScript, angularScript, assetScripts])
		.pipe(concat('assets.min.js'))
		.pipe(gulp.dest(destination));
});

/**Concat and minify app js */
gulp.task('app-scripts', () => {
	return gulp.src([appModule, appScripts, `!${specFiles}`])
		.pipe(embedTemplates({
			'basePath': './src/'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('app.min.js'))
		.pipe(uglify({
			compress: {
				drop_console: true
			}
		}))
		.pipe(replace('./assets/', './'))
		.pipe(gulp.dest(destination));
})

/**Concat all templates and export as templates.js */
gulp.task('templates', () => {
	return gulp.src(appTemplates)
		.pipe(templateCache('templates.js', {
			module: 'configurator'
		}))
		.pipe(gulp.dest(destination))
})

/**Concat and minify assets styles */
gulp.task('assets-styles', () => {
	return gulp.src(assetStyles)
		.pipe(concat('assets.min.css'))
		.pipe(gulp.dest(destination));
})

/**Copy fonts */
gulp.task('copy-fonts', () => {
	return gulp.src(fonts)
		.pipe(gulp.dest(destination + 'fonts'));
})

/**Copy and minify images */
gulp.task('app-images', () => {
	return gulp.src(appImages)
		.pipe(imagemin())
		.pipe(gulp.dest(destination + 'img'))
});

/**Compile sass minify produced css */
gulp.task('app-styles', ['styles'], () => {
	return gulp.src(appCss)
		.pipe(cleanCSS())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest(destination));
})

/**Build production version */
gulp.task('build', [
'assets-scripts',
'app-scripts',
'assets-styles',
'copy-fonts',
'app-images',
'app-styles'])
