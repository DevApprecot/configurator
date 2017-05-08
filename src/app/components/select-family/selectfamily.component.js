(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectFamily', {
			templateUrl: './app/components/select-family/selectfamily.html',
			controller: SelectFamilyCtrl,
			bindings: {
				onSelect: '&'
			}
		});

	SelectFamilyCtrl.$inject = ['$state', '$stateParams', 'API', 'Data', '$rootScope'];

	function SelectFamilyCtrl($state, $stateParams, API, Data, $rootScope) {
		var ctrl = this;

		var _getMake = getMake;
		var _getFamilies = getFamilies;

		ctrl.$onInit = function() {
			_getFamilies($stateParams.makeId);
			_getMake();

		};

		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		function getFamilies(makeCode) {
			API.families(makeCode)
				.then(resp => {
					console.log('families', resp);
					ctrl.families = resp.data.listOfData;
					console.log(ctrl.families);
				}, resp => {
					console.log('Failed to get families');
				})
		}

		function getMake() {

			API.make()
				.then(resp => {
					console.log('Make', resp);
					ctrl.make = resp.data.listOfData.filter(make => make.MakeCode == $stateParams.makeId)[0];
					if (ctrl.make) {
						Data.set.make(ctrl.make);
						$rootScope.$broadcast('selectedMake', ctrl.make.Make);
					}

				}, resp => {
					console.log('Failed to get makes', resp);
				})

		}

	}
})();
