'use strict';

const axios = require('axios');
/**
 * @description Gets vehicle data from NHTSA API base on params.
 * @param {number} year Year of model
 * @param {string} manufacturer Manufacturer vompany of model
 * @param {string} model name of model
 * @returns {Promise<Object>} Promise that going to be resolved as vehicles' raw data. 
 */
async function getVehicles(year, manufacturer, model) {
    let url = `https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/${year}/make/${manufacturer}/model/${model}?format=json`;
    
    return axios.get(url);
}

/**
 * @description Gets vehicle data from NHTSA API base on VehicleId.
 * 
 * @param {Vehicle} vehicle Vehicle instance of a model.
 * @param {numer} Vehicle.VehicleId NHTSA NCAP ID of vehicle.
 */
async function getStars(vehicle) {
    let url = `https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/${vehicle.VehicleId}?format=json`;

    return axios.get(url);
}

module.exports = { getVehicles, getStars };