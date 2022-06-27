const jFile = require('jsonfile')

const getUserPermissions = async (id) => {
    let users = await new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/permissions.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
    return users.permissions.find(user => user.id === id)
}

const getAll = async () => {
    let permissions = await new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/permissions.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
    return permissions.permissions
}

const saveAll = async (updatedPermissionsFile) => 
{
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/permissions.json",{ permissions: updatedPermissionsFile }, (err) => {
            if (err) reject(err)
            else resolve("Created")
        })
    })
}


module.exports = {getUserPermissions, getAll, saveAll}