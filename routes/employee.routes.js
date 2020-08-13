const express = require('express');
const router = express.Router();
const employeeModel = require('../models/employee.Model');
const employerModel = require('../models/employer.Model');
const offerModel = require('../models/offer.Model');
const data = require('../bin/data');

//------REQUIRING CLOUDINARY
const uploader = require('../config/cloudinary.config.js');


router.get('/employeeProfile', (req, res, next)=>{
  if (req.session.loggedInUser && req.session.loggedInUser.type === 'employee' ){
    next()
  }
  else {
    res.redirect('/loginEmployee')
  }
})

//-----------------------------EMPLOYEE LOGGED IN----------------------------------//
///-------GET------///
router.get('/employeeProfile', (req, res) => {
  employeeModel.findById(req.session.loggedInUser._id)
  .then((match) => {
      let newData = {}
      for (let key in data) {
        newData[key] = []
        data[key].forEach((lang) => {
          newData[key].push({
            name: lang,
            showLanguage: match.keywords.includes(lang)
          })
        })
      }
      res.render('users/employeeProfile.hbs', {loggedInUser: req.session.loggedInUser, data: newData})
  })
  
})




//-----------------------------EMPLOYEE EDIT PROFILE-------------------------------//
///-------GET------///
router.get('/employeeProfile/edit', (req, res, next) => {
  employeeModel.findById(req.session.loggedInUser._id)
  .then((loggedInUser)=>{
    res.render('users/editEmployeeProfile',{loggedInUser})
  })
  })
///-------POST------///
  router.post('/employeeProfile/edit',  uploader.single("imageUrl"), (req, res, next) =>{
    let myObj = {...req.body}
    if (req.file){
      myObj.imageEmployee = req.file.path
    }
    employeeModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set: myObj })
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



  //------------------------------delete profile-------------------//
  
  router.get('/employeeProfile/delete', (req, res, next) => {
    res.render('users/deleteEmployee')
  })

  router.post('/deleteEmployee', (req, res, next) =>{
    employeeModel.findByIdAndDelete(req.session.loggedInUser._id)
     .then(()=>{
       req.session.destroy();
       res.redirect('/')
     })
  })
 

//-----------------------------EMPLOYEE ADD KEYWORDS-------------------------------//
///-------POST------///
router.post('/employeeProfile', (req, res, next) =>{
  let {keywords} = req.body
  employeeModel.findByIdAndUpdate(req.session.loggedInUser._id, {$set:{ keywords}})
    .then(()=>{
      employeeModel.findById(req.session.loggedInUser._id)
        .then((loggedInUser) => {
          console.log(loggedInUser)
          req.session.loggedInUser=loggedInUser
          req.session.loggedInUser.keywords =  req.session.loggedInUser.keywords.join(', ')
          res.redirect('/employeeProfile')
        })
    })
    .catch((err)=>{
        console.log('err', err)
    })
})





////-----------------------------EMPLOYEE JOB PROPOSAL-------------------------------//
///-------GET------///
router.get('/employeeProfile/jobPropositions', (req, res, next) => {
  offerModel.find({employeeId:req.session.loggedInUser._id})
  .populate('companyId')
    .then((offerData) => {
      let result = JSON.parse(JSON.stringify(offerData)).map((myObj) => {
        myObj.hasAdress = !!myObj.companyId.adress
        myObj.hasEmployees = !!myObj.companyId.NumbOfEmployees
        myObj.isNotPending = myObj.status !== 'PENDING'
        myObj.isAccepted = myObj.status == 'ACCEPTED'
        myObj.isRejected = myObj.status == 'REJECTED'
        return myObj
      })
       res.render('users/jobPropositions', {offerData: result});
    })
})






///-----ACEPT BUTTON-----///
router.post('/employeeProfile/jobPropositions/:id/accepted', (req, res, next) => {
    offerModel.findByIdAndUpdate(req.params.id, {$set: {status:'ACCEPTED'}})
      .then(() => {
        res.redirect('/employeeProfile/jobPropositions')
      })
})


  // ///-----REJECT BUTTON-----///
  router.post('/employeeProfile/jobPropositions/:id/rejected', (req, res, next) => {
    offerModel.findByIdAndUpdate(req.params.id, {$set: {status:'REJECTED'}})
      .then(() => {
        res.redirect('/employeeProfile/jobPropositions')
      })
})

  module.exports = router;
