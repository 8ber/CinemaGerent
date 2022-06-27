const axios = require('axios')

const getMembers = async ()=> 
{
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
}

module.exports = { getMembers }