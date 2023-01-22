const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON /* , paginate */ } = require('./plugins');

const petSchema = mongoose.Schema(
  {
    state: {
      //['Adotpable','NotAdoptable', 'InAdoptionProcess' , 'Adopted', 'Lost', 'Found', ]
      type: String,
      default: 'Adoptable',
    },
    age: {
      type: String,
      // required: true,
      // enum: ['0 a 8 meses', '8 meses a 2 años', '2 años o más'],
    },
    name: {
      type: String,
      required: true,
      trim: true, //le saca el espacio al inicio y al final
      minlength: 1,
      maxlength: 30,
    },
    specie: {
      type: String,
      // required: true,
      enum: ['Perro', 'Gato', 'Otro'],
      default: 'Perro',
    },
    birthday: {
      type: Date,
    },
    description: {
      type: String,
      // required: true,
      maxlength: 400,
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    profilePic: {
      type: String,
      // required: true,
    },
    gallery: [
      {
        type: String,
        default: [],
      },
    ],
    owner: {
      type: String,
    },
    currentLocation: {
      type: String,
      default: 'Owner Home',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

// add plugin that converts mongoose to json
petSchema.plugin(toJSON);
//petSchema.plugin(paginate);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
