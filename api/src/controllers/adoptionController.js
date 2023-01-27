const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const { findAllPets } = require('./petController');
//*const { default: mongoose } = require('mongoose');
const updatePet = async (PetData, petID, ownerEmail) => {
    const queryCondition = { _id: petID, owner: ownerEmail }
    const updatedPet = await PetModel.updateOne(queryCondition, PetData)
    return updatedPet
}


//boton donde el dueño confirma que el perro ya se adoptó
const confirmAdoption = async (petID, ownerEmail, newOwnerEmail) => {
    //Lo comentado con * requiere setear otra database de replica 
    //*const session = await mongoose.startSession();
    //*session.startTransaction();
    try {
        //VALIDACIONES
        const pet = await PetModel.findOne({ _id: petID })//*.session(session)
        if (!pet) throw new Error('La mascota no existe')
        //revisa si es el dueño todavía:
        if (pet.owner !== ownerEmail) throw new Error('Tu no eres el dueño de esa mascota, el dueño es:' + pet.owner)
        //revisa que exista el destinatario
        const target = await UserModel.findOne({ email: newOwnerEmail })//*.session(session)
        if (!target) throw new Error('El email del destinatario no encuentra en la base de datos')
        if (target.pets.includes(petID)) throw new Error('La mascota ya es propiedad del destinatario');

        const owner = await UserModel.findOne({ email: ownerEmail })//*.session(session)
        
        if (!owner.pets.includes(petID)) throw new Error('La mascota no es tuya! hijo de puta!');
        //CONTROLLER:
        //Rechazados
        //Cambia estado a Rechazado de todas aquellas personas que hayan querido adoptar
        // await refreshStates(pet, newOwnerEmail)
        //Adoptando
        pet.state = "Adopted" //Cambias el estado de la mascota a adoptado
        pet.owner = target.email //el pet tiene nuevo owner
        pet.ownerHistory.push(newOwnerEmail) //el pet tiene nueva historia de dueño
        pet.currentLocation = target.address //Le das una nueva dirección


         pet.solicitudes = pet.solicitudes.map((apply) => apply.email === newOwnerEmail ?
         {...apply, status: 'Aceptado'} :
          {...apply,status: 'Rechazado'})


        owner.pets.splice(owner.pets.indexOf(petID), 1) //se lo quita al owner
        target.pets.push(petID) //se lo da al nuevo owner
        // target.misSolicitudes = target.misSolicitudes.map((apply) => apply.petID == petID ? apply.pet = 'Aceptado' : null) //REMPLAZED BY refreshStates FUNCTION :)
        await pet.save()
        await owner.save()
        await target.save()
        //*await session.commitTransaction();
        return pet

    } catch (error) {
        //*await session.abortTransaction();
        throw error;
    } finally {
        //*session.endSession();
    }
}

const refreshStates = async ({petID, newOwnerEmail}) => {
    try{
        await UserModel.updateOne(
            { "misSolicitudes.petID": petID, "misSolicitudes.email": newOwnerEmail },
            { $set: { "misSolicitudes.$.status": "Aceptado" } },
        )
            
        await UserModel.updateMany(
            { "misSolicitudes.petID": petID, "misSolicitudes.email": {$ne: newOwnerEmail} },
            { $set: { "misSolicitudes.$.status": "Rechazado" } }
        )
        }
     catch (error) {
        throw(error)
    }
}


const solicitarAdopcion = async (petID, message, interestedEmail, deleteSolicitud) => {
    try {
        
        if (deleteSolicitud === undefined) deleteSolicitud = false
        //VALIDACIONES
        //Busca si el PET existe y lo guarda en una variable
        const pet = await PetModel.findOne({ _id: petID })
        if (!pet) throw new Error('La mascota no existe')

        //Revisa si la solicitud ya existe, si ya existe la modifica, sino, la crea
        const indexDeSolicitud = pet.solicitudes.findIndex(soli => soli.email === interestedEmail)

        //busca al interesado y al dueño:
        const interestedUser = await UserModel.findOne({ email: interestedEmail })
        if (!interestedUser) throw new Error('Tu usuario no existe en la database, ¿Estás registrado?')

        //Revisa si la solicitud ya existe dentro del usuario
        const indexDeSolicitudUser = interestedUser.misSolicitudes.findIndex(el => el.petID === petID)


        //si esta modo borrar, la borra, primero checkea si existe
        if (deleteSolicitud === true) {
            //validaciones
            if (indexDeSolicitud === -1)
                throw new Error('No se encontró tu solicitud')
            if (indexDeSolicitudUser === -1)
                throw new Error(`No se encontró tu solicitud en tu lista,
                 pero si se encontró en el perro, contacte a un administrador porfavor`)
            //controllers
            interestedUser.misSolicitudes.splice(indexDeSolicitudUser, 1);//borra solicitud del usuario 
            pet.solicitudes.splice(indexDeSolicitud, 1); //borra solicitud del pet
            await pet.save()
            await interestedUser.save()

            return pet //******** VER Q RETORNAR */
        }

        //si ya existe la solicitud, simplemente la edita:
        if (indexDeSolicitud !== -1) {
            //objeto de {'interestedEmail','name', 'LastName', 'requestMessage', 'profilePic'}
            pet.solicitudes[indexDeSolicitud] = {
                status: "Pendiente",
                email: interestedUser.email,
                firstName: interestedUser.firstName,
                lastName: interestedUser.lastName,
                message: message,
                profilePic: interestedUser.profilePic,
                phone: interestedUser.phone
            }

            interestedUser.misSolicitudes[indexDeSolicitudUser] = {
                status: "Pendiente",
                petID: petID,
                message: message,
                owner: pet.owner,
                email: interestedUser.email
            }
            await pet.save()
            await interestedUser.save()
            return pet //******** VER Q RETORNAR */
        } else {
            //si no existe, crea una nueva
            pet.solicitudes.push({
                status: "Pendiente",
                email: interestedUser.email,
                firstName: interestedUser.firstName,
                lastName: interestedUser.lastName,
                message: message,
                profilePic: interestedUser.profilePic,
                phone: interestedUser.phone
            })
            interestedUser.misSolicitudes.push({
                status: "Pendiente",
                petID: petID,
                message: message,
                owner: pet.owner,
                email: interestedUser.email
            })
            await pet.save()
            await interestedUser.save()
            return pet //******** VER Q RETORNAR */

        }
        return 'Esta linea no deberia ser accedible, el que programó el backend debe revisar bien lo que hizo, archivo adoptionController.js'
    } catch (error) {

        throw error;
    }
}

module.exports = {
    confirmAdoption,
    refreshStates,
    solicitarAdopcion,
}





