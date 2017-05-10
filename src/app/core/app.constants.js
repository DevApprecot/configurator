(function() {
	'use strict';

	angular
		.module('configurator')

		.constant('DEFAULT_CAR_IMAGE', {
			url: `./assets/img/no-vehicle-sm.png`
		})

		.constant('IMAGES_PATH', `/Files/EntityImage/Inventory/`)

		.constant('TAX_FEE', 1.24)

		.constant('THEMES', {
			'60': 'audi',
			'52': 'vw',
			'61': 'vw_lcv'
		})

		.constant('HAS_COLORS', [52])

		.constant('HAS_EQUIPMENTS', [52, 61]);

})();
