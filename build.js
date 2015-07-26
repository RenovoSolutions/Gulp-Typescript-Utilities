var _ = require('lodash');

var lint = require('./lint');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');

var defaults = require('./defaults');

var runSequence = require('run-sequence');

// locations: {
//     source: 'source',
//     libraries: 'libraries',
//     assets: 'assets',
//     debug: 'debug',
//     release: 'release',
// }
exports.config = function(gulp, locations, useLint, includeLibraries) {
	if (_.isUndefined(useLint)) {
		useLint = true;
	}

	if (_.isUndefined(includeLibraries)) {
		includeLibraries = true;
	}

	locations = _.extend(defaults(), locations);

	lint.config(gulp, locations);
	clean.config(gulp, locations);
	compile.config(gulp, locations);
	copy.config(gulp, locations, includeLibraries);

	gulp.task('build', ['build.debug']);

	gulp.task('build.debug', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.debug',
						'compile.debug',
						'copy.debug',
						done);
		} else {
			runSequence('clean.debug',
						'compile.debug',
						'copy.debug',
						done);
		}
	});

	gulp.task('build.release', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.release',
						'compile.release',
						'copy.release',
						done);
		} else {
			runSequence('clean.release',
						'compile.release',
						'copy.release',
						done);
		}
	});

	gulp.task('build.library', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.library',
						'compile.library',
						'copy.library',
						done);
		} else {
			runSequence('clean.library',
						'compile.library',
						'copy.library',
						done);
		}
	});
};
