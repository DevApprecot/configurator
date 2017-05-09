(function() {
	'use strict';

	angular
		.module('configurator')

		.run(RunFunction);

	RunFunction.$inject = ['$rootScope', '$anchorScroll'];

	function RunFunction($rootScope, $anchorScroll) {


        $rootScope.$on('$stateChangeSuccess',(e) => {
            $anchorScroll();
        })


	}

})();
