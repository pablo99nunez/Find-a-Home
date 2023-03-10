const mongoose = require('mongoose');
const validator = require('validator')
const { toJSON/* , paginate */ } = require('./plugins');
/*
{
  
  email: 'rod.toobe2@gmail.com',
  email_verified: true,
  
}


*/
const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['user', 'shelter', 'volunteer', 'admin'],
      default: 'user'
    },
    firstName: {
      type: String,
      required: true,
      
      minlength: 1,
      maxlength: 30
    },
    lastName: {
      type: String,
      required: true,
      
      minlength: 1,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    email_verified: {
      type: Boolean
    },
    phone: {
      type: String,
      required: true,
      /*  validate(value) { GENERA PROBLEMASSSSSSSSSSSSSSSSSSSSSSSS
         if (!validator.isMobilePhone(value)) {
           throw new Error('Invalid phone number');
         }
       }, */
    },
    profilePic: {
      type: String,
      defult: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      validate(value) {
        if (!value.match(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)) {
          throw new Error('image must be correct and complete url direction');
        }
      },
    },
    profile: {
      type: Object,
    },
    lastModifiedDate: {
      type: Date
    },
    rating: {
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
      },
      acumulator: {
        type: Number,
        min: 0,
        default: 0
      },
      totalpoints: {
        type: Number,
        min: 0,
        default: 0
      }
    },
    reviews: {
      type: Array,
      default: []
    },
    description: {
      type: String,
      maxlength: 400
    },
    gallery: [{
      type: String
    }],
    pets: {
      type: Array, //ids de mascotas
      default: [] //no borrar
    },
    pushToken: {
      type: Array, // Token de verificacion para notificaciones push
      default: []
    },
    Notifications: {
      type: Array, // Array de notificaciones que llegan al usuario
      default: []
    },
    address: {
      type: String,
      default: "Sin direccion especificada"
    },
    conditions: {
      type: Object,
      default: {}
    },
    misSolicitudes: {
      type: Array,
      default: [] //no borrar
    },
    coordinates: {
      latitude: {
        type: Number,
        default: -34.3000,  //no borrar
      },
      longitude: {
        type: Number,
        default: -59.0000,  //no borrar
      }
    },
    infracciones: {
      type: Array,
    },
    tipo: {
      type: String,
      // enum: ["User, Admin"],
    },
    donaciones: {
      type: Array,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }
);
//userSchema.index({Location: '2dsphere' });

userSchema.plugin(toJSON);
//userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
