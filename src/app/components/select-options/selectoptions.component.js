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

		console.log(ctrl.imgPath);

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
			ctrl.completedSteps[0] = true;

			Data.set.model(model);
			Data.set.steps(ctrl.completedSteps);

			ctrl.onPriceUpdate({ price: Data.get.currentPrice() });
			ctrl.onModelSelect();

			if (ctrl.hasColors) {
				$state.go('app.select-options.step-two', { modelId: model.Code, colors: ctrl.availableColors });
			} else {
				ctrl.selectColor({}, true)
			}

		};

		ctrl.selectColor = function(colorOptions, isNextSelected) {
			if (ctrl.color && (ctrl.color.OptionCode != colorOptions.OptionCode)) {
				console.log('I am in');
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

			if (isNextSelected) {

				ctrl.completedSteps[1] = true;

				if (ctrl.hasEquipments) {
					$state.go('app.select-options.step-three', { modelId: ctrl.model.Code, colorId: colorOptions.OptionCode });
				} else {
					ctrl.selectEquipment({ autoEquipments: [], manualEquipments: [] }, true)
				}
			}

		}

		ctrl.selectEquipment = function(equipmentOptions, isNextSelected) {

			ctrl.equipment = equipmentOptions;

			Data.set.equipment(equipmentOptions);
			Data.set.steps(ctrl.completedSteps);

			ctrl.onPriceUpdate({ price: Data.get.currentPrice() });

			if (isNextSelected) {
				$state.go('app.select-options.step-four', { modelId: ctrl.model.Code, colorId: ctrl.color.OptionCode })
				ctrl.completedSteps[2] = true;
			}

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
