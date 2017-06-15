describe('RegistratioFee', () => {

	var RegistratioFee;

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

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly for random choice data', () => {

			const editData = readJSON('src/app/unit-test-data/edit-data.json');

			expect(RegistratioFee.calculate(editData.model, editData.color, editData.equipment.autoEquipments, editData.equipment
					.manualEquipments))
				.toEqual(311.87)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly for Hybrid car data with FuelType equal to 3', () => {

			const hybridCar = readJSON('src/app/unit-test-data/hybrid3.json');

			expect(RegistratioFee.calculate(hybridCar.model, hybridCar.color, hybridCar.equipment.autoEquipments,
					hybridCar.equipment
					.manualEquipments))
				.toEqual(8818.22)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly for Hybrid car data with FuelType equal to 3', () => {

			const hybridCar = readJSON('src/app/unit-test-data/hybrid4.json');

			expect(RegistratioFee.calculate(hybridCar.model, hybridCar.color, hybridCar.equipment.autoEquipments,
					hybridCar.equipment
					.manualEquipments))
				.toEqual(2254.33)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate registration fee correctly for Electric car data', () => {

			const electricCar = readJSON('src/app/unit-test-data/electric.json');

			expect(RegistratioFee.calculate(electricCar.model, electricCar.color, electricCar.equipment.autoEquipments,
					electricCar.equipment
					.manualEquipments))
				.toEqual(0)
		})
	})
})
