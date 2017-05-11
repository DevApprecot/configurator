(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectOptions', {
			templateUrl: './app/components/select-options/selectoptions.html',
			controller: SelectOptionsCtrl,
			bindings: {
				onModelSelect: '&',
				onPriceUpdate: '&',
				currentPrice: '@'
			},
		});

	SelectOptionsCtrl.$inject = ['$state', '$stateParams', 'HAS_COLORS', 'HAS_EQUIPMENTS', '$timeout', 'API', 'Data',
		'ApiUrl',
		'IMAGES_PATH',
		'DEFAULT_CAR_IMAGE'];

	function SelectOptionsCtrl($state, $stateParams, HAS_COLORS, HAS_EQUIPMENTS, $timeout, API, Data, ApiUrl, IMAGES_PATH,
		DEFAULT_CAR_IMAGE) {
		var ctrl = this;
		ctrl.imgPath = ApiUrl() + IMAGES_PATH;
		ctrl.defaultImg = DEFAULT_CAR_IMAGE.url;

		ctrl.hasColors = HAS_COLORS.includes(parseInt($stateParams.makeId));
		ctrl.hasEquipments = HAS_EQUIPMENTS.includes(parseInt($stateParams.makeId));

		ctrl.next = (currentStep) => {
			let steps = {
				0: () => {

					ctrl.completedSteps[0] = true;

					if (ctrl.hasColors) {
						$state.go('app.select-options.step-two', { modelId: ctrl.model.Code });
					} else {
						steps[1]();
					}
				},
				1: () => {
					ctrl.completedSteps[1] = true;

					if (!ctrl.color) {
						ctrl.selectColor({});
					}

					if (ctrl.hasEquipments) {
						$state.go('app.select-options.step-three', { modelId: ctrl.model.Code, colorId: ctrl.color.OptionCode });
					} else {
						steps[2]();
					}
				},

				2: () => {

					ctrl.completedSteps[2] = true;

					if (!ctrl.equipment) {
						ctrl.selectEquipment({
							autoEquipments: [],
							manualEquipments: []
						})
					}

					$state.go('app.select-options.step-four', { modelId: ctrl.model.Code, colorId: ctrl.color.OptionCode })
				}
			}

			if (steps[currentStep]) {
				steps[currentStep]();
			}
		}

		ctrl.selectModel = function(model) {

			if (ctrl.model && (ctrl.model.Code != model.Code)) {

				Data.clear.modelColorEquipment();

				angular.forEach(ctrl.completedSteps, (val, idx) => {
					if (idx > 0) {
						ctrl.completedSteps[idx] = false;
					}
				})

			}

			ctrl.model = model;

			Data.set.model(model);
			Data.set.steps(ctrl.completedSteps);

			ctrl.onPriceUpdate({ price: Data.get.currentPrice() });
			ctrl.onModelSelect();

		};

		ctrl.selectColor = function(colorOptions) {
			if (ctrl.color && (ctrl.color.OptionCode != colorOptions.OptionCode)) {

				Data.clear.colorEquipment();

				angular.forEach(ctrl.completedSteps, (val, idx) => {
					if (idx > 1) {
						ctrl.completedSteps[idx] = false;
					}
				})
			}

			ctrl.color = colorOptions;

			Data.set.color(colorOptions);
			Data.set.steps(ctrl.completedSteps);

			ctrl.onPriceUpdate({ price: Data.get.currentPrice() });

		}

		ctrl.selectEquipment = function(equipmentOptions) {

			ctrl.equipment = equipmentOptions;

			Data.set.equipment(equipmentOptions);
			Data.set.steps(ctrl.completedSteps);

			ctrl.onPriceUpdate({ price: Data.get.currentPrice() });

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
