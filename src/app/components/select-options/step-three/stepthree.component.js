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

	StepThreeCtrl.$inject = ['$stateParams', 'API', 'Data'];

	function StepThreeCtrl($stateParams, API, Data) {
		var ctrl = this;
		ctrl.selectedItems = [];
		ctrl.manualEquipments = [];

		ctrl.gotEquipments = false;

		ctrl.$onInit = function() {
			ctrl.family = Data.get.family();
			ctrl.model = Data.get.model();
			ctrl.getEquipment();
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		ctrl.addEquipment = function(equipment) {
			ctrl.manualEquipments.push(equipment);

			ctrl.onSelect({
				equipment: {
					autoEquipments: ctrl.selectedItems,
					manualEquipments: ctrl.manualEquipments
				},
				isNextSelected: false
			})
		}

		ctrl.removeEquipment = function(idx) {
			ctrl.manualEquipments.splice(idx, 1);

			ctrl.onSelect({
				equipment: {
					autoEquipments: ctrl.selectedItems,
					manualEquipments: ctrl.manualEquipments
				},
				isNextSelected: false
			})
		}

		ctrl.getEquipment = function() {
			API.options($stateParams.modelId)
				.then(resp => {
					ctrl.equipment = resp.data.listOfData.map(val => {
						if (!val.Photo)
							val.Photo = Data.get.color()
							.Photo;

						return val;
					});

					console.log(ctrl.equipment);
				}, resp => {
					console.log('Failed to get equipment', resp);
				})
				.then(() => { ctrl.gotEquipments = true });
		}

		ctrl.toggleSelect = function(equipment) {

			let idx = ctrl.selectedItems.findIndex(item => item.OptionCode == equipment.OptionCode);

			if (idx !== -1)
				ctrl.selectedItems.splice(idx, 1)

			else
				ctrl.selectedItems.push(equipment);

			ctrl.onSelect({
				equipment: {
					autoEquipments: ctrl.selectedItems,
					manualEquipments: ctrl.manualEquipments
				},
				isNextSelected: false
			})
		}

		ctrl.isSelected = function(OptionCode) {
			return ctrl.selectedItems.filter(item => item.OptionCode == OptionCode)
				.length;
		}
	}
})();
