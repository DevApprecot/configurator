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

	SelectOptionsCtrl.$inject = ['$state', '$timeout', 'Data', 'IMAGES_PATH', 'DEFAULT_CAR_IMAGE'];

	function SelectOptionsCtrl($state, $timeout, Data, IMAGES_PATH, DEFAULT_CAR_IMAGE) {
		var ctrl = this;
		ctrl.imgPath = IMAGES_PATH.url;
		ctrl.defaultImg = DEFAULT_CAR_IMAGE.url;
		console.log(ctrl.imgPath);

		ctrl.selectModel = function(model) {

			if (ctrl.model && (ctrl.model.Code != model.Code)) {

				$ctrl.onPriceUpdate({
					price: $ctrl.price - (
						ctrl.model.Price + ctrl.model.color.Price +
						ctrl.color ? ctrl.color.Price : 0 +
						ctrl.equipment ? ctrl.equipment.reduce((prev, cur) => { return prev + cur.Price }, 0) : 0
					)
				})

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

			ctrl.onPriceUpdate({ price: (+ctrl.currentPrice + (ctrl.model.Price ? ctrl.model.Price : 0)) });
			ctrl.onModelSelect();

			$state.go('app.select-options.step-two', { modelId: model.Code });
		};

		ctrl.selectColor = function(colorOptions) {
			if (ctrl.color && (ctrl.color.OptionCode != colorOptions.OptionCode)) {

				console.log((ctrl.color ? ctrl.color.Price : 0));
				console.log(ctrl.equipment ? ctrl.equipment.reduce((prev, cur) => { return prev + cur.Price }, 0) : 0);

				ctrl.onPriceUpdate({
					price: +ctrl.currentPrice - (
						(ctrl.color ? ctrl.color.Price : 0) +
						(ctrl.equipment ? ctrl.equipment.reduce((prev, cur) => { return prev + cur.Price }, 0) : 0)
					)
				})

				Data.clear.colorEquipment();

				angular.forEach(ctrl.completedSteps, (val, idx) => {
					if (idx > 1) {
						ctrl.completedSteps[idx] = false;
					}
				})
			}

			ctrl.color = colorOptions;
			ctrl.completedSteps[1] = true;

			Data.set.color(colorOptions);
			Data.set.steps(ctrl.completedSteps);

			$timeout(() => { ctrl.onPriceUpdate({ price: (+ctrl.currentPrice + (ctrl.color.Price ? ctrl.color.Price : 0)) }) });

			$state.go('app.select-options.step-three', { modelId: ctrl.model.Code, colorId: colorOptions.OptionCode })
		}

		ctrl.selectEquipment = function(equipmentOptions) {
			console.log(equipmentOptions);
			ctrl.equipment = equipmentOptions;
			ctrl.completedSteps[2] = true;

			Data.set.equipment(equipmentOptions);
			Data.set.steps(ctrl.completedSteps);

			//Remove last options price
			ctrl.onPriceUpdate({
				price: (+ctrl.currentPrice -
					(ctrl.equipment ? ctrl.equipment.autoEquipments.reduce((prev, cur) => {
						return prev +
							cur.Price
					}, 0) : 0)
				)
			})

			//Add new options price
			ctrl.onPriceUpdate({
				price: (+ctrl.currentPrice + equipmentOptions.autoEquipments.reduce((prev, curr) => {
					return prev + curr.Price;
				}, 0))
			})

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
