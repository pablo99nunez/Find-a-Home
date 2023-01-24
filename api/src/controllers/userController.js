const UserModel = require('../models/user.model');

const createNewUser = async (user) => {
  const userExists = await UserModel.findOne({ email: user.email })
  //if(!!userExists) throw new Error("El usuario ya existe")
  //si existe lo modifica XXDXDXD harcodeado para debugear
  if (!!userExists) {
    userExists = { ...userExists, ...user }
    await userExists.save()
    return userExists
  }
  else {
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser
  }


}

const findUser = async (userEmail) => {
  const userInDB = await UserModel.findOne({ email: userEmail })
  return userInDB

}

const findAllUsers = async (filter) => {
  const allUsers = await UserModel.find(filter)
  return allUsers

}

const updateUser = async (newUserData, userEmail) => {
  const queryConditions = { email: userEmail }
  const updatedUser = await UserModel.updateOne(queryConditions, newUserData)
  return updatedUser
}

module.exports = {
  createNewUser,
  findUser,
  findAllUsers,
  updateUser
}