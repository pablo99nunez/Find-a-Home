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
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      required: true,
    },
    gallery: [{
      type: String,
      default: []
    }],
    owner: {
      type: String
    },
    state: {
      //['Adotpable','NotAdoptable', 'InAdoptionProcess' , 'Adopted', 'Lost', 'Found', ]
      type: String,
      default: 'Adoptable'
      
    },
    currentLocation: {
      type: String,
      default: 'Owner Home'
    },
    
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }
);

// add plugin that converts mongoose to json
petSchema.plugin(toJSON);
//petSchema.plugin(paginate);



const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
