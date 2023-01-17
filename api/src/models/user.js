const mongoose = require('mongoose');
const validator = require('validator')
const { toJSON/* , paginate */ } = require('./plugins');


function tel_argentino_valido ( tel ) {
  //eliminamos todo lo que no es dígito
  num = preg_replace( '/\D+/', '', tel);
  //devolver si coincidió con el regex
  return preg_match(
      '/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/D',
      num
  );
}

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone:{
      type: String,
      required: true,
      validate(value){
        if(!tel_argentino_valido(value)){
          throw new Error('Invalid phone')
        }
      }
    },
    profilePic: {
      type: String,
      validate(value) {
        if (!value.match(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)) {
          throw new Error('image must be correct and complete url direction');
        }
      },
    },
    profile: {
      type: Object,
    },
    lastModifiedDate:{
      type: Date
    },
    type:{
      type: String
    },
    valoration:{
      type: Number,
    },
    reviewsQty:{
      type: Number
    },
    description:{
      type: String
    },
    gallery:[{
      type: String
    }],
    address: {
      type: String,
    },
    pets: {
      type: Array, //ids de mascotas
    },
    shelters: { //ids de refugios
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
//userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
