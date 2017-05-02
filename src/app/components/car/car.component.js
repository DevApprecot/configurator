(function() {
	'use strict';

	angular
		.module('configurator')
		.component('car', {
			templateUrl: './app/components/car/car.html',
			controller: CarCtrl,
			bindings: {
				car: '<',
				onSelect: '&'
			},
		});

	CarCtrl.$inject = ['DEFAULT_CAR_IMAGE', 'IMAGES_PATH'];

	function CarCtrl(DEFAULT_CAR_IMAGE, IMAGES_PATH) {
		var ctrl = this;
		ctrl.defaultImg = DEFAULT_CAR_IMAGE.url;
		ctrl.imgPath = IMAGES_PATH.url;

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
