(function() {
	'use strict';

	angular
		.module('configurator')
		.service('API', API);

	API.$inject = ['http'];

	function API(http) {

		var service = {
			make: getMake,
			families: getFamilies,
			models: getModels,
			variants: getVariants,
			colors: getColors,
			options: getOptions
		};

		return service;

		function getMake(level) {

			let params = {
				entry: "IDMS_CNF_ModelView",
				odatastring: `Level eq ${level}`,
				page: 1,
				pasgeSize: 500
			};

			return http.get(params, './app/resources/makes.json');
		}

		function getFamilies(level, makeCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq ${level} and MakeCode eq '${makeCode}'`,
				page: 1,
				pasgeSize: 500
			};

			return http.get(params, './app/resources/families.json');
		}

		function getModels(level, parentModelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq ${level} and ParentModelCode eq '${parentModelCode}'`,
				page: 1,
				pasgeSize: 500
			};

			return http.get(params, './app/resources/models.json');

		}

		function getVariants() {}

		function getOptions(someParams) {

			let params = {};

			return http.get(params, './app/resources/options.json');

		}

		function getColors(someParams) {

			let params = {};

			return http.get(params, './app/resources/colors.json');
		}

	}
})();
