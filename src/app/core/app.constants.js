(function() {
	'use strict';

	angular
		.module('configurator')

		.constant('DEFAULT_CAR_IMAGE', {
			url: `./assets/img/no-vehicle-sm.png`
		})

		.constant('IMAGES_PATH', {
			url: `https://onedealer.kosmocar.gr/Files/EntityImage/Inventory/`
		});

})();
