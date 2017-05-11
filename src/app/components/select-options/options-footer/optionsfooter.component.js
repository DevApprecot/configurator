(function() {
	'use strict';

	angular
		.module('configurator')
		.component('optionsFooter', {
			templateUrl: './app/components/select-options/options-footer/optionsfooter.html',
			controller: OptionsFooterCtrl,
			bindings: {
				model: '<',
				onNext: '&'
			}
		});

	OptionsFooterCtrl.$inject = ['$state'];

	function OptionsFooterCtrl($state) {
		var ctrl = this;
		ctrl.state = $state;

		ctrl.$onInit = function() {};
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

	}

})();
