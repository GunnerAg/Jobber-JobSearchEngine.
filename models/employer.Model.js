const { Schema, model } = require('mongoose');

const employerSchema = new Schema({
    /*Define schema here */
    nameEmployer: {
      type: String, 
      required: true
    },  
    location: {
      type: String,
    
    },
    adress: {
      type: String, 
      
    },
    emailEmployer: {
      type: String,
      required: true,
      unique: true, 
    },
    info:{
      type:String,
    },
    passwordHashEmployer: {
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