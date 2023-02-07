const PetModel = require('../models/pet.model');
const UserModel = require('../models/user.model');
const { findUserName } = require('../controllers/userController');

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
  const months = Math.floor(ageInMonths - years * 12);
  return `${years} años ${months} meses`;
}

//TODO: validaciones
const createNewPet = async (PetData, ownerEmail) => {
  PetData.owner = ownerEmail;
  PetData.ownerHistory = [ownerEmail];
  const newPet = await PetModel.create(PetData);
  newPet['_doc'].age = calculatePetAge(newPet.birthday);
  return newPet;
};
const bulkCreatePets = async (PetData, ownerEmail) => {
  PetData.owner = ownerEmail;
  PetData.ownerHistory = [ownerEmail];
  const newPet = await PetModel.create(PetData);
  return newPet;
};

const findPet = async (petID) => {
  const PetInDB = await PetModel.findById(petID);
  if (!!!!!PetInDB) throw new Error('No se encontro el pet');
  PetInDB._doc.age = calculatePetAge(PetInDB.birthday);
  return PetInDB;
};

//los voluntarios van a poder ver las mascotas Adoptados
const findAllAdoptedPets = async () => {
  //obtiene perros
  const allPets = await PetModel.find({ state: 'Adopted' }).sort([
    ['created_at', 1],
  ]);

  //calcula la edad actual del perro y se la mete a cada uno:
  if (!!!allPets) throw new Error('No se encontro el pet');
  petsToReturn = allPets.map((perro) => {
    perro['_doc'].age = calculatePetAge(perro.birthday);
    return perro;
  });

  return petsToReturn;
};

//el más antiguo aparece primero
const findAllPets = async () => {
  //obtiene perros
  const allPets = await PetModel.find({ state: 'Adoptable' }).sort([
    ['created_at', 1],
  ]);

  //calcula la edad actual de la mascota y se la mete a cada uno:
  if (!!!allPets) throw new Error('No se encontro el pet');
  petsToReturn = allPets.map((perro) => {
    perro['_doc'].age = calculatePetAge(perro.birthday);
    return perro;
  });

  return petsToReturn;
};
const findPetById = async (id) => {
  //obtiene mascota por id
  const petById = await PetModel.findOne({ _id: id });
  return petById;
};

const findPetByArray = async (arrayOfIds) => {
  try {
    const petArray = await PetModel.find({ _id: { $in: arrayOfIds } }); //busca el id del perro
    let solicitud = [];
    const userId = await UserModel.findOne({_id:petArray},)
    const petAndOwner = await Promise.all(
      petArray.map(async (el) => {
        solicitud.push(el.name);
        solicitud.push(await findUserName(el.owner));
        solicitud.push(await findUserName(el.email));
      })
    );

    return solicitud;
  } catch (error) {
    throw error;
  }
};

const updatePet = async (PetData, petID, ownerEmail) => {
  const queryCondition = { _id: petID, owner: ownerEmail };
  const updatedPet = await PetModel.updateOne(queryCondition, PetData);
  return updatedPet;
};

const filterByOwner = async (email) => {
  const filter = { owner: email };
  const ownerPets = await PetModel.find(filter);
  return ownerPets;
};

const denPet = async (denuncia, id) => {
  const pet = await PetModel.findOne({ _id: id });
  if (pet) {
    const { owner } = pet;
    // Actualiza el documento en PetModel
    const ingresar = await PetModel.updateOne(
      { _id: id },
      { $push: { reportes: denuncia } }
    );
    // Busca el documento en UserModel
    const user = await UserModel.findOne({ email: owner });
    if (user) {
      // Si se encuentra el documento, actualiza el campo infracciones
      const IngresarOwner = await UserModel.updateOne(
        { email: owner },
        { $push: { infracciones: denuncia } }
      );
    }
    return ingresar;
  }
};

module.exports = {
  createNewPet,
  findPet,
  findAllPets,
  updatePet,
  filterByOwner,
  denPet,
  findPetById,
  findPetByArray,
};
