const Vehicle = require('../../vehicle');
const nhtsa = require('../../nhtsa');

test('Vehicle is a constructor', () => {
    expect(typeof Vehicle).toBe('function');
});

test('Vehicle instances have public properties and a method',async () => {
    data = await nhtsa.getVehicles(2015, 'audi', 'a3');
    let vehicle = new Vehicle({year: 2015,manufaturer:'audi',model:'a3'}, data.data.Results[0]);

    expect(vehicle).toHaveProperty('VehicleId');
    expect(vehicle).toHaveProperty('Description');
    expect(vehicle).toHaveProperty('populateCrashRating');
    expect(typeof vehicle.populateCrashRating).toBe('function');

});

test('Vehicle instances have rating data after populated',async () => {
    data = await nhtsa.getVehicles(2015, 'audi', 'a3');
    let vehicle = new Vehicle({year: 2015,manufaturer:'audi',model:'a3'}, data.data.Results[0]);
    expect(vehicle).not.toHaveProperty('CrashRaiting');
    await vehicle.populateCrashRating();
    expect(vehicle).toHaveProperty('CrashRaiting');
    expect(vehicle.CrashRaiting).toBe('5');
});

