const axios = require('axios');

module.exports = {
    create: (url) => {
        return axios.create({
            baseURL: url,
        });
    }
}