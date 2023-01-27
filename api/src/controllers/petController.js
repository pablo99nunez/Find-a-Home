const PetModel = require('../models/pet.model');

function calculatePetAge(birthdate) {
  const birth = new Date(birthdate);
  const now = new Date();
  const diff = now - birth;
  const ageInMilliseconds = diff;
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInMinutes = ageInSeconds / 60;
  const ageInHours = ageInMinutes / 60;
  const ageInDays = ageInHours / 24;
  const ageInMonths = ageInDays / 30.44;
  const ageInYears = ageInMonths / 12;
  const years = Math.floor(ageInYears);
  const months = Math.floor(ageInMonths - (years * 12));
  return `${years} años ${months} meses`;
}


//TODO: validaciones
const createNewPet = async (PetData, ownerEmail) => {
  PetData.owner = ownerEmail
  PetData.ownerHistory = [ownerEmail]
  const newPet = await PetModel.create(PetData)
  newPet["_doc"].age = calculatePetAge(newPet.birthday)
  return newPet
}
const bulkCreatePets = async (PetData, ownerEmail) => {
  PetData.owner = ownerEmail
  PetData.ownerHistory = [ownerEmail]
  const newPet = await PetModel.create(PetData)
  return newPet
}



const findPet = async (petID) => {
  const PetInDB = await PetModel.findById(petID)
  if(!!!!!PetInDB) throw new Error('No se encontro el pet')
  PetInDB._doc.age = calculatePetAge(PetInDB.birthday)
  return PetInDB
}

//los voluntarios van a poder ver las mascotas Adoptados
const findAllAdoptedPets = async () => {
  //obtiene perros
  const allPets = await PetModel.find({state: 'Adopted'}).sort([['created_at', 1]])

  //calcula la edad actual del perro y se la mete a cada uno:
  if(!!!allPets) throw new Error('No se encontro el pet')
  petsToReturn = allPets.map(perro=>{
    perro["_doc"].age = calculatePetAge(perro.birthday)
    return perro
  })

  return petsToReturn
}

//el más antiguo aparece primero
const findAllPets = async () => {
  
  //obtiene perros
  const allPets = await PetModel.find({state: 'Adoptable'}).sort([['created_at', 1]])

  //calcula la edad actual del perro y se la mete a cada uno:
  if(!!!allPets) throw new Error('No se encontro el pet')
  petsToReturn = allPets.map(perro=>{
    perro["_doc"].age = calculatePetAge(perro.birthday)
    return perro
  })

  return petsToReturn
}

const updatePet = async (PetData, petID, ownerEmail) => {
  const queryCondition = { _id: petID, owner: ownerEmail }
  const updatedPet = await PetModel.updateOne(queryCondition, PetData)
  return updatedPet
}

const deletePet = async (petID, ownerEmail) => {
  const queryCondition = { _id: petID, owner: ownerEmail }
  const deletedPet = await PetModel.deleteOne(queryCondition)
  return deletedPet
};

const filterByOwner = async(email)=>{
  const filter = {owner: email}
  const ownerPets = await PetModel.find(filter)
  return ownerPets
}


module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet,
  deletePet,
  filterByOwner,
}
