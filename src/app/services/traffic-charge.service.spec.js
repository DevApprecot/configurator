describe('RegistratioFee', () => {

	var TrafficCharge;

	beforeEach(angular.mock.module('configurator'));

	beforeEach(inject((_TrafficCharge_) => {
		TrafficCharge = _TrafficCharge_;
	}))

	describe('.calculate()', () => {

		/**Checks if reg fee is calculated correctly */
		it('should calculate traffic charge correctly for random choice data', () => {

			const editData = readJSON('src/app/unit-test-data/edit-data.json');

			expect(TrafficCharge.calculate(editData.model, editData.color, editData.equipment.autoEquipments, editData.equipment
					.manualEquipments))
				.toEqual(115.64)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate traffic charge correctly for Hybrid car data with FuelType equal to 3', () => {

			const hybridCar = readJSON('src/app/unit-test-data/hybrid3.json');

			expect(TrafficCharge.calculate(hybridCar.model, hybridCar.color, hybridCar.equipment.autoEquipments, hybridCar.equipment
					.manualEquipments))
				.toEqual(0)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate traffic charge correctly for Hybrid car data with FuelType equal to 4', () => {

			const hybridCar = readJSON('src/app/unit-test-data/hybrid4.json');

			expect(TrafficCharge.calculate(hybridCar.model, hybridCar.color, hybridCar.equipment.autoEquipments, hybridCar.equipment
					.manualEquipments))
				.toEqual(404.43)
		})

		/**Checks if reg fee is calculated correctly */
		it('should calculate traffic charge correctly for Electric car data', () => {

			const electricCar = readJSON('src/app/unit-test-data/electric.json');

			expect(TrafficCharge.calculate(electricCar.model, electricCar.color, electricCar.equipment.autoEquipments, electricCar.equipment
					.manualEquipments))
				.toEqual(0)
		})
	})
})
