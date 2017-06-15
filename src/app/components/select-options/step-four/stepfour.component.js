(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepFour', {
			templateUrl: './app/components/select-options/step-four/stepfour.html',
			controller: StepFourCtrl,
			bindings: {
				imgPath: "@",
				defaultImg: "@",
				isSubmitted: '@'
			},
		});

	StepFourCtrl.$inject = ['$window', '$stateParams', 'Data', 'API', 'ApiUrl', 'RedirectPath', 'Option', 'SubmitAlert',
		'TAX_FEE',
		'RegistrationFee', 'TrafficCharge', '$rootScope', '$timeout', 'cfpLoadingBar'
	];

	function StepFourCtrl($window, $stateParams, Data, API, ApiUrl, RedirectPath, Option, SubmitAlert, TAX_FEE,
		RegistrationFee, TrafficCharge, $rootScope, $timeout, cfpLoadingBar) {
		var ctrl = this;
		ctrl.taxFee = TAX_FEE;
		ctrl.finalPrice = {
			noRegTax: null,
			beforeTax: null,
			afterTax: null
		};
		ctrl.carImg = ``;

		ctrl.calcTrafficCharge = () => {
			ctrl.trafficCharge = TrafficCharge.calculate(ctrl.model, ctrl.color, ctrl.equipment.autoEquipments, ctrl.equipment
				.manualEquipments);
		}

		ctrl.calcFee = function() {
			ctrl.regTax = +RegistrationFee.calculate(ctrl.model, ctrl.color, ctrl.equipment.autoEquipments, ctrl.equipment
				.manualEquipments);

			ctrl.calcFinalPrices();
		}

		ctrl.calcFinalPrices = function() {

			if (isNaN(ctrl.regTax) || !ctrl.regTax) {
				return;
			}

			ctrl.finalPrice.beforeTax = Number((Number(ctrl.finalPrice.noRegTax) + Number(ctrl.regTax))
				.toFixed(2));
			ctrl.finalPrice.afterTax = Number(((Number(ctrl.finalPrice.noRegTax) * Number(ctrl.taxFee)) + Number(ctrl.regTax))
				.toFixed(2))

		}

		ctrl.$onInit = function() {
			let data = {};
			Object.keys(Data.get)
				.map(val => {
					ctrl[val] = Data.get[val]()
					data[val] = Data.get[val]();
				})

			console.log(angular.toJson(data));
			ctrl.finalPrice.noRegTax = Data.get.currentPrice();

			ctrl.carImg = ctrl.imgPath + findImage();

		};

		function findImage() {

			function notInEquipment() {
				if (!ctrl.color.Photo) {
					if (!ctrl.model.Photo) {
						return ctrl.family.Photo;
					} else {
						return ctrl.model.Photo;
					}
				} else {
					return ctrl.color.Photo;
				}
			}

			if (ctrl.equipment.autoEquipments.length) {
				let idx = ctrl.equipment.autoEquipments.findIndex(e => e.Photo);
				if (idx === -1) {
					return notInEquipment();
				} else {
					return ctrl.equipment.autoEquipments[idx].Photo;
				}
			} else {
				return notInEquipment();
			}
		}

		ctrl.submitOptions = () => {

			cfpLoadingBar.start();

			let options = [];
			let totalBasicPrice = 0;
			let totalCo2 = 0;
			let registrationFee = 0;
			let trafficCharge = 0;

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
				trafficCharge = ctrl.trafficCharge;
			}

			prepareData();

			API.submit(options, totalBasicPrice, totalCo2, registrationFee, trafficCharge)
				.then(responseText => {

					console.log("Submitted successfully", responseText)

					ctrl.alert = new SubmitAlert(1, 'Οι επιλογές σας καταχωρήθηκαν επιτυχώς.');

					cfpLoadingBar.complete();
					ctrl.alert.show()

					Data.clear.options();
					Data.set.submitted(true);

					$window.location.href = ApiUrl() + RedirectPath() + '?conf=' + angular.fromJson(responseText.slice(1, -1))
						.code;

				}, resp => {
					console.log("Failed to submit", resp);
					ctrl.alert = new SubmitAlert(0, 'Κάτι συνέβει και οι αλλαγές σας δεν καταχωρήθηκαν.');
					cfpLoadingBar.complete();
					ctrl.alert.show()
				})

		}

		ctrl.$onChanges = function(changesObj) {
			if (changesObj.isSubmitted.currentValue === 'true') {
				ctrl.submitOptions();
			}
		};
		ctrl.$onDestory = function() {};

		ctrl.setFormValidity = (form) => {
			$timeout(() => {
				$rootScope.$broadcast('formChanged', form.$valid);
			})
		}
	}
})();
