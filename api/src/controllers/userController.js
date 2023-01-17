const UserModel = require('../models/user');

const createNewUser = async (user) => {
  const newUser = new UserModel(user)
  await newUser.save()
  return newUser
}

const findUser = async (userData) => {
    const userInDB = await UserModel.findOne({email: userData})
    return userInDB
 
}

const findAllUsers = async (filter) => {
    const allUsers = await UserModel.find(filter)
    return allUsers
 
}

const updateUser = async(userData) => {
   const user = {email: userData.email}
   const updatedUser = await UserModel.updateOne(user, userData)
   return updatedUser
}

module.exports = {
  createNewUser,
  findUser,
  findAllUsers,
  updateUser
}