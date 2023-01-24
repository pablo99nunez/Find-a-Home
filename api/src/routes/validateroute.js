const idRegex = /^[0-9a-fA-F]{24}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;


validateroute = {
    "/user/confirm": (petID, ownEmail, newOwnerEmail) => {
        //si uno de estos test falla, se vuelve true y pasa atravez de un or y tira error
        if (!emailRegex.test(ownEmail))
            throw new Error("Tu email está mal escrito")
        if (!emailRegex.test(newOwnerEmail))
            throw new Error("El email del nuevo dueño está mal escrito")
        if (!idRegex.test(petID))
            throw new Error("petID está mal escrito")

    },

}

module.exports = validateroute