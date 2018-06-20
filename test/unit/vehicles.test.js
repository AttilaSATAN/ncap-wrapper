const Vehicles = require('../../vehicles');



test('Vehicles is a costructor', () => {
    expect(typeof Vehicles).toBe('function');
});

test('Vehicles.query static method returns with Vehiles instance.', async () => {

    let vehicles = await Vehicles.query(2015, 'audi', 'a3');
    expect(vehicles).toBeInstanceOf(Vehicles);
});

test('Vehicles Results property shoud be populated when a valid query requested', async () => {

    let vehicles = await Vehicles.query(2015, 'audi', 'a3');
    expect(vehicles.Count).toBe(4);
    expect(vehicles.Results).toMatchObject([
        { Description: '2015 Audi A3 4 DR AWD', VehicleId: 9403 },
        { Description: '2015 Audi A3 4 DR FWD', VehicleId: 9408 },
        { Description: '2015 Audi A3 C AWD', VehicleId: 9405 },
        { Description: '2015 Audi A3 C FWD', VehicleId: 9406 }])
});

test('Vehicles#Results with wrong or missiong paramters Vehicles.query always retrns an empty Vehicles.', async () => {
    let vehicles = await Vehicles.query(2015, 'audi');

    expect(vehicles).toMatchObject({Count:0, Results:[]});
});

test('Vehicles#Results do have a Vehicles#populateCrashRatings method which populates Vehicle#CrashRating property of Results array elements.', async () => {
    let vehicles = await Vehicles.query(2015, 'audi', 'a3');
    expect(vehicles.Results[0]).not.toHaveProperty('CrashRaiting');
    expect(vehicles).toHaveProperty('populateCrashRatings');
    expect(typeof vehicles.populateCrashRatings).toBe('function');
    await vehicles.populateCrashRatings();
    expect(vehicles.Results[0]).toHaveProperty('CrashRaiting');
    expect(vehicles.Results[0].CrashRaiting).toBe('5');
    
});