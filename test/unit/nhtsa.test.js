const nhtsa = require('../../nhtsa');


test('getVehicles fetches a collection of vehicles from NHTSA API', async () => {
    let data;
    try {
        data = await nhtsa.getVehicles(2015, 'audi', 'a3');
    } catch (error) {
        console.log(error)
    }

    expect(data.data).toHaveProperty('Count');
    expect(data.data).toHaveProperty('Message');
    expect(data.data).toHaveProperty('Results');

});


test('getStars fetches the vehicle data from NHTSA API', async () => {
    let vehicle = {VehicleId:9403},data;
    try {
       data = await nhtsa.getStars({VehicleId:9403});
    } catch (error) {
        console.error(error)
    }
    
    expect(data.data).toHaveProperty('Results');    
    expect(data.data.Results[0]).toHaveProperty('OverallRating');
    expect(data.data.Results[0]).toHaveProperty('VehicleDescription');


});