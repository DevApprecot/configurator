(function() {
	'use strict';

	angular
		.module('configurator')
		.factory('SubmitAlert', SubmitAlert);

	SubmitAlert.$inject = [];

	function SubmitAlert() {

		return class {
			constructor(type, msg) {
				this.type = type;
				this.msg = msg;
				this.class = `alert  ${type == 1 ? 'alert-success' : 'alert-danger'}`;
				this.isShown = false;
			}

			show() {
				this.isShown = true;
			}

			hide() {
				this.isShown = false;
			}
		}

	}
})();
