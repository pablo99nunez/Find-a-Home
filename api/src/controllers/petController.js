const PetModel = require('../models/pet');

const createNewPet = async (PetData) => {
try {
  const newPet = await PetModel.create(PetData, function(err,Pet){
    if(err){throw new Error('We could not add the Pet to our data base')}
    else return newPet
  })
} catch (error) {
  return error
}
}

const findPet = async (petID) => {
  try {
    const PetInDB = await PetModel.findOne({_id: petID})
    if (PetInDB) {return PetInDB}
    else return false
  } catch (error) {
    return error
  }
}

const findAllPets = async (filter = {}) => {
  try {
    const allPets = await PetModel.find(filter)
    if (allPets) allPets;
    else return false
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

module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet
}