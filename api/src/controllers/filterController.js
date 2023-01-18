const PetModel = require('../models/pet');

//filtra por especie
const filtroSpecie = async (specieMascota) => {
    const allPets = await PetModel.find({ specie: { $eq: specieMascota } });
    return allPets
  }

  //filtra por tamaño
const filtroSize = async (sizeMascota) => {
    console.log(sizeMascota);
    const allPets = await PetModel.find({ size: { $eq: sizeMascota } });
    return allPets
  }

 //filtra por edad
  const filtroAge = async (AgeMascota) => {
    console.log(AgeMascota);
    const allPets = await PetModel.find({ age: { $eq: AgeMascota } });
    return allPets
  }

  //   await PetModel.find({ specie: { $eq: 'gato' } });

  module.exports = {
    filtroSpecie, filtroSize, filtroAge
  }
