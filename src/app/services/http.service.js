(function() {
	'use strict';

	angular
		.module('configurator')
		.service('http', http);

	http.$inject = ['$http'];

	function http($http) {

		var service = {
			get: getRequest,
			post: postRequest
		};

		return service;

		function getRequest(params, endpoint) {

			console.log(endpoint + '?' + $.param(params));

			return $http({
				method: 'GET',
				url: endpoint,
				params,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		function postRequest(payload, endpoint) {

			console.log(payload);

			console.log(endpoint);

			return $http({
				method: 'POST',
				url: endpoint,
				params: payload,
				headers: { 'Content-Type': 'application/json' }
			})
		}

	}
})();
