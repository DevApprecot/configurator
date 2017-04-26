(function() {
	'use strict';

	angular
		.module('app')
		.service('API', API);

	API$inject = ['http'];

	function API(http) {

		var service = {
			makes: getMakes,
			models: getModels,
			variants: getVariants
		};

		return service;

		function getMakes() {}

		function getModels() {}

		function getVariants() {}

	}
})();
