const nhtsa = require('../../nhtsa');


test('data is a vehicle', async () => {
    let data;
    try {
        data = await nhtsa.getVehicles(2015, 'audi', 'a3');
        expect(data.data).toHaveProperty('Count');
    } catch (error) {
        console.log(data)
    }
    //console.log(data);
    //expect(data).resolves.to

});
