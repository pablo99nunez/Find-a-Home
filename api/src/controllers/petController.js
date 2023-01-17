const PetModel = require('../models/pet');

const createNewPet = async (PetData) => {
try {
  const newPet = await PetModel.create(PetData)
  return newPet
} catch (error) {
  return error
}
}

const findPet = async (petID) => {
  try {
    const PetInDB = await PetModel.findOne({_id: petID})
   return PetInDB
  } catch (error) {
    return error
  }
}

const findAllPets = async (filter = {}) => {
  try {
    const allPets = await PetModel.find(filter)
    return allPets
  } catch (error) {
    return error
  }
}

const updatePet = async(PetData, petID) => {
  try {
   const queryCondition = {_id: petID}
   const updatedPet = await PetModel.updateOne(queryCondition, PetData)
   return updatedPet
  } catch (error) {
    return error
  }
}
const deletePet = async(petID) => {
  try {
   const queryCondition = {_id: petID}
   const deletedPet = await PetModel.deleteOne(queryCondition)
   return deletedPet
  } catch (error) {
    return error
  }
}

module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet,
  deletePet,
}