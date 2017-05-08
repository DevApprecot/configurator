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
				console.log(vm.theme);
				console.log($stateParams);
			})

			$scope.$on('selectedMake', (event, makeCode) => {
				vm.theme = THEMES[makeCode];
			})

		}
	}
})();
