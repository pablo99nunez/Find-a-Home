const UserModel = require('../models/user');

const createNewUser = async (userData) => {
try {
  const newUser = await UserModel.create(userData, function(err,user){
    if(err){throw new Error('We could not add the user to our data base')}
    else return newUser
  })
} catch (error) {
  return error
}
}

const findUser = async (userData) => {
  try {
    const userInDB = await UserModel.findOne(userData)
    if (userInDB) {return userInDB}
    else return false
  } catch (error) {
    return error
  }
}

const findAllUsers = async (filter = {}) => {
  try {
    const allUsers = await UserModel.find(filter)
    if (allUsers) allUsers;
    else return false
  } catch (error) {
    return error
  }
}

const updateUser = async(userData) => {
  try {
   const user = {email: userData.email}
   const updatedUser = await UserModel.updateOne(user, userData)
   return updatedUser
  } catch (error) {
    return error
  }
}

module.exports = {
  createNewUser,
  findUser,
  findAllUsers,
  updateUser
}