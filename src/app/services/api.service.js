(function() {
	'use strict';

	angular
		.module('configurator')
		.service('API', API);

	API.$inject = ['http', 'API_URL'];

	function API(http, API_URL) {

		var service = {
			make: getMake,
			families: getFamilies,
			models: getModels,
			variants: getVariants,
			colors: getColors,
			options: getOptions
		};

		return service;

		function getMake() {

			let params = {
				entry: "IDMS_CNF_ModelView",
				odatastring: `Level eq 0`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${API_URL}/GetData`);
		}

		function getFamilies(makeCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq 1 and MakeCode eq '${makeCode}'`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${API_URL}/GetData`);
		}

		function getModels(parentModelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq 2 and ParentModelCode eq '${parentModelCode}'`,
				page:1,
				pageSize:500
			};

			return http.get(params, `${API_URL}/GetData`);

		}

		function getVariants() {}

		function getOptions(modelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelOptionView',
				odatastring: `ModelCode eq '${modelCode}' and ItemGroup ne 'Χρώματα'`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${API_URL}/GetData`);

		}

		function getColors(modelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelOptionView',
				odatastring: `ModelCode eq '${modelCode}' and ItemGroup eq 'Χρώματα' `,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${API_URL}/GetData`);
		}

	}
})();
