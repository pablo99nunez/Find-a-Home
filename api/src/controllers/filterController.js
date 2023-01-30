const PetModel = require('../models/pet.model');

//filtra por especie
const filtroSpecie = async (specieMascota) => {
  const allPets = await PetModel.find({ specie: { $eq: specieMascota }, state: 'Adoptable' });
  return allPets;
};

//filtra por tamaño
const filtroSize = async (sizeMascota) => {
  const allPets = await PetModel.find({ size: { $eq: sizeMascota }, state: 'Adoptable' });
  return allPets;
};

const combinedFilters = async (specieMascota, sizeMascota) => {
  const filteredPets = await PetModel.find({specie: {$eq: specieMascota}, size: {$eq: sizeMascota}, state: 'Adoptable' })
  return filteredPets
}
//filtra por edad
const filtroAge = async (AgeMascota) => {
  const allPets = await PetModel.find({ age: { $eq: AgeMascota }, state: 'Adoptable' });
  return allPets;
};


function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return Math.round(d);
}



//Desde el front enviamos radio 
// latitnud del usuariio y longitud
/* coordinates: {latitude: ,longitude: }  */
const getPetsByZone = async (radioPorParams, userLat, userLong) => {
  const allPets = await PetModel.find({state: 'Adoptable'});
  const filteredPets = allPets.filter((PET)=>{
    return distance(userLat,userLong, coordinates.latitude, coordinates.longitude) <= radioPorParams
  })
  return filteredPets;
};

//   await PetModel.find({ specie: { $eq: 'gato' } });

function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return Math.round(d);
}
//Desde el front enviamos radio 
// latitnud del usuariio y longitud
/* coordinates: {latitude: ,longitude: }  */
const getPetsByZone = async (radioPorParams, userLat, userLong) => {
  const allPets = await PetModel.find({state: 'Adoptable'});
  const filteredPets = allPets.filter((PET)=>{
    return distance(userLat,userLong, PET.coordinates.latitude, PET.coordinates.longitude) <= radioPorParams
  })
  return filteredPets;
};

//   await PetModel.find({ specie: { $eq: 'gato' } });
module.exports = {
  filtroSpecie,
  filtroSize,
  filtroAge,
  combinedFilters,
  getPetsByZone
};
