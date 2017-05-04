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

	SelectFamilyCtrl.$inject = ['$state', '$stateParams', 'API', '$q', 'Data'];

	function SelectFamilyCtrl($state, $stateParams, API, $q, Data) {
		var ctrl = this;

		var _getMake = getMake;
		var _getFamilies = getFamilies;

		ctrl.$onInit = function() {

			_getMake($stateParams.makeId)
				.then(makeCode => {
					_getFamilies(makeCode);
				}, resp => {
					console.log(resp);
				});

		};

		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		function getFamilies(makeCode) {
			API.families(1, makeCode)
				.then(resp => {
					console.log(resp.data.filter(val=>val.Code == '8XF'));
					ctrl.families = resp.data;
					console.log(ctrl.families);
				}, resp => {
					console.log('Failed to get families');
				})
		}

		function getMake() {
			let level = 0;
			var deferred = $q.defer();

			API.make(level)
				.then(resp => {
					ctrl.make = resp.data;
					deferred.resolve(resp.data[0].Code);
					Data.set.make(resp.data[0]);
				}, resp => {
					console.log('Failed to get makes', resp);
					deferred.reject({ data: 'ERROR' });
				})

			return deferred.promise;
		}

	}
})();
