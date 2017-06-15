let delayed = false;

module.exports = (delayTime) => {
	if (delayed)
		return;

	delayed = true;

	var origFn = browser.driver.controlFlow()
		.execute;
	browser.driver.controlFlow()
		.execute = function() {
			var args = arguments;

			origFn.call(browser.driver.controlFlow(), function() {
				return protractor.promise.delayed(delayTime); // here we can adjust the execution speed
			});
			return origFn.apply(browser.driver.controlFlow(), args);
		};
}
