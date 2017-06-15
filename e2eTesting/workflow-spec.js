var appUrl =
	`http://localhost/configurator/src/#!/app/endpoint=https:**karenta-onedealer.kosmocar.gr&redirectionPath=redirectPathMissing/car/make/52/family/`;

describe('Complete Workflow', () => {
	it('should submit a configurator from start to end', () => {
		browser.get(appUrl);

		var allCars = element.all(by.tagName('car'))
		allCars.count()
			.then((count) => {
				return Math.floor(Math.random() * count) + 1;
			})
			.then((randomNumber) => {
				allCars.get(randomNumber)
					.all((by.tagName('a')))
					.click();
			});

	})
})
