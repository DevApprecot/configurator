(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectOptions', {
			templateUrl: './app/components/select-options/selectoptions.html',
			controller: SelectOptionsCtrl,
			bindings: {},
		});

	SelectOptionsCtrl.$inject = ['$state', 'Data'];

	function SelectOptionsCtrl($state, Data) {
		var ctrl = this;

		ctrl.selectModel = function(model) {
			ctrl.model = model;
			ctrl.completedSteps[0] = true;

			Data.set.model(model);
			Data.set.steps(ctrl.completedSteps);

			$state.go('app.select-options.step-two', { modelId: model.Code });
		};

		ctrl.selectColor = function(colorOptions) {
			ctrl.color = colorOptions;
			ctrl.completedSteps[1] = true;

			Data.set.color(colorOptions);
			Data.set.steps(ctrl.completedSteps);

			$state.go('app.select-options.step-three', { modelId: ctrl.model.Code, colorId: colorOptions.id })
		}

		ctrl.selectEquipment = function(equipmentOptions) {
			console.log(equipmentOptions);
			ctrl.equipment = equipmentOptions;
			ctrl.completedSteps[2] = true;

			Data.set.equipment(equipmentOptions);
			Data.set.steps(ctrl.completedSteps);

			$state.go('app.select-options.step-four', { modelId: ctrl.model.Code, colorId: ctrl.color.id })
		}

		ctrl.$onInit = function() {
			ctrl.model = Data.get.model() || null;
			ctrl.color = Data.get.color() || null;
			ctrl.completedSteps = Data.get.steps() || [false, false, false, false];
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
