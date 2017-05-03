(function() {
	'use strict';

	angular
		.module('configurator')
		.factory('Data', Data);

	Data.$inject = ['$sessionStorage'];

	function Data($sessionStorage) {

		var _make = $sessionStorage.make || null;
		var _family = $sessionStorage.family || null;
		var _model = $sessionStorage.model || null;
		var _color = $sessionStorage.color || null;
		var _equipment = $sessionStorage.equipment || null;

		var _steps = $sessionStorage.steps || null;

		var service = {
			get: {
				make: getMake,
				family: getFamily,
				model: getModel,
				steps: getSteps,
				color: getColorOptions,
				equipment: getEquipment,
				currentPrice: calculateCurrentPrice
			},
			set: {
				make: setMake,
				family: setFamily,
				model: setModel,
				steps: setSteps,
				color: setColorOptions,
				equipment: setEquipment
			},
			clear: {
				options: clearOptions,
				modelColorEquipment: clearModelColorEquipment,
				colorEquipment: clearColorEquipment
			}
		};

		return service;

		function getMake() {
			return _make;
		}

		function getFamily() {
			return _family;
		}

		function getModel() {
			return _model;
		}

		function getSteps() {
			return _steps;
		}

		function getColorOptions() {
			return _color;
		}

		function getEquipment() {
			return _equipment;
		}

		function setMake(make) {
			$sessionStorage.make = make;
			_make = make;
		}

		function setFamily(family) {
			$sessionStorage.family = family;
			_family = family;
		}

		function setModel(model) {
			$sessionStorage.model = model;
			_model = model;
		}

		function setSteps(steps) {
			$sessionStorage.steps = steps;
			_steps = steps;
		}

		function setColorOptions(options) {
			$sessionStorage.color = options;
			_color = options;
		}

		function setEquipment(equipment) {
			$sessionStorage.equipment = equipment;
			_equipment = equipment;
		}

		function clearOptions() {
			//Clear from sessionStorage all but make
			Object.keys($sessionStorage)
				.filter(key => !(key.includes('$') || key.includes('_')))
				.map(val => {
					if (!['make'].includes(val)) {
						delete $sessionStorage[val];
					}
				});

			//Clear service scope
			_family = _model = _color = _equipment = _steps = null;
		}

		function clearModelColorEquipment() {
			Object.keys($sessionStorage)
				.filter(key => !(key.includes('$') || key.includes('_')))
				.map(val => {
					if (!['make', 'family'].includes(val)) {
						delete $sessionStorage[val];
					}
				});

			//Clear service scope
			_model = _color = _equipment = null;
		}

		function clearColorEquipment() {
			Object.keys($sessionStorage)
				.filter(key => !(key.includes('$') || key.includes('_')))
				.map(val => {
					if (!['model', 'make', 'family'].includes(val)) {
						delete $sessionStorage[val];
					}
				});

			//Clear service scope
			_color = _equipment = null;
		}

		function calculateCurrentPrice() {
			var price = 0;

			if (!_family) return 0;

			price += ((_model ? _model.Price : 0) +
					(_color ? _color.Price : 0) +
					(_equipment && _equipment.autoEquipments.length ? _equipment.autoEquipments.reduce((previous, current, idx) => {
						return previous + current.Price
					}, 0) : 0)) +
				(_equipment && _equipment.manualEquipments.length ? _equipment.manualEquipments.reduce((previous, current) => {
					return previous + current.price
				}, 0) : 0)

			return price;

		}

	}
})();
