(function() {
	'use strict';

	angular
		.module('configurator')
		.controller('BaseCtrl', BaseCtrl);

	BaseCtrl.$inject = ['$stateParams', 'Data', '$timeout', '$scope'];

	function BaseCtrl($stateParams, Data, $timeout, $scope) {
		var vm = this;

		activate();

		function activate() {
			
			vm.theme = 'default';

			$scope.$on('selectedMake', (event, make) => {
				vm.theme = make.toLowerCase();
			})

		}
	}
})();
