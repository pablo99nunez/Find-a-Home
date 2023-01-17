const PetModel = require('../models/pet');

const createNewPet = async (PetData) => {
  const newPet = await PetModel.create(PetData)
  return newPet
}


const findPet = async (petID) => {
  const PetInDB = await PetModel.findOne({_id: petID})
  return PetInDB
}

const findAllPets = async (filter) => {
  const allPets = await PetModel.find(filter)
  return allPets
}

const updatePet = async(PetData, petID) => {
   const queryCondition = {_id: petID}
   const updatedPet = await PetModel.updateOne(queryCondition, PetData)
   return updatedPet
}
const deletePet = async(petID) => {
   const queryCondition = {_id: petID}
   const deletedPet = await PetModel.deleteOne(queryCondition)
   return deletedPet
}

module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet,
  deletePet,
}
