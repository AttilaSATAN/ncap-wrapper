'use strict';

const axios = require('axios');

async function getVehicles(year, manufacturer, model) {
    let url = `https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/${year}/make/${manufacturer}/model/${model}?format=json`;
    console.log(url)
    return axios.get(url);
}

async function getStars(year, manufacturer, model) {
    let url = `https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/${year}/make/${manufacturer}/model/${model}?format=json`;
}

module.exports = { getVehicles, getStars };