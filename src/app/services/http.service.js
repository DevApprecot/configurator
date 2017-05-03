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
				url: endpoint + '?' + $.param(params),
				// transformRequest: function(data, headersGetter) {
				// 	var headers = headersGetter();

				// 	delete headers['Authorization'];

				// 	return headers;
				// },
				// transformResponse: [function(data) {
				// 	console.log(data);
				// 	return data;
  				// }]
			})
		}

		function postRequest(payload, endpoint) {
			return $http({
				method: 'POST',
				url: endpoint,
				data: angular.toJson(payload),
				headers: { 'Content-Type': 'application/json' }
			})
		}

	}
})();
