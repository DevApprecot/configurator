(function () {
	'use strict';

	angular
		.module('configurator')
		.component('stepFour', {
			templateUrl: './app/components/select-options/step-four/stepfour.html',
			controller: StepFourCtrl,
			bindings: {
				imgPath: "@",
				defaultImg: "@"
			},
		});

	StepFourCtrl.$inject = ['$window', 'Data', 'API', 'Option', 'SubmitAlert', 'TAX_FEE', 'REDIRECT_URL',
		'RegistrationFee'
	];

	function StepFourCtrl($window, Data, API, Option, SubmitAlert, TAX_FEE, REDIRECT_URL, RegistrationFee) {
		var ctrl = this;
		ctrl.taxFee = TAX_FEE;
		ctrl.finalPrice = {
			noRegTax: null,
			beforeTax: null,
			afterTax: null
		};

		ctrl.calcFee = function () {
			ctrl.regTax = +RegistrationFee.calculate(ctrl.family, ctrl.model, ctrl.color, ctrl.equipment.autoEquipments, ctrl.equipment
				.manualEquipments);

			console.log(typeof (ctrl.regTax))

			ctrl.calcFinalPrices();
		}

		ctrl.calcFinalPrices = function () {

			if (isNaN(ctrl.regTax) || !ctrl.regTax) {
				ctrl.regTax = 0;
			}

			ctrl.finalPrice.beforeTax = Number((Number(ctrl.finalPrice.noRegTax) + Number(ctrl.regTax))
				.toFixed(2));
			ctrl.finalPrice.afterTax = Number((Number(ctrl.finalPrice.beforeTax) * Number(ctrl.taxFee))
				.toFixed(2))

			console.log(ctrl.finalPrice)
		}

		ctrl.$onInit = function () {

			Object.keys(Data.get)
				.map(val => {
					ctrl[val] = Data.get[val]()
				})

			ctrl.finalPrice.noRegTax = Data.get.currentPrice();

			console.log(ctrl);

		};

		ctrl.submitOptions = () => {

			let options = [];
			let totalBasicPrice = 0;
			let totalCo2 = 0;
			let registrationFee = 0;

			let availableOptionTypes = {
				model: 0,
				option: 1,
				manualOption: 2
			};

			function prepareData() {

				options.push(new Option(ctrl.model.Code, ctrl.model.ModelDescription, ctrl.model.Price.toString(), ctrl.model.CO2EmissionCombined,
					availableOptionTypes.model));

				if (Object.keys(ctrl.color)
					.length)
					options.push(new Option(ctrl.color.OptionCode, ctrl.color.OptionDescription, ctrl.color.Price.toString(), ctrl.color
						.ChangeCO2,
						availableOptionTypes.option));

				options = options.concat(ctrl.equipment.autoEquipments.map(eq => new Option(eq.OptionCode, eq.OptionDescription,
					eq.Price.toString(), eq.ChangeCO2, availableOptionTypes.option)));

				options = options.concat(ctrl.equipment.manualEquipments.map(eq => new Option(eq.code, eq.description, eq.price.toString(),
					eq.co2, availableOptionTypes.manualOption)));

				totalBasicPrice = ctrl.finalPrice.noRegTax.toString();
				totalCo2 = Data.get.totalCo2();
				registrationFee = ctrl.regTax;
			}

			prepareData();

			API.submit(options, totalBasicPrice, totalCo2, registrationFee)
				.then(resp => {

					console.log("Submitted successfully", resp)

					ctrl.alert = new SubmitAlert(1, 'Οι επιλογές σας καταχωρήθηκαν επιτυχώς.');
					$window.location.href = REDIRECT_URL + resp.data.code;

				}, resp => {
					console.log("Failed to submit", resp);

					if (resp.responseText) {
						$window.location.href = REDIRECT_URL + angular.fromJson(resp.responseText.slice(1, -1)).code;
						ctrl.alert = new SubmitAlert(1, 'Οι επιλογές σας καταχωρήθηκαν επιτυχώς.');
					} else {
						ctrl.alert = new SubmitAlert(0, 'Κάτι συνέβει και οι αλλαγές σας δεν καταχωρήθηκαν.');
					}


				})
				.then(() => ctrl.alert.show())

		}

		ctrl.$onChanges = function (changesObj) {};
		ctrl.$onDestory = function () {};
	}
})();