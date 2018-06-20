const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Vehicles = require('./vehicles');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.post('/vehicles', async function(req, res){
    let vehicles = await Vehicles.query(req.body.modelYear, req.body.manufacturer, req.body.model);
    if(req.query.withRating === 'true'){
       await vehicles.populateCrashRatings();
    }

    res.status(200).json(vehicles);
});
app.get('/vehicles/:year/:manufacturer/:model', async function(req, res){

    let vehicles = await Vehicles.query(req.year, req.manufacturer, req.model);
    if(req.query.withRating === 'true'){
       await vehicles.populateCrashRatings();
    }

    res.status(200).json(vehicles);
});

app.param('year', function(req, res, next, year){
    req.year = 1 * year;
    next();
});

app.param('manufacturer', function (req, res, next, manufacturer){
    req.manufacturer = manufacturer;
    next();
})

app.param('model', function (req, res, next, model){
    req.model = model;
    next();
})

app.use((req, res) => {
    res.status(404).json('Not Found');
})
app.listen(8888);