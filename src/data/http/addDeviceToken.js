import {apiAddress} from "../config/api";

const axios = require('axios');

const addDeviceToken = (data) => {
    axios.post(apiAddress + '/deviceTokens', data)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default addDeviceToken