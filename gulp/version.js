var _ = require('lodash');
var jsonfile = require('jsonfile');
var thenify = require('thenify');
var args = require('yargs')
	.alias('v', 'version')
	.argv;

var readJson = thenify(jsonfile.readFile);
var writeJson = thenify(jsonfile.writeFile);

var packageFile = 'package.json';

exports.config = function(gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	gulp.task('version', () => {
		var versionStr = args.version;
		return exports.version(versionStr)
			.then(() => {
				console.log('Version changed to ' + versionStr);
			});
	});
};

exports.version = (version) => {
	return readJson(packageFile)
		.then(package => {
			package.version = version;
			return writeJson(packageFile, package, { spaces: 2 });
		});
};
