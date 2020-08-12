const mongoose = require('mongoose');

let offerSchema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true, 
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true, 
  },
  status: {
    enum: ['PENDING', 'REJECTED', 'ACCEPTED'],
    type: String, 
    required: true
  },
  offerMessage:{
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Offer', offerSchema);
