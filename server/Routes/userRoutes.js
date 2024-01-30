const express = require('express');
const router= express.Router();
const userControler= require('../controllers/UserControler');

router.post('/register', userControler.register)
router
.post('/login', userControler.login)
.post('/logout', userControler.logOut)
.get('/profile',userControler.profile)

module.exports= router;