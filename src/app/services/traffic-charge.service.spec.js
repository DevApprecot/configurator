describe('RegistratioFee', () => {

	var TrafficCharge;

	beforeEach(angular.mock.module('configurator'));

	beforeEach(inject((_TrafficCharge_) => {
		TrafficCharge = _TrafficCharge_;
	}))

	/**Checks if Service Exists */
	it('should exist', () => {
		expect(TrafficCharge)
			.toBeDefined();
	})

	describe('.calculate()', () => {

		/**Checks if method exists */

		it('should exist', () => {
			expect(TrafficCharge.calculate)
				.toBeDefined();
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly', () => {

			const editData = readJSON('src/app/unit-test-data/edit-data.json');

			expect(TrafficCharge.calculate(editData.model, editData.color, editData.equipment.autoEquipments, editData.equipment
					.manualEquipments))
				.toEqual(115.64)
		})
	})
})
