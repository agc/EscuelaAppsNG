var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	bowerFiles = require('gulp-bower-files'),
	inject = require('gulp-inject')

gulp.task('injectFiles', function(){
	// get main bower files
	var files = bowerFiles()

	gulp.src('index.html', { cwd: './public' })
        // inject into index.html
		.pipe(inject(files, {
            read: false,
            ignorePath: '/public'
        }))
        .pipe(gulp.dest("./public"))
})

gulp.task('compileSass', function(){
	// gives some wack error.
	// gulp.src('public/stylesheets/style.scss')
	// 	.pipe(plumber())	// prevent pipe breaking caused by errors from gulp plugins
	// 	.pipe(sass())
	// 	.pipe(gulp.dest('public/stylesheets'))
})

// recompile on file update
gulp.task('watch', function(){
	// gulp.watch('public/stylesheets/*.scss', ['compileSass'])
})

gulp.task('default', ['injectFiles', 'compileSass', 'watch'])