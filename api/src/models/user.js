const mongoose = require('mongoose');
const validator = require('validator')
const { toJSON/* , paginate */ } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum : ['user','shelter','volunteer','admin'],
      required: true,
      default: 'user'
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30     
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30    
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
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error('Invalid phone number');
        }
      },
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
    rating:{
      type: Number,
      min: 0,
      max: 5
    },
    reviewsQty:{
      type: Number
    },
    description:{
      type: String,
      maxlength: 400
    },
    gallery:[{
      type: String
    }],
    address: {
      type: String,
      minlength: 2,
      maxlength: 100
    },
    pets: {
      type: Array, //ids de mascotas
    },
  
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }
);

userSchema.plugin(toJSON);
//userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
