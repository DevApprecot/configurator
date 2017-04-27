(function() {
	'use strict';

	angular
		.module('configurator')
		.service('API', API);

	API.$inject = ['http'];

	function API(http) {

		var service = {
			makes: getMakes,
			models: getModels,
			variants: getVariants
		};

		return service;

		function getMakes() {}

		function getModels() {

			let params = {};

			return http.get(params, './app/resources/models.json');

		}

		function getVariants() {}

	}
})();
