const axios = require('axios');

module.exports = function track(code) {
    const request_config = {
        method: 'get',
        url: `http://api.postmon.com.br/v1/rastreio/ect/${code}`,

    };
    return axios(request_config).then(result => result.data);
};