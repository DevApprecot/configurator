(function() {
	'use strict';

	angular
		.module('configurator')
		.component('manualEquipmentForm', {
			templateUrl: './app/components/select-options/step-three/manual-equipment-form/manualequipment.html',
			controller: ManualEquipmentFormCtrl,
			bindings: {
				onSelect: "&"
			},
		});

	ManualEquipmentFormCtrl.$inject = [];

	function ManualEquipmentFormCtrl() {
		var ctrl = this;
		ctrl.equipment = {};
		ctrl.clearForm = function() {
			ctrl.equipment = null;
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
