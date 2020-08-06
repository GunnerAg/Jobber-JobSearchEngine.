const { Schema, model } = require('mongoose');

const employerSchema = new Schema({
    /*Define schema here */
    companyName: {
      type: String, 
      required: true
    },  
    location: {
      type: String,
      required: true, 
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
    },
  },
  {
    timestamps: true
  }
);

let employerModel = model('Employer', employerSchema);
 module.exports = employerModel