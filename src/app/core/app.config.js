(function() {
	'use strict';
	angular.module('configurator')

		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider']

	function config($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('app', {
				url: '/app',
				template: '<app theme="{{base.theme}}"></app>'
			})

			.state('app.select-family', {
				url: '/car/make/:makeId/family',
				template: '<select-family></select-family>'
			})

			.state('app.select-options', {
				url: '/car/make/:makeId/family/:familyId',
				template: '<select-options></select-options>'
			})

			.state('app.select-options.step-one', {
				url: '/model',
				template: '<step-one on-select="$ctrl.selectModel(model)"></step-one>'
			})

			.state('app.select-options.step-two', {
				url: '/model/:modelId/color',
				template: '<step-two on-select="$ctrl.selectColor(colorOptions)"></step-two>'
			})

			.state('app.select-options.step-three', {
				url: '/model/:modelId/color/:colorId/options',
				template: '<step-three on-select="$ctrl.selectEquipment(equipment)"></step-three>'
			})

			.state('app.select-options.step-four', {
				url: '/model/:modelId/color/:colorId/options=selected/synopsis',
				template: '<step-four></step-four>'
			})

		$urlRouterProvider.otherwise('/app/car/make/60/family');

	}
})();
