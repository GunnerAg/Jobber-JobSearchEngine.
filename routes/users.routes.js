const express = require('express');
const employeeModel = require('../models/employee.Model');
const employerModel = require('../models/employer.Model');
const router  = express.Router();

router.get('/employeeProfile/edit', (req, res, next) => {
  employeeModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployeeProfile',{loggedInUser})
  })
  })
  //--------------------------------//


router.post('/employeeProfile/edit', (req, res, next) =>{
  let {nameEmployee, secondnameEmployee, biography, age, emailEmployee, adressEmployee} = req.body
  console.log(req.session.loggedInUser)
  employeeModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{nameEmployee, secondnameEmployee, biography, age, emailEmployee, adressEmployee}})
    .then(()=>{
      employeeModel.findById(req.session.loggedInUser._id)
        .then((loggedInUser) => {
          console.log(loggedInUser)
          req.session.loggedInUser=loggedInUser
          res.redirect('/employeeProfile')
        })
    })
    .catch((err)=>{
        console.log('err', err)
    })
})
//---------------------------------------//


router.get('/employerProfile/edit', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployerProfile',{loggedInUser})
  })
  })

  //--------------------------------//
router.post('/employerProfile/edit', (req, res, next) =>{
  let {nameEmployer, location, info, emailEmployer, adress} = req.body
  console.log(req.session.loggedInUser)
  employerModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{nameEmployer, location, info, emailEmployer, adress}})
    .then(()=>{
      employerModel.findById(req.session.loggedInUser._id)
        .then((loggedInUser) => {
          console.log(loggedInUser)
          req.session.loggedInUser=loggedInUser
          res.redirect('/employerProfile')
        })
    })
    .catch((err)=>{
        console.log('err', err)
    })
})





module.exports = router;

