const axios = require('axios');

const getAll = ()=> {
    return axios.get('http://localhost:8000/api/subscriptions/getall')
}

const getStats = ()=> {
    return axios.get('http://localhost:8000/api/stats')
}

const sendSubs = (subsObj) => {
    return axios.post('http://localhost:8000/api/subscriptions/sendSub', subsObj).catch(err =>console.log(err))
}

module.exports = {getAll,getStats,sendSubs}