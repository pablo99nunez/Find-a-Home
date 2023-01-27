const UserModel = require('../models/user.model');

const ratingUpdate = async (rating, newOwnerEmail) => {
    const user = await UserModel.findOne({email: newOwnerEmail})
    let totalpoint = user.rating.totalpoints + parseInt(rating) 
    let divisor = user.rating.acumulator + 1 
    let newrating = totalpoint / divisor
    user.rating.totalpoints = totalpoint
    user.rating.rating = Math.round(newrating)
    user.rating.acumulator = divisor
    await user.save()
    return user
}

module.exports = {
    ratingUpdate
}