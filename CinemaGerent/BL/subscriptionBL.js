
const apiDAL = require('../DAL/cinemagerentApiDAL')
const axios = require('axios')


const getSubscriptions = async (id) => 
{
    let data = await apiDAL.getAll();
    let member = data.data.members.find(m => m._id === id);
    if (member) return member;
}
const updateSubs = async (subsObj) => 
{
    return axios.put('http://localhost:8000/api/members/update',subsObj) 
}
const addSubs = async (subsObj) => 
{
    return axios.post('http://localhost:8000/api/members/add',subsObj) 
}
const deleteSubs = async (id) => 
{
    return axios.delete('http://localhost:8000/api/members/delete/' + id) 
}

module.exports = {getSubscriptions,updateSubs,addSubs,deleteSubs}