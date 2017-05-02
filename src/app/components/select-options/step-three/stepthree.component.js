(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepThree', {
			templateUrl: './app/components/select-options/step-three/stepthree.html',
			controller: StepThreeCtrl,
			bindings: {
				onSelect: "&",
				imgPath: "@",
				defaultImg: "@"
			},
		});

	StepThreeCtrl.$inject = ['API', 'Data'];

	function StepThreeCtrl(API, Data) {
		var ctrl = this;
		ctrl.manualEquipments = [];

		var _getEquipment = getEquipment;

		ctrl.$onInit = function() {
			ctrl.family = Data.get.family();
			ctrl.model = Data.get.model();
			_getEquipment();
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		ctrl.addEquipment = function(equipment) {
			console.log(equipment);
			ctrl.manualEquipments.push(equipment);
		}

		ctrl.removeEquipment = function(idx) {
			ctrl.manualEquipments.splice(idx, 1);
		}

		function getEquipment() {
			API.options()
				.then(resp => {
					ctrl.equipment = resp.data.map(val => {
						if (!val.Photo)
							val.Photo = Data.get.color()
							.Photo;

						return val;
					});;
					console.log(ctrl.equipment);
				}, resp => {
					console.log('Failed to get equipment', resp);
				})
		}
	}
})();
