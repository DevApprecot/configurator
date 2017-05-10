(function() {
	'use strict';

	angular
		.module('configurator')
		.service('ApiUrl', ApiUrl);

	ApiUrl.$inject = ['$stateParams'];

	function ApiUrl($stateParams) {
		return () => {
			let url = $stateParams.apiUrl;
			url = url.replace(/\*/g, '/');
			return url;
		}
	}
})();

