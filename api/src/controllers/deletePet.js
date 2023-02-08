/*
Idealmente seria hacer una pila de peticiones para cada perro, para así evitar un poco algunos problemas
con respecto al tema de funciones asyncronas accediento al mismo tiempo a la database con peticiones que puedan 
llegar a conflictos.

ESTRATEGIA deletePet

Deleting pet algorithm is expensive but necessary:
1) Buscar PET
2) Del PET: Obtener lista de usuarios que enviaron solicitudes
3) De cada USER: Borrar solicitud
4) Buscar OWNER
5) Del OWNER: Quitar el perro de su lista
6) actualizar todos
*/
const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const async = require('async');

const solicitudesPersonalizadas = async (email) => {
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error('user no existe');

  let arrayAretornar = [];
  for (const solicitud of user.misSolicitudes) {
    const obj = {};
    const pet = await PetModel.findOne({ _id: solicitud.petID });
    const owner = await UserModel.findOne({ email: solicitud.owner });
    obj.ownerFullname = owner.firstName + ' ' + owner.lastName;
    obj.petName = pet.name;
    obj.profilePic = pet.profilePic;
    obj.message = solicitud.message;
    obj.state = solicitud.state
    arrayAretornar.push(obj);
  }

  return arrayAretornar;
};

const deletePet = async (petID) => {
  //-----1)
  const pet = await PetModel.findOne({ _id: petID });
  if (!pet) throw new Error('La mascota no existe')
  //-----2)     solicitudes: {'interestedEmail','FullName', 'requestMessage', 'profilePic'}

  async.each(
    pet.solicitudes,
    async (solicitud) => {
      const interestedUser = await UserModel.findOne({ email: solicitud.email });//Busca usuario
       if (!!interestedUser) {
        //target existe
        const indexDeSolicitudUser = interestedUser.misSolicitudes.findIndex(
          (el) => el.petID === petID
        ); //Busca index de solicitud
        if (indexDeSolicitudUser !== -1) {
          //solicitud del target existe
          interestedUser.misSolicitudes.splice(indexDeSolicitudUser, 1); //borra solicitud del usuario
          await interestedUser.save();
        }
      }
    },
    (err) => {
      if (err) {
        console.error(
          'Error al eliminar la solicitu a un usuario: ' + err.message
        );
      }
    }
  );
  //-----3)  buscar OWNER
  const theDuenioDelPet = await UserModel.findOne({ email: pet.owner });
  //-----4) Del OWNER: Quitar el perro de su lista
  if (theDuenioDelPet) {
    theDuenioDelPet.pets = theDuenioDelPet.pets.filter((el) => el !== petID);
    await theDuenioDelPet.save();
  }
  //-----5) Borrar perro
  const deletedPet = await PetModel.deleteOne({ _id: petID });
  return deletedPet;
};

/*
 * Entra email y limpia los pets q no existen en la base de datos
 *
 * */
const cleanUserInexistentPets = async (email) => {
  //-----1) Busca usuario
  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error('El usuario con email ' + email + ' no existe');
  //-----2)obtiene lista de PETs y escanea por si no existe alguno, si no existe lo agrega a la lista para eliminar
  let arrayPetIDs = [];
  async.each(
    user.pets,
    async (petID) => {
      const petExist = await PetModel.findOne({ _id: petID }); //Busca usuario
      if (!petExist) {
        //target existe
        arrayPetIDs.push(petID);
      }
    },
    (err) => {
      if (err) {
        console.error(
          'Error al eliminar la solicitu a un usuario: ' + err.message
        );
      }
    }
  );
  //filtra el pets del usuario por pets inexistentes dentro del arrayPetIDs
  //FALTA LIMPIAR LISTA DE misSolicitudes
  user.pets = user.pets.filter((item) => {
    !arrayPetIDs.includes(item);
  });
  //-----4) Guarda el usuario
  await user.save();
  return user;
};
module.exports = {
  deletePet,
  cleanUserInexistentPets,
  solicitudesPersonalizadas,
};
