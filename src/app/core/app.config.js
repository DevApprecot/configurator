(function() {
	'use strict';
	angular.module('configurator')

		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider']

	function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

		// function myEncode(val) {
		// 	return val !== null ? encodeURIComponent(val.toString()) : val;
		// }

		// function myDecode(val) {
		// 	return val !== null ? decodeURIComponent(val.toString()) : val;
		// }

		// $urlMatcherFactoryProvider.type("uri", {
		// 	encode: myEncode,
		// 	decode: myDecode,
		// 	is: function() { return true; }
		// });

		$stateProvider

			.state('app', {
				url: '/app/submit-param={redirectUrl}',
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
				template: '<step-two default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}" on-select="$ctrl.selectColor(colorOptions, isNextSelected)"></step-two>'
			})

			.state('app.select-options.step-three', {
				url: '/model/:modelId/color/:colorId/options',
				template: '<step-three default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}" on-select="$ctrl.selectEquipment(equipment, isNextSelected)"></step-three>'
			})

			.state('app.select-options.step-four', {
				url: '/model/:modelId/color/:colorId/options=selected/synopsis',
				template: '<step-four default-img="{{$ctrl.defaultImg}}" img-path="{{$ctrl.imgPath}}"></step-four>'
			})

		$urlRouterProvider.otherwise(function($injector, $location) {
			$injector.invoke(['$state', function($state) {
				$state.go('app.select-family', { redirectUrl: 'missing', makeId: 60 });
 			 }]);
		});

		// $urlMatcherFactory.type('url', {
		// 	encode:
		// })

	}
})();
