const userModel = require('../models/usersModel')
const usersDAL = require('../DAL/usersDAL')
const permissionsDAL = require('../DAL/permissionsDAL')

const login = (obj) => {
    return new Promise((resolve) => {
        userModel.findOne({ username: obj.username }, (err, data) => {
            if (!data) resolve("Unknown username: " + obj.username)
            else if (err) console.log(err)
            else {
                if (data.password === obj.password) resolve({loginStatus: true, id: data._id.toString()})
                else resolve("Login attempt failed.")
            }
        })
    })
}
// checks if the user is found in the DB & if he is mutable
//to protect editing of users
const checkUser = (obj) => {
    return new Promise((resolve) => {
        userModel.findOne({ username: obj.username, mutable: true }, (err, data) => {
            if (!data) resolve("Can't find: " + obj.username + ".")
            else if (data.mutable) resolve(true)
            else if (err) console.log(err)
        })
    })
}


const storePassword = (obj) => {
    return new Promise((resolve) => {
        userModel.findOneAndUpdate({ username: obj.username }, { password: obj.password, mutable : false }, (err) => {
            if (err) console.log(err)
            else resolve(true)
        })
    })
}

// a func to get data from the jFiles about the user - via his ID (that i got using login function)
const getUserData = async (id) => 
{
    let userInfo = await usersDAL.getUser(id);
    let userPermissions  = await permissionsDAL.getUserPermissions(id)
    return {...userInfo, permissions: userPermissions.permissions};
}

module.exports = { login, checkUser, storePassword, getUserData }