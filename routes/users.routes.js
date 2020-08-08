const express = require('express');
const employeeModel = require('../models/employee.Model');
const employerModel = require('../models/employer.Model');
const router  = express.Router();

//-----------------------------EDIT EMPLOYEE PROFILE-----------------------//

router.get('/employeeProfile/edit', (req, res, next) => {
  employeeModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployeeProfile',{loggedInUser})
  })
  })
 


router.post('/employeeProfile/edit', (req, res, next) =>{
  let {nameEmployee, secondnameEmployee, biography, age, emailEmployee, adressEmployee, keywords} = req.body
  console.log(req.session.loggedInUser)
  employeeModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{nameEmployee, secondnameEmployee, biography, age, emailEmployee, adressEmployee, keywords}})
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
//----------------EDIT EMPLOYER PROFILE-----------------------//


router.get('/employerProfile/edit', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployerProfile',{loggedInUser})
  })
  })

 
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

//--------------------------------Job Offers------------------------------------//

router.get('/employerProfile/search', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/recruit',{loggedInUser})
  })
  })


//----------------------JOB PROPOSITIONS-------------------//

router.get('employerProfile/propositions', (req, res, next) => {
  employerModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/employerPropositions',{loggedInUser})
  })
})



//----------------------ADD NEW KEYWORDS--------------------------------//


router.post('/employeeProfile', (req, res, next) =>{
  let {keywords} = req.body
  console.log(keywords)
  employeeModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{ keywords}})
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

//-------------------------------SEARCH BY KEYWORDS-------------------------------//

  router.post('/recruit', (req, res, next) => {
    let {keywords} = req.body
    console.log(req.body)

    employeeModel.find({'keywords': { $in: keywords }})
    .then((employeeData)=>{
      res.render('users/recruitResults', {employeeData})
    })
    })


    //-------------------------------OFFER-------------------------------//

    router.get('/offer', (req, res, next) => {
      res.render('users/offer')
    })


    module.exports = router;