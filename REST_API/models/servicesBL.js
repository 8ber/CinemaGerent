const membersModel = require(`../models/membersModel`)
const moviesModel = require(`../models/moviesModel`)
const subscriptionsModel = require(`../models/subscriptionsModel`)


const getMovies = async () => {
    let allMovies = await moviesModel.find({})
    return allMovies
}

const getSubscriptions = async () => {
    let allSubscriptions = await subscriptionsModel.find({})
    return allSubscriptions
}

const getMembers = async () => {
    let allMembers = await membersModel.find({});
    return allMembers;
}

const getStats = async () => {

let stats = {}
let numOfMovies = await getMovies()
let numOfMembers = await getMembers()
let numOfSubscriptions = await getSubscriptions()

return {numOfMovies : numOfMovies.length, numOfMembers : numOfMembers.length, numOfSubscriptions : numOfSubscriptions.length}
}

const updateMovie = async (movToUpdate) =>
{
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndUpdate(movToUpdate._id, { 
            "_id" : movToUpdate._id,
            "name" : movToUpdate.name,
            "geners" : movToUpdate.geners,
            "image" : movToUpdate.image,
            "premiered" : movToUpdate.premiered
         }, (err)=>{
            if (err) reject(err)
            else resolve(`${movToUpdate._id} Updated.`)
        })
    })
}

const addMovie = async (movToAdd) =>
{
    return new Promise((resolve, reject) => 
    {
        let movie = moviesModel({ 
            "name" : movToAdd.name,
            "genres" : movToAdd.genres,
            "image" : movToAdd.image,
            "premiered" : movToAdd.premiered
         });
         movie.save((err)=>{
            if (err) reject(err)
            else resolve(`${movie._id} Created.`)})
         })
}

const delFromSubscriptions = async (arrToDel) => {
    await arrToDel.forEach(async id =>{await subscriptionsModel.findOneAndDelete({"_id" : id._id}) })
}

const deleteMovie = async (id) => 
{
    allSubs = await getSubscriptions();
    let subsToDel = allSubs.filter(sub=> sub.movieid.toString() == id)
    await delFromSubscriptions(subsToDel);

    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndDelete(id,(err)=>{
            if (err) reject(err)
            else resolve(`${id} Deleted.`)
        })
    })
}

const createSubs = (newSubObj) => {
    return new Promise((resolve, reject) => 
    {
        let sub = subscriptionsModel({ 
            "memberid" : newSubObj.memberid,
            "movieid":newSubObj.movieid,
            "date":newSubObj.date
         });
         sub.save((err)=>{
            if (err) reject(err)
            else resolve(`${sub._id} Created.`)})
         })
}

const addMember = async (memToAdd) =>
{
    return new Promise((resolve, reject) => 
    {
        let member = membersModel({ 
            "name" : memToAdd.name,
            "email" : memToAdd.email,
            "city" : memToAdd.city
         });
         member.save((err)=>{
            if (err) reject(err)
            else resolve(`${member._id} Created.`)})
         })
}

const updateMember = async (memToUpdate) =>
{
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndUpdate(memToUpdate._id, { 
            "_id" : memToUpdate._id,
            "name" : memToUpdate.name,
            "email" : memToUpdate.email,
            "city" : memToUpdate.city,
         }, (err)=>{
            if (err) reject(err)
            else resolve(`${memToUpdate._id} Updated.`)
        })
    })
}

const deleteMember = async (id) => 
{
    allSubs = await getSubscriptions();
    let subsToDel = allSubs.filter(sub=> sub.memberid.toString() == id)
    await delFromSubscriptions(subsToDel);

    return new Promise((resolve, reject) => {
        membersModel.findByIdAndDelete(id,(err)=>{
            if (err) reject(err)
            else resolve(`${id} Deleted.`)
        })
    })
}
module.exports = {getSubscriptions, getMovies, getMembers, getStats, updateMovie ,addMovie ,deleteMovie ,createSubs , addMember, updateMember, deleteMember}
