const UserModel = require('../models/user.model');

const reviews = async (review, userEmail, ratedEmail) => {
    const user = await UserModel.findOne({email: ratedEmail})
    user.reviews = {...user.reviews, [userEmail]: review}
    await user.save()
    return user 
}

module.exports = {
    reviews
}