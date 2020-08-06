const mongoose = require('mongoose');

let offerSchema = new mongoose.Schema({

  companyName: {
    type:String,
    required: true,    
  }, 
  companyId: {
    type: Number,
    required: true, 
    unique:true
  },
  employeeName: {
    type: String, 
    required: true
  },
  employeeId: {
    type: Number,
    required: true,
    unique: true, 
  },
  //OPTION A:three posible states: ¿pending,rejected,accepted.?
  status: {
    type: String, 
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Offer', offerSchema);