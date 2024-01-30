const express = require('express');
const router= express.Router();
const placesController = require('../controllers/placeController');


router
.post('/upload-by-link', placesController.uploadByLink)
.post('/upload' , placesController.Upload);

module.exports= router;