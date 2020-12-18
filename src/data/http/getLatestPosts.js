import {apiAddress} from "../config/api";

const axios = require('axios');

const getLatestPosts = () => {
    return axios.get(apiAddress + '/posts/latest')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default getLatestPosts