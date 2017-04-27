(function() {
	'use strict';
	angular.module('configurator')

		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider']

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('app', {
				url: '/app',
				template: '<app></app>'
			})

			.state('app.select-family', {
				url: '/car/family',
				template: '<select-family></select-family>'
			})

			.state('app.select-options', {
				url: '/car/family/:familyId',
				template: '<select-options></select-options>'
			})

			.state('app.select-options.step-one', {
				url: '/car/family/:familyId/step-1',
				template: '<step-one></step-one>'
			})

			.state('app.select-options.step-two', {
				url: '/car/family/:familyId/step-2',
				template: '<step-two></step-two>'
			})

			.state('app.select-options.step-three', {
				url: '/car/family/:familyId/step-3',
				template: '<step-three></step-three>'
			})

			.state('app.select-options.step-four', {
				url: '/car/family/:familyId/step-4',
				template: '<step-four></step-four>'
			})

		$urlRouterProvider.otherwise('/app/car/family');

	}
})();
