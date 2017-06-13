(function() {
	'use strict';

	angular
		.module('configurator')
		.component('confirmModal', {
			templateUrl: './app/components/confirm-modal/confirmmodal.html',
			controller: ConfirmModal,
			controllerAs: '$ctrl',
			bindings: {
				close: '&',
				dismiss: '&'
			},
		});

	ConfirmModal.$inject = [];

	function ConfirmModal() {
		var ctrl = this;

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestroy = function() {};

        ctrl.ok = () => {
            ctrl.close();
        }

        ctrl.cancel = () => {
            ctrl.dismiss();
        }
	}
})();
