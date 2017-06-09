(function() {
	'use strict';

	angular
		.module('configurator')
		.service('RegistrationFee', RegistrationFee);

	RegistrationFee.$inject = [];

	function RegistrationFee() {

		var service = {
			calculate: calculateRegistrationFee
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

		const exceptions = {
			2: 0,
			3: -0.5,
			4: -0.5,
		};

		const RegistrationFeePercentages = [
            [0.038, 0.04, 0.044, 0.048, 0.052, 0.056, 0.064, 0.08],
            [0.076, 0.08, 0.088, 0.096, 0.104, 0.112, 0.128, 0.16],
            [0.152, 0.16, 0.176, 0.192, 0.208, 0.224, 0.256, 0.32],
            [0.228, 0.24, 0.264, 0.288, 0.312, 0.336, 0.384, 0.48],
            [0.304, 0.32, 0.352, 0.384, 0.416, 0.448, 0.512, 0.64]
        ]

		const PBT_Row = [
            [0, 14000],
            [14001, 17000],
            [17001, 20000],
            [21001, 25000]
        ]

		const Co2_Row = [
            [0, 100],
            [101, 120],
            [121, 140],
            [141, 160],
            [161, 180],
            [181, 200],
            [201, 250]
        ]

		return service;

		function calculateRegistrationFee(model, color, aOptions, mOptions) {

			let fee = 0;
			let feePercentage = 0;

			let priceBeforeTaxes = model.Price +
				((color && color.Price) ? color.Price : 0) +
				aOptions.reduce((prev, curr) => prev + curr.Price, 0) +
				mOptions.reduce((prev, curr) => prev + curr.price, 0);

			let Co2Value = model.CO2EmissionCombined +
				aOptions.reduce((prev, curr) => prev + curr.ChangeCO2, 0) +
				mOptions.reduce((prev, curr) => prev + curr.co2, 0)

			let i = PBT_Row.findIndex((val) => {
				return (priceBeforeTaxes >= val[0] && priceBeforeTaxes <= val[1])
			});

			if (i === -1) i = PBT_Row.length;

			let j = Co2_Row.findIndex((val, idx) => {
				return (Co2Value >= val[0] && Co2Value <= val[1])
			});

			if (j === -1) j = Co2_Row.length;

			feePercentage = RegistrationFeePercentages[i][j];

			fee = (priceBeforeTaxes * feePercentage)
				.toFixed(2);

			//Check fuel type

			if(Object.keys(exceptions).includes(model.FuelType)) {
				console.log('Im in fuel type');
				fee *= exceptions[model.FuelType];
			}

			console.log('priceBeforeTaxes:' + priceBeforeTaxes);
			console.log('Co2Value:' + Co2Value);
			console.log('feePercentage:' + feePercentage);

			return fee;

		}

	}
})();
