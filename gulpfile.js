'use strict';

var metal = require('gulp-metal');

metal.registerTasks({
	bundleCssFileName: 'dropdown.css',
	bundleFileName: 'dropdown.js',
	globalName: 'crystal',
	mainBuildJsTasks: ['build:globals'],
	moduleName: 'crystal-dropdown'
});
