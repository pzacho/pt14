var Domoticz = require('../lib/domoticz.js');
var moment = require('moment');

class Sunrise {
    constructor() {
        this.suncache = null;
    }

    getSunriseSunset() {
        return new Promise((response,reject) => {
            var domoticz = new Domoticz();
            if (this.suncache === null) {
                domoticz.getSunriseSunset()
                .then((result) => {
                    this.suncache = result;
                    return response(result);
                },
                (rej) => {
                    return reject(rej);
                })
            }
            else {
                if (moment().date() != moment(this.suncache.ServerTime).date()) {
                // update sunrise and -set time
                domoticz.getSunriseSunset()
                .then((result) => {
                    this.suncache = result;
                    return response(result);
                },
                (rej) => {
                    return reject(rej);
                })
                }
                else {
                    return response(this.suncache);
                }
            }
        })
    }
}

module.exports = Sunrise;