(function() {
	'use strict';

	angular
		.module('configurator')
		.controller('BaseCtrl', BaseCtrl);

	BaseCtrl$inject = [''];

	function BaseCtrl() {
		var vm = this;
		vm.changeTheme = function() {
            console.log('hi');
			(vm.theme == 'vw') ? vm.theme = 'audi': vm.theme = 'vw';
		}

		activate();

		function activate() {
			vm.theme = "audi";
		}
	}
})();
