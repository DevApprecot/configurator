var appUrl =
	`http://localhost/configurator/src/#!/app/endpoint=https:**karenta-onedealer.kosmocar.gr&redirectionPath=redirectPathMissing/car/make/52/family/`;

var delay = require('./delay');
var randomFrom = require('./randomFrom');

beforeEach(() => {
	delay(50);
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

		browser.get(appUrl);

		var upFamily = element.all(by.id('122'));

		browser.wait(protractor.ExpectedConditions.presenceOf(upFamily), 8000,
			'Element taking too long to appear in the DOM');

		upFamily.click();

		//Needs to be updated

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

	})
})
