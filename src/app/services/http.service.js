(function() {
	'use strict';

	angular
		.module('configurator')
		.service('http', http);

	http.$inject = ['$http', '$q'];

	function http($http, $q) {

		var service = {
			get: getRequest,
			post: postRequest,
			jsonp: jsonpRequest
		};

		return service;

		function getRequest(params, endpoint) {

			console.log(endpoint + '?' + $.param(params));

			return $http({
				method: 'GET',
				url: endpoint,
				params,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		function postRequest(payload, endpoint) {

			console.log(payload);

			console.log(endpoint);

			return $http({
				method: 'POST',
				url: endpoint,
				data: payload,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		function jsonpRequest(payload, endpoint) {

			var deferred = $q.defer();

			console.log(payload);

			console.log(endpoint);

			$.ajax({
				url: endpoint,
				type: "POST",
				data: payload,
				jsonp: 'callback',
				success: function(status) {
					deferred.resolve(status);
				},
				error: function(status) {
					if (status.responseText) {
						deferred.resolve(status.responseText)
					} else {
						deferred.reject(status)
					}
				}
			});

			return deferred.promise;
		}
	}
})();
