// require('../config/database.config')
const mongoose = require('mongoose')

const employeeModel = require('../models/employee.Model')


// employeeModel.insertMany([
//     {nameEmployee: 'Alvaro', secondnameEmployee: 'Sanchez', age:'28', adressEmployee:'Potes, Cantabria, Spain', emailEmployee:'alvaro.sanchez.lamadrid@gmail.com',biography:'',keywords:''}, 
//     {nameEmployee: 'Gunner', secondnameEmployee: 'Andersen', age:'28', adressEmployee:'A Coruña, Galicia, Spain.', emailEmployee:'gunner.andersen.gil@gmail.com',biography:'',keywords:''}, 
 
// ])
//     .then(() => {
//         mongoose.connection.close()
//             .then(() => {
//                 console.log('Heyy connection is closed!')
//             })
//     })
