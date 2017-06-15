(function() {
	'use strict';

	angular
		.module('configurator')
		.service('TrafficCharge', TrafficCharge);

	TrafficCharge.$inject = [];

	function TrafficCharge() {

		let service = {
			calculate: calculateTrafficCharge
		}

		/* FuelTypes
			0=Petrol
			1=Diesel
			2=Electric
			3=Hybrid (petrol/electric)
			4=Hybrid (diesel/electric)
			5=Autogas (LPG)
			6=Hydrogen
			7=Other
		*/

		const hybridEngineLimit = 1549;
		const hybridEngineLimitFeePercentage = 0.6;

		const co2Limits = {
			'0': [0, 90],
			'0.9': [91, 100],
			'0.98': [101, 120],
			'1.2': [121, 140],
			'1.85': [141, 160],
			'2.45': [161, 180],
			'2.78': [181, 200],
			'3.05': [201, 250],
			'3.72': [251, Infinity]
		}

		function isHybrid(code) {
			return [3, 4].indexOf(code) > -1;
		}

		function isElectric(code) {
			return code == 2;
		}

		function commaStringToNumber(str) {
			return Number(str.replace(/,/g, ''))
		}

		return service;

		function calculateTrafficCharge(model, color, autoEquipments, manualEquipments) {

			/**
			 * If it is not passenger car OR if it's electric OR if it's hybrid with engine displacement lower than the accepted limit then charge is zero.
			 */
			if (
				model.MakeCode === '61' ||
				isElectric(model.FuelType) ||
				(isHybrid(model.FuelType) && commaStringToNumber(model.EngineDisplacement) < hybridEngineLimit)
			) return 0;

			let charge = 0;
			let Co2Value = 0;
			let quota = 0;

			Co2Value = model.CO2EmissionCombined +
				autoEquipments.reduce((prev, curr) => prev + curr.ChangeCO2, 0) +
				manualEquipments.reduce((prev, curr) => prev + curr.co2, 0)

			console.log('Co2: ' + Co2Value);

			quota = Number(Object.keys(co2Limits)
				.filter(k => {
					return (Co2Value >= co2Limits[k][0] && Co2Value <= co2Limits[k][1])
				})[0]);

			charge = quota * Co2Value;

			if (isHybrid(model.FuelType)) {
				charge *= hybridEngineLimitFeePercentage
			}

			charge = Number(charge.toFixed(2))

			return charge;
		}

	}
})();
