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

			.state('app.select-model', {
				url: '/car/family/:familyId/model',
				template: '<select-model></select-model>'
			})

			.state('app.select-options', {
				url: '/car/family/:familyId/model/:modelId',
				template: '<select-options></select-options>'
			})

		$urlRouterProvider.otherwise('/app/car/family');

	}
})();
