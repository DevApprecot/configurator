(function() {
	'use strict';

	angular
		.module('configurator')
		.filter('trNgGridCurrency', trNgGridCurrency);

	trNgGridCurrency.$inject = ['$filter']

	function trNgGridCurrency($filter) {
		return filterFunc;

		function filterFunc(fieldValueUnused, item) {
			return $filter('currency')(item.Price);
		}
	}
})();
