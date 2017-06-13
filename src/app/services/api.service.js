(function() {
	'use strict';

	angular
		.module('configurator')
		.service('API', API);

	API.$inject = ['http', 'ApiUrl'];

	function API(http, ApiUrl) {

		var service = {
			make: getMake,
			families: getFamilies,
			models: getModels,
			variants: getVariants,
			colors: getColors,
			options: getOptions,
			submit: submitOptions,
			getEditData: getEditData
		};

		return service;

		function getMake() {

			let params = {
				entry: "IDMS_CNF_ModelView",
				odatastring: `Level eq 0`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${ApiUrl()}/external/GetData`);
		}

		function getFamilies(makeCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq 1 and MakeCode eq '${makeCode}'`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${ApiUrl()}/external/GetData`);
		}

		function getModels(parentModelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelView',
				odatastring: `Level eq 2 and ParentModelCode eq '${parentModelCode}'`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${ApiUrl()}/external/GetData`);

		}

		function getVariants() {}

		function getOptions(modelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelOptionView',
				odatastring: `ModelCode eq '${modelCode}' and ItemGroup ne 'Χρώματα'`,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${ApiUrl()}/external/GetData`);

		}

		function getColors(modelCode) {

			let params = {
				entry: 'IDMS_CNF_ModelOptionView',
				odatastring: `ModelCode eq '${modelCode}' and ItemGroup eq 'Χρώματα' `,
				page: 1,
				pageSize: 500
			};

			return http.get(params, `${ApiUrl()}/external/GetData`);
		}

		function submitOptions(Options, TotalBasicPrice, TotalCO2, RegistrationFee) {

			let payload = {
				configuration: {
					Options,
					TotalBasicPrice,
					TotalCO2,
					RegistrationFee
				}
			};

			return http.jsonp(payload, `${ApiUrl()}/kosmocar/SaveConfigurationForLead`);

		}

		function getEditData(editId) {
			const params = {};
			return http.get(params, `./app/resources/editData.json`);
		}

	}
})();
