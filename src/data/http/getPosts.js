import {apiAddress} from "../config/api";

const axios = require('axios');

const getPosts = () => {
    return axios.get(apiAddress + '/posts')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default getPosts