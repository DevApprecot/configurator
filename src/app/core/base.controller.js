(function() {
	'use strict';

	angular
		.module('configurator')
		.controller('BaseCtrl', BaseCtrl);

	BaseCtrl.$inject = ['$stateParams', '$timeout'];

	function BaseCtrl($stateParams, $timeout) {
		var vm = this;

		activate();

		function activate() {
			$timeout(() => {
				vm.theme = $stateParams.makeId == 60 ? "vw" : "audi"
			})

		}
	}
})();
