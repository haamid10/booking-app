const express = require('express');
const router= express.Router();
const registeControler= require('../controllers/registeControler');

router.post('/register', registeControler.register)

module.exports= router;