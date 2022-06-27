
const apiDAL = require('../DAL/cinemagerentApiDAL')
const axios = require('axios')


const getMovie = async (id) => 
{
    let data = await apiDAL.getAll();
    let movie = data.data.movies.find(m => m._id === id);
    if (movie) return movie;
}
const updateMovie = async (movieObj) => 
{
    return axios.put('http://localhost:8000/api/movies/update',movieObj) 
}
const addMovie = async (movieObj) => 
{
    return axios.post('http://localhost:8000/api/movies/add',movieObj) 
}
const deleteMovie = async (id) => 
{
    return axios.delete('http://localhost:8000/api/movies/delete/' + id) 
}

module.exports = {getMovie,updateMovie,addMovie,deleteMovie}