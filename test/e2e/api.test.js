const axios = require('axios');

test('There is no end-point other then /vehicles and /vehicles/:year/:manufacturer/:model', async ()=>{
    let r1, r2, r3, r4;
    try {
        r1 = await axios.get('http://localhost:8888/');
    } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toBe('Not Found');
    }
    try {
        r2 = await axios.get('http://localhost:8888/vehicles/1908/ford/');
    } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toBe('Not Found');
    }
    try {
        r3 = await axios.get('http://localhost:8888/vehicles/1908/ford/t');
    } catch (error) {console.error(error);}

    try {
        r4 = await axios.post('http://localhost:8888/vehicles', {
            "modelYear": 2015,
            "manufacturer": "Audi",
            "model": "A3"
        });
    } catch (error) {console.error(error);}

    expect(r4.data).toMatchObject({Count:4,Results: [
        { Description: '2015 Audi A3 4 DR AWD', VehicleId: 9403 },
        { Description: '2015 Audi A3 4 DR FWD', VehicleId: 9408 },
        { Description: '2015 Audi A3 C AWD', VehicleId: 9405 },
        { Description: '2015 Audi A3 C FWD', VehicleId: 9406 }]})   
});

test('Respond for bad paramaters is an empty object with status 200', async ()=>{
    let r1, r2;
    try {
        r1 = await axios.post('http://localhost:8888/vehicles', {
            "manufacturer": "Honda",
            "model": "Accord"
        });
    } catch (error) {console.error(error);} 

    expect(r1.data).toMatchObject({Count: 0,Results: []});
    
    try {
        r2 = await axios.get('http://localhost:8888/vehicles/1908/ford/t');
    } catch (error) {console.error(error);}
    expect(r2.data).toMatchObject({Count: 0,Results: []});
});