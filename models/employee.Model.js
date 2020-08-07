const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    /*Define schema here */
    nameEmployee: {
      type: String, 
      required: true
    },
    secondnameEmployee: {
      type: String, 
      required: true
    },
    age: {
      type: Number, 
      required: true
    },
    adressEmployee: {
      type: String,
    },
    emailEmployee: {
      type: String,
      required: true,
      unique: true, 
    },
    passwordHashEmployee: {
      type: String, 
      required: true
    },
    biography:{
      type:String,
    },
    keywords:[{
      type:String,
      enum:['','','','']
    }]
  },
  {
    timestamps: true
  }
);
let employeeModel = model('Employee', employeeSchema);
 module.exports = employeeModel