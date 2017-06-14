describe('RegistratioFee', () => {

	var RegistratioFee, $httpBackend, scope;

	beforeEach(angular.mock.module('configurator'));

	beforeEach(inject((_RegistrationFee_) => {
		RegistratioFee = _RegistrationFee_;
	}))

	/**Checks if Service Exists */
	it('should exist', () => {
		expect(RegistratioFee)
			.toBeDefined();
	})

	describe('.calculate()', () => {

		/**Checks if method exists */

		it('should exist', () => {
			expect(RegistratioFee.calculate)
				.toBeDefined();
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly', () => {

			const editData = readJSON('src/app/unit-test-data/edit-data.json');

			expect(RegistratioFee.calculate(editData.model, editData.color, editData.equipment.autoEquipments, editData.equipment
					.manualEquipments))
				.toEqual(311.87)
		})
	})
})
