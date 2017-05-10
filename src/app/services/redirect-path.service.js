(function() {
	'use strict';

	angular
		.module('configurator')
		.service('RedirectPath', RedirectPath);

	RedirectPath.$inject = ['$stateParams'];

	function RedirectPath($stateParams) {
		return () => {
			let url = $stateParams.redirectPath;
			url = url.replace(/\*/g, '/');
			return url;
		}
	}
})();
