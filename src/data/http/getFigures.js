import {apiAddress} from "../config/api";

const axios = require('axios');

const getFigures = () => {
    return axios.get(apiAddress + '/figures')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default getFigures