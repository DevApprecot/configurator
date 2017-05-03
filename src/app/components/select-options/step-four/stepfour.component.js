(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepFour', {
			templateUrl: './app/components/select-options/step-four/stepfour.html',
			controller: StepFourCtrl,
			bindings: {
				imgPath: "@",
				defaultImg: "@"
			},
		});

	StepFourCtrl.$inject = ['Data', 'TAX_FEE', 'RegistrationFee'];

	function StepFourCtrl(Data, TAX_FEE, RegistrationFee) {
		var ctrl = this;
		ctrl.taxFee = TAX_FEE;

		ctrl.calcFee = function() {
			ctrl.regTax = RegistrationFee.calculate(ctrl.family, ctrl.model, ctrl.color, ctrl.equipment.autoEquipments, ctrl.equipment.manualEquipments);
		}

		ctrl.$onInit = function() {

			Object.keys(Data.get)
				.map(val => {
					ctrl[val] = Data.get[val]()
				})

			console.log(ctrl);

		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
