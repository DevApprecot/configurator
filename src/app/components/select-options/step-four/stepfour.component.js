(function() {
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

	StepFourCtrl.$inject = ['Data', 'API', 'Option', 'SubmitAlert', 'TAX_FEE', 'RegistrationFee'];

	function StepFourCtrl(Data, API, Option, SubmitAlert, TAX_FEE, RegistrationFee) {
		var ctrl = this;
		ctrl.taxFee = TAX_FEE;
		ctrl.finalPrice = {
			noRegTax: null,
			beforeTax: null,
			afterTax: null
		};

		ctrl.calcFee = function() {
			ctrl.regTax = +RegistrationFee.calculate(ctrl.family, ctrl.model, ctrl.color, ctrl.equipment.autoEquipments, ctrl.equipment
				.manualEquipments);

			ctrl.calcFinalPrices();
		}

		ctrl.calcFinalPrices = function() {

			if (isNaN(ctrl.regTax) || !ctrl.regTax) {
				ctrl.regTax = 0;
			}

			ctrl.finalPrice.beforeTax = +ctrl.finalPrice.noRegTax + +ctrl.regTax;
			ctrl.finalPrice.afterTax = +(ctrl.finalPrice.beforeTax * ctrl.taxFee)
				.toFixed(2);
		}

		ctrl.$onInit = function() {

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
				model: 'Model',
				option: 'ModelOption',
				manualOption: 'ExtraOption'
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

				}, resp => {
					console.log("Failed to submit");

					trl.alert = new SubmitAlert(0, 'Κάτι συνέβει και οι αλλαγές σας δεν καταχωρήθηκαν.');
				})
				.then(() => ctrl.alert.show())

		}

		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
