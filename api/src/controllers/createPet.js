const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
//*const { default: mongoose } = require('mongoose');

//aca inicia la mascota
const createPet = async (PetData, ownerEmail) => {
        const dueño = await UserModel.findOne({ email: ownerEmail })
        if (!dueño) throw new Error('Tu usuario no existe en la database')
        //le agrega 3 propiedades al bojeto:
        PetData.owner = dueño.email // dueño creador
        PetData.ownerHistory = [dueño.email] //historia de dueños inicia!
        PetData.currentLocation = dueño.adress
        //
        const newPet = await PetModel.create(PetData) //lo crea
       await dueño.pets.push(newPet._id) //se lo da al nuevo owner
        await dueño.save() //actualiza al usuario en la DB
        return newPet
}

module.exports = {
    createPet
}





