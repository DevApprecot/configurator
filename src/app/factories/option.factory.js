(function() {
	'use strict';

	angular
		.module('configurator')
		.factory('Option', Option);

	Option.$inject = [];

	function Option() {

		return class Option {
			constructor(OptionCode, OptionName, BasicOptionPrice, CO2, OptionType) {
				this.OptionCode = OptionCode;
				this.OptionName = OptionName;
				this.BasicOptionPrice = BasicOptionPrice;
				this.CO2 = CO2;
				this.OptionType = OptionType;
			}
		};

	}
})();
