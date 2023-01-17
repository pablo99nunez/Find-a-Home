const PetModel = require('../models/pet');

const createNewPet = async (PetData) => {
  const newPet = new PetModel(PetData)
  await newPet.save()
  return newPet
 }

const findPet = async (petID) => {
  const PetInDB = await PetModel.findOne({_id: petID})
  return petInDB
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

module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet
}
