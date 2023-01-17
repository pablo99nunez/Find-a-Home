const mongoose = require('mongoose');
const validator = require('validator')
const { toJSON/* , paginate */ } = require('./plugins');


const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specie: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    lastModifiedDate:{
      type: Date
    },
    inscriptionDate:{
      type: Date
    },
    description:{
      type: String,
      required: true,
    },
    gallery:[{
      type: String
    }],
    profilePic:{
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
    },
    state: {
      //['Adotpable','NotAdoptable', 'InAdoptionProcess' , 'Adopted', 'Lost', 'Found', ]
      type: String
    },
    owner: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
petSchema.plugin(toJSON);
//petSchema.plugin(paginate);



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
