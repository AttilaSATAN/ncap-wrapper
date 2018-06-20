'use strict';

const nhtsa = require('./nhtsa');
const Vehicle = require('./vehicle');

/**
 * Class representation of results of queried vehicle.
 */
class Vehicles {

    /**
     * Creates a vehicles instance
     * @constructor
     * @param {object} queryData - nhtsa api request paramaters.
     * @param {number} queryData.year - year of vehicle model.
     * @param {string} queryData.manufacturer - manufacturer of vehicle.
     * @param {string} queryData.model - model name of vehicle.
     * @param {object} rawVehicles 
     */
    constructor(queryData, rawVehicles) {
        /**
         * Vehicle collection.
         * @type {Vehicle[]}
         */
        this.Results = [];

        if (rawVehicles && rawVehicles.length) {
            for (let rv of rawVehicles) {
                this.Results.push(new Vehicle(queryData, rv));
            }
        }
    }
    /**
     * Number of vehicle in the Vehicles#Results array.
     * @type {number}
     */
    get Count() {
        return this.Results.length;
    }
    /**
     * Populates Vehicle#CrashRating property of elements in Results array.
     */
    async populateCrashRatings() {
        for(let v of this.Results){
            await v.populateCrashRating();
        }
     }
     toJSON() {
        return {
          Count: this.Count,
          // this could be a simple this.Results.length but this way I could provide documantation for Vehicles#Count.
          Results: this.Results 
        }
      }
    /**
     * 
     * @param {number} year year of queried vehicle model.
     * @param {string} manufacturer manufacturer company of the queried vehicle model.
     * @param {string} model model name of queried vehicle model.
     * 
     * @returns {Vehicles} Response of query. 
     */
    static async query(year, manufacturer, model) {
        
        let vehicleData;

        if(!year || !manufacturer || !model) return new Vehicles(); 
        try {
            vehicleData = await nhtsa.getVehicles(year, manufacturer, model)

        } catch (error) {
            return new Vehicles();
        }

        return new Vehicles({ year, manufacturer, model }, vehicleData.data.Results);
    }
}


module.exports = Vehicles;