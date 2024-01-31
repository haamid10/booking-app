const express = require('express');
const router= express.Router();
const placesController = require('../controllers/placeController');


router.post('/places' , placesController.AddPlaces);

module.exports= router;