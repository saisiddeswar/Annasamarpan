const express = require('express')
const router= express.Router()
const ngocontollers=require('../controllers/ngo-controller')
   
router.get('/food-avaiblity',ngocontollers.Foodlistings)
router.post('/booking', ngocontollers.Bookings)
module.exports= router;