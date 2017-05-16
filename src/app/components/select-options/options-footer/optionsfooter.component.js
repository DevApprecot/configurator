(function() {
	'use strict';

	angular
		.module('configurator')
		.component('optionsFooter', {
			templateUrl: './app/components/select-options/options-footer/optionsfooter.html',
			controller: OptionsFooterCtrl,
			bindings: {
				model: '<',
				onNext: '&',
				onSubmit: '&'
			}
		});

	OptionsFooterCtrl.$inject = ['$state', '$scope', '$rootScope'];

	function OptionsFooterCtrl($state, $scope, $rootScope) {
		var ctrl = this;
		ctrl.state = $state;
		ctrl.isFormValid = false;

		ctrl.$onInit = function() {
			console.log(typeof(ctrl.isFormValid));
			console.log(ctrl.isFormValid);
		};
		ctrl.$onChanges = function(changesObj) {
			if (changesObj.model && ctrl.model) {
				ctrl.model = changesObj.model.currentValue;
			}

		};
		ctrl.$onDestory = function() {};

		ctrl.isDisabled = () => {
			if ($state.includes('app.select-options.step-one')) {
				if (ctrl.model) {
					return !Object.keys(ctrl.model)
						.length
				} else {
					return true;
				}
			}

		}

		ctrl.getCurrentStep = (state) => {

			const current = {
				'app.select-options.step-one': 0,
				'app.select-options.step-two': 1,
				'app.select-options.step-three': 2
			};

			return current[state];

		}

		$scope.$on('formChanged', (event, isFormValid) => {
			ctrl.isFormValid = isFormValid;
		})

	}

})();
