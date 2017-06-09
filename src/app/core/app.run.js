(function() {
	'use strict';

	angular
		.module('configurator')

		.run(RunFunction);

	RunFunction.$inject = ['$rootScope', '$state', 'Data', '$anchorScroll'];

	function RunFunction($rootScope, $state, Data, $anchorScroll) {

		activate();

		function activate() {
			onStateChangeScrollTop();
			checkStates();
		}

		function onStateChangeScrollTop() {
			$rootScope.$on('$stateChangeSuccess', (e) => {
				$anchorScroll();
			})
		}

		/**
		 * If configurator has been submitted and user tries to join any state
		 * but home state then prevent state change and redirect him to home state.
		 * Further more set submitted to false since a new workflow beggins.
		 */

		function checkStates() {
			const homeState = 'app.select-family';

			$rootScope.$on('$stateChangeStart', (e, toState) => {
				if (toState.name === homeState || !Data.get.submitted()) return;

				e.preventDefault();
				Data.set.submitted(false);
				$state.go(homeState, {
					apiUrl: Data.get.endpoint(),
					makeId: Data.get.make().Code,
					redirectPath: Data.get.redirectionPath()
				});
			})

		}

	}

})();
