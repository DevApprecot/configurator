(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectModel', {
			templateUrl: './app/components/select-model/selectmodel.html',
			controller: SelectModelCtrl,
			require: {
				parent: '^app'
			}
		});

	SelectModelCtrl.$inject = [];

	function SelectModelCtrl() {
		var ctrl = this;

		ctrl.models = [{
			name: "Edition",
			description: "Some description",
			imgUrl: "assets/img/car-3.png",
			id: 1,
			cost: 13.490
        }, {
			name: "Advance",
			description: "Some description",
			imgUrl: "qweq",
			id: 2,
			cost: 13.490
        }, {
			name: "Sport",
			description: "Some description",
			imgUrl: "qweqwe",
			id: 3,
			cost: 13.490
        }]

		ctrl.selectModel = function(model) {
			ctrl.parent.car = angular.copy(angular.extend(ctrl.parent.car, { model }));
            console.log(ctrl.parent.car);
		}

		ctrl.$onInit = function() {
			ctrl.family = ctrl.parent.car.family.name
		};

		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
