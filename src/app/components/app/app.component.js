(function() {
	'use strict';

	angular
		.module('configurator')
		.component('app', {
			templateUrl: './app/components/app/app.html',
			controller: AppCtrl,
			bindings: {
				theme: '@'
			},
		});

	AppCtrl.$inject = ['Data', '$state', '$stateParams'];

	function AppCtrl(Data, $state, $stateParams) {
		var ctrl = this;

		//This is the car object which will be sent on service
		ctrl.car = {
			family: Data.get.family(),
			model: Data.get.model(),
			price: Data.get.currentPrice()
		};

		console.log('CAAR', ctrl.car);

		ctrl.selectFamily = function(family) {
			ctrl.car.family = family;

			Data.set.family(family);

			ctrl.updatePrice(ctrl.car.price + family.Price);

			$state.go('app.select-options.step-one', {
				makeId: $stateParams.makeId,
				familyId: family.Code
			})
		}

		ctrl.selectedModel = function() {
			ctrl.car.model = Data.get.model();
		}

		ctrl.onHeaderBack = function() {

			let color = Data.get.color();
			let equipment = Data.get.equipment();

			ctrl.updatePrice(ctrl.car.price - (
				ctrl.car.family.Price + // Family Price
				(ctrl.car.model ? ctrl.car.model.Price : 0) + // Model Price
				(color ? color.Price : 0) + // Color Price
				((equipment && equipment.autoEquipments) ? equipment.autoEquipments.reduce((previous, current) => {
					return previous + current.Price
				}, 0) : 0) // Equipment Price
			));

			delete ctrl.car.family;
			delete ctrl.car.model;

			Data.clear.options();
			$state.go('app.select-family', { makeId: $stateParams.makeId });
		}

		ctrl.updatePrice = function(price) {
			console.log(price);
			ctrl.car.price = price;
		}

		ctrl.$onInit = function() {};

		ctrl.$onChanges = function(changesObj) {
			console.log('app changes', changesObj);
		};

		ctrl.$onDestory = function() {};

	}
})();
