(function() {
	'use strict';

	angular
		.module('configurator')
		.service('ParseEditId', ParseEditId);

	ParseEditId.$inject = [];

	function ParseEditId() {

        return exposedFn;
		/**
		 *  eidtIdStr is of type: 'editId=15&'
		 */
		function exposedFn(editIdStr) {
			let str = angular.copy(editIdStr);
			str = editIdStr.slice(0, -1);
			str = str.substr(str.indexOf("=") + 1);
			return str;
		}
	}
})();
