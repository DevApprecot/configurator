(function() {
	'use strict';
	angular.module('configurator')

		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider']

	function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

		$stateProvider

			.state('app', {
				url: '/app/{editId}endpoint={apiUrl}&redirectionPath={redirectPath}',
				template: '<app theme="{{base.theme}}"></app>'
			})

			.state('app.select-family', {
				url: '/car/make/:makeId/family/',
				template: '<select-family on-select="$ctrl.selectFamily(family)"></select-family>'
			})

			.state('app.select-options', {
				url: '/car/make/:makeId/family/:familyId',
				template: '<select-options current-price="{{$ctrl.car.price}}" on-price-update="$ctrl.updatePrice(price)" on-model-select="$ctrl.selectedModel()"></select-options>'
			})

			.state('app.select-options.step-one', {
				url: '/model',
				template: '<step-one default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}" on-select="$ctrl.selectModel(model)"></step-one>'
			})

			.state('app.select-options.step-two', {
				url: '/model/:modelId/color',
				params: {
					colors: []
				},
				template: '<step-two default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}" on-select="$ctrl.selectColor(colorOptions)"></step-two>'
			})

			.state('app.select-options.step-three', {
				url: '/model/:modelId/color/:colorId/options',
				template: '<step-three default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}" on-select="$ctrl.selectEquipment(equipment)"></step-three>'
			})

			.state('app.select-options.step-four', {
				url: '/model/:modelId/color/:colorId/options=selected/synopsis',
				template: '<step-four is-submitted="{{$ctrl.isSubmitted}}" default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}"></step-four>'
			})

		$urlRouterProvider.otherwise(function($injector, $location) {
			$injector.invoke(['$state', function($state) {
				$state.go('app.select-family', {
					editId:'',
					apiUrl: 'apiMissing',
					redirectPath: 'redirectPathMissing',
					makeId: 60
				});
 			 }]);
		});

		/**
		 * Dev access:
		 * 
		 * apiUrl: https:**karenta-onedealer.kosmocar.gr
		 */

	}
})();
