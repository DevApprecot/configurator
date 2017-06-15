module.exports = (elements) => {

	let deferred = protractor.promise.defer();

	let number = 0;

	elements.count()
		.then(count => {
			return Math.floor(Math.random() * count);
		})
		.then(randomNumber => {
			deferred.fulfill(elements.get(randomNumber));
		})

	return deferred.promise;
}
