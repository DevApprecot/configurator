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
			API.families(makeCode)
				.then(resp => {
					ctrl.families = resp.data;
					console.log(ctrl.families);
				}, resp => {
					console.log('Failed to get families');
				})
		}

		function getMake() {

			var deferred = $q.defer();

			API.make()
				.then(resp => {
					ctrl.make = resp.data;
					deferred.resolve(resp.data.Code);
					Data.set.make(resp.data);
				}, resp => {
					console.log('Failed to get makes');
					deferred.reject({ data: 'ERROR' });
				})

			return deferred.promise;
		}

	}
})();
