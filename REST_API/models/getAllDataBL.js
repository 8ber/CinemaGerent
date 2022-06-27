const membersDAL = require(`../DAL/membersWS`)
const membersModel = require(`../models/membersModel`)

const moviesDAL = require(`../DAL/moviesWS`)
const moviesModel = require(`../models/moviesModel`)

membersDAL.getMembers().then(async (data) => 
{
    var members = await data.data.map((x)=> {
        return {"name" : x.name,"email": x.email ,"city" : x.address.city}})
    await members.forEach(member =>{
        membersModel({
            "name" : member.name,
            "email" : member.email,
            "city" : member.city
        }).save((err)=>{
            if (err) reject(err)
        })
    })
})

moviesDAL.getMovies().then(async (data) => 
{
    var movies = await data.data.map((x)=> {
        return {"name" : x.name,"genres": x.genres ,"image" : x.image.original, "premiered" : x.premiered}
    })
    await movies.forEach(movie =>{
        moviesModel({
            "name" : movie.name,
            "genres" : movie.genres,
            "image" : movie.image,
            "premiered" : movie.premiered
        }).save((err)=>{
            if (err) reject(err)
        })
    })
})
