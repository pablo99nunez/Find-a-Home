const PetModel = require('../models/pet.model');

//filtra por especie
const filtroSpecie = async (specieMascota) => {
  const allPets = await PetModel.find({ specie: { $eq: specieMascota } });
  return allPets;
};

//filtra por tamaño
const filtroSize = async (sizeMascota) => {
  const allPets = await PetModel.find({ size: { $eq: sizeMascota } });
  return allPets;
};

const combinedFilters = async (specieMascota, sizeMascota) => {
  const filteredPets = await PetModel.find({specie: {$eq: specieMascota}, size: {$eq: sizeMascota}})
  return filteredPets
}
//filtra por edad
const filtroAge = async (AgeMascota) => {
  const allPets = await PetModel.find({ age: { $eq: AgeMascota } });
  return allPets;
};

//   await PetModel.find({ specie: { $eq: 'gato' } });

module.exports = {
  filtroSpecie,
  filtroSize,
  filtroAge,
  combinedFilters
};
