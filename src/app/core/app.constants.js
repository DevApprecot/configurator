(function() {
	'use strict';

	angular
		.module('configurator')

		.constant('DEFAULT_CAR_IMAGE', {
			url: `./assets/img/no-vehicle-sm.png`
		})

		.constant('IMAGES_PATH', {
			url: `http://onedealer.kosmocar.gr/Files/EntityImage/Inventory/`
		})

		.constant('API_URL', 'https://onedealer.kosmocar.gr/external')

		.constant('TAX_FEE', 1.24)

})();
