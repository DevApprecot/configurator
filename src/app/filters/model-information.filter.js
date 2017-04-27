(function() {
	'use strict';

	angular
		.module('configurator')
		.filter('modelInformation', modelInformation);

	function modelInformation() {
		return filterFunc;

		function filterFunc(fieldValueUnused, item) {
			return `- / ${item.PowerKW || '-'} / ${item.PowerPS || '-'}`
		}
	}
})();
