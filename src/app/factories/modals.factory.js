(function() {
	'use strict';

	angular
		.module('configurator')
		.factory('Modals', Modals);

	Modals.$inject = ['$uibModal'];

	function Modals($uibModal) {
		var service = {
			confirm: () => { return _openModal('confirmModal') }
		};

		var _openModal = (component, data) => {
			return $uibModal.open({
				animation: true,
				component,
				resolve: {
					data: () => { return data }
				}
			})
		}

		return service;

	}
})();
