const jFile = require('jsonfile')

const getUser = async (id) => {
    let users = await new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/users.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
    return users.users.find(user => user.id === id)
} 

const getAllUsers = async () => {
    let users = await new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/users.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
    return users.users
}

const saveAll = async (updatedUsersFile) => 
{
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/users.json",{ users: updatedUsersFile }, (err) => {
            if (err) reject(err)
            else resolve("Created")
        })
    })
}

module.exports = {getUser, getAllUsers, saveAll}