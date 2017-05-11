(function() {
	'use strict';

	angular
		.module('configurator')
		.controller('BaseCtrl', BaseCtrl);

	BaseCtrl.$inject = ['$stateParams', 'THEMES', '$timeout', '$scope'];

	function BaseCtrl($stateParams, THEMES, $timeout, $scope) {
		var vm = this;

		activate();

		function activate() {

			$timeout(() => {
				vm.theme = THEMES[parseInt($stateParams.makeId)];
			})

			$scope.$on('selectedMake', (event, makeCode) => {
				vm.theme = THEMES[makeCode];
			})

		}
	}
})();
