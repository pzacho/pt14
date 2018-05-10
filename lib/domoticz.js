const axios = require('axios');
const moment = require('moment');

const domoticzServer = 'http://pt14.local:8080';
const sunRiseSetPath = '/json.htm?type=command&param=getSunRiseSet';

class Domoticz {
    constructor()
    {
        
    }

    getSunriseSunset() {
        return new Promise((resolve,reject) => {
            axios.get('http://pt14.local:8080/json.htm?type=command&param=getSunRiseSet')
            .then((response) => {
                return resolve(response.data);
            })
            .catch((error) => {
                return reject(error);
            })
        })
    }
}

module.exports = Domoticz;