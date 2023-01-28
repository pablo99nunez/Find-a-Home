const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON /* , paginate */ } = require('./plugins');

const petSchema = mongoose.Schema(
  {
    state: {
      //['Adotpable','NotAdoptable', 'InAdoptionProcess' , 'Adopted', 'Lost', 'Found', ]
      type: String,
      enum: ['Adoptable','NotAdoptable', 'InAdoptionProcess' , 'Adopted', 'Lost', 'Found'],
      default: 'Adoptable',
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
      maxlength: 400,
      default: 'Sin descripcion.',
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium',
    },
    profilePic: {
      type: String,
      default: 'https://www.shutterstock.com/image-photo/manipulated-image-very-long-dachshund-260nw-38764216.jpg',
    },
    gallery: [
      {
        type: String,
        default: [],
      },
    ],
    //dueño = owener
    owner: { //ower: 'cacaa@gmail.com'
      type: String,
    },
    ownerHistory: { //['cacaa@gmail.com', 'pepee@gmail.com']
      type: Array,
    },
    currentLocation: {
      type: Array,
      default: ['Provincia', 'Localidad'],
    },
    solicitudes: { //objeto de {'interestedEmail','FullName', 'requestMessage', 'profilePic'} 
      type: Array,
      default: []
    },
    coordinates: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `creoloated_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

// le saca el _ a algunas cosas
petSchema.plugin(toJSON);
//petSchema.plugin(paginate);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
