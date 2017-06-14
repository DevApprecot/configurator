// Karma configuration
// Generated on Wed Jun 14 2017 11:46:24 GMT+0300 (GTB Summer Time)

const core = [
  `./src/app/core/app.module.js`
]

const libraries = [
   `./node_modules/angular/angular.min.js`,
  `./node_modules/angular-mocks/angular-mocks.js`,
  `./node_modules/angular-ui-router/release/angular-ui-router.min.js`,
  `./node_modules/angular-i18n/angular-locale_el-gr.js`,
  `./node_modules/ngstorage/ngStorage.min.js`,
  `./node_modules/angular-loading-bar/build/loading-bar.min.js`,
  `./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js`,
  `./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js`,
  `./node_modules/angular-input-masks/releases/angular-input-masks-dependencies.min.js`,
  `./node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js`
]

const test1 = [
  `./src/app/services/registration-fee.service.js`,
  `./src/app/services/registration-fee.service.spec.js`
]

const karmaReadJson = [`./node_modules/karma-read-json/karma-read-json.js`];

const jsonFiles = [{ pattern: 'src/app/unit-test-data/*.json', watched: true, served: true, included: false }]

const includedFiles = libraries.concat(core, karmaReadJson, jsonFiles, test1);

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: includedFiles,

		// list of files to exclude
		exclude: [
    ],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
}
