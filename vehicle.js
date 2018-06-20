'use strict';

const nhtsa = require('./nhtsa');

const querySymbol = Symbol('query');

/**
 * Class representing a vehicle.
 * 
 */
class Vehicle {
    /**
     * 
     * Creates a vehicle instance
     * @constructor
     * @param {object} queryData - nhtsa api request paramaters.
     * @param {number} queryData.year - year of vehicle model.
     * @param {string} queryData.manufacturer - manufacturer of vehicle.
     * @param {string} queryData.model - model name of vehicle.
     * @param {object} rawVehicle - vehicle data from response object of nhtsa 
     * @param {string} rawVehicle.VehicleDescription - Model description
     * @param {number} rawVehicle.VehicleId - nhtsa id for the model.
     */
    constructor(queryData, rawVehicle){

    
       /**
        * Private in case of direct usage of instance in JSON.stringify.
        * @type {Object}
        */
        this[querySymbol] = queryData;
        /**
         * NHTSA ID
         * @type {number}
         */
        this.VehicleId = rawVehicle.VehicleId;
        /**
         * Model description of vehicle.
         * @type {string}
         */
        this.Description = rawVehicle.VehicleDescription;
    }
    /**
     * Populates Vehicle#CrashRating data from NCAP API  
     */
    async populateCrashRating(){
        let data = await nhtsa.getStars(this);
        /**
         * Overall Crashrating star count of vehicle.
         * @type {string}
         */
        this.CrashRaiting = data.data.Results[0].OverallRating;

        return data;
    }
}

module.exports = Vehicle;