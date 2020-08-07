const express = require('express');
const employeeModel = require('../models/employee.Model');
const router  = express.Router();

router.get('/employeeProfile/edit', (req, res, next) => {
  employeeModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployeeProfile',{loggedInUser})
  })
  })





module.exports = router;

