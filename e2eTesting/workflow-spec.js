var appUrl =
	`http://localhost/configurator/src/#!/app/endpoint=https:**karenta-onedealer.kosmocar.gr&redirectionPath=redirectPathMissing/car/make/52/family/`;

var delay = require('./delay');
var randomFrom = require('./randomFrom');

beforeEach(() => {
	browser.driver.manage()
		.window()
		.maximize();
	delay(100);
});

describe('Complete Workflow', () => {
	it('should submit a configurator from start to end without adding any options', () => {

		browser.get(appUrl);

		var allCars = element.all(by.tagName('car'));

		browser.wait(protractor.ExpectedConditions.presenceOf(allCars), 8000,
			'Element taking too long to appear in the DOM');

		var randomCar = null;

		randomFrom(allCars)
			.then(car => {
				randomCar = car.all((by.tagName('a')));
				randomCar.click();

				var allModels = element(by.tagName('tbody'))
					.all(by.tagName('tr'));

				browser.wait(protractor.ExpectedConditions.presenceOf(allModels), 8000,
					'Element taking too long to appear in the DOM');

				browser.wait(ExpectedConditions.invisibilityOf($('#loading-bar')), 1000);

				randomFrom(allModels)
					.then(model => {
						randomModel = model;
						randomModel.click();

						browser.wait(ExpectedConditions.invisibilityOf($('#loading-bar')), 1000);

						element(by.buttonText('Επόμενο'))
							.click();

						browser.wait(ExpectedConditions.invisibilityOf($('#loading-bar')), 1000);

						element(by.buttonText('Επόμενο'))
							.click();

						browser.wait(ExpectedConditions.invisibilityOf($('#loading-bar')), 1000);

						element(by.buttonText('Επόμενο'))
							.click();

						let calcButton = element(by.buttonText('Υπολογισμός'));

						browser.wait(protractor.ExpectedConditions.presenceOf(calcButton), 8000,
							'Element taking too long to appear in the DOM');

						calcButton.click();

						element(by.buttonText('Υποβολή'))
							.click();

					})

			});

	})

	it('should submit a configurator from start to end with adding options', () => {

		var EC = protractor.ExpectedConditions;

		browser.get(appUrl);

		var upFamily = element(by.id('122'));

		browser.wait(EC.presenceOf(upFamily), 30000,
			'Element taking too long to appear in the DOM');

		upFamily.click();

		var singleCar = element(by.id('car-13'));

		browser.wait(EC.invisibilityOf($('#loading-bar')), 1000);

		browser.wait(EC.presenceOf(singleCar), 8000,
			'Model taking too long to appear in the DOM');

		browser.executeScript("arguments[0].click();", singleCar);

		browser.sleep(500)
		element(by.buttonText('Επόμενο'))
			.click();

		var myColor = element(by.id('G2G2'));

		browser.wait(EC.presenceOf(myColor), 10000,
			'Color taking too long to appear in the DOM');

		browser.wait(EC.invisibilityOf($('#loading-bar')), 1000);

		browser.executeScript("arguments[0].click();", myColor);

		browser.sleep(500)

		element(by.buttonText('Επόμενο'))
			.click();

		browser.wait(EC.invisibilityOf($('#loading-bar')), 1000);

		var aEquipments = element(by.tagName('tbody'))
			.all(by.tagName('tr'));

		browser.driver.wait(() => {
				return aEquipments.count();
			}, 1000, 'Too late')
			.then(c => {
				let i = 0;
				for (i; i < c; i++) {
					browser.executeScript("arguments[0].click();", aEquipments.get(i));
					browser.sleep(500);
				}

				i = 0;

				for (i; i < 2; i++) {

					let codeInput = element(by.model('$ctrl.equipment.code'));
					codeInput.sendKeys(Math.random()
						.toString(36)
						.substring(7));

					let descInput = element(by.model('$ctrl.equipment.description'));
					descInput.sendKeys(Math.random()
						.toString(36)
						.substring(7));

					let co2Input = element(by.model('$ctrl.equipment.co2'));
					co2Input.sendKeys(Math.floor(Math.random() * 100));

					let priceInput = element(by.model('$ctrl.equipment.price'));
					priceInput.sendKeys(Math.floor(Math.random() * 1000));

					browser.executeScript("arguments[0].click();", element(by.buttonText('Προσθήκη')));

				}

				browser.executeScript("arguments[0].click();", element(by.buttonText('Επόμενο')));

				let calcButton = element(by.buttonText('Υπολογισμός'));

				browser.executeScript("arguments[0].click();", calcButton);

				element(by.buttonText('Υποβολή'))
					.click();

			})

	})
})
