const UserModel = require('../models/user');

const createNewUser = async (dataToken) => {
try {
  const userData ={
    name: 'Name',
    lastName: "Last Name",
    email: dataToken.email,
    email_verified: dataToken.email_verified,
    picture: dataToken.picture
  }
  const newUser = await UserModel.create(userData, function(err,user){
    if(err){throw new Error('We could not add the user to our data base')}
    else return newUser
  })
} catch (error) {
  return error
}
}

const findUser = async (dataToken) => {
  try {
    const userInDB = await UserModel.findOne({email: dataToken.email})
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

