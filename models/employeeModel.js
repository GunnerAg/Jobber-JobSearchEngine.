const { Schema, model } = require('mongoose');

const employerSchema = new Schema({
    /*Define schema here */
    name: {
      type: String, 
      required: true
    },
    secondname: {
      type: String, 
      required: true
    },
    age: {
      type: Number, 
      required: true
    },
    adress: {
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    passwordHash: {
      type: String, 
      required: true
    }
  },
  {
    timestamps: true
  }
);

 module.exports = model('Employee', employerSchema);