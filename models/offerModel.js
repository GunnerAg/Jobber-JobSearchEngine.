const mongoose = require('mongoose');

let offerSchema = new mongoose.Schema({

  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Employer',
    required: true, 
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true, 
  },
  status: {
<<<<<<< HEAD
    enum: ['pending', 'rejected', 'accepted'],
=======
    enum:['pending','rejected','accepted'],
>>>>>>> origin/Gunner-branch
    type: String, 
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Offer', offerSchema);