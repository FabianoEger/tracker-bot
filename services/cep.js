const axios = require('axios');

module.exports = function getCep(cep) {
    const request_config = {
        method: 'get',
        url: `http://api.postmon.com.br/v1/cep/${cep}`,
    }
    return axios(request_config).then(result => result.data);
};
