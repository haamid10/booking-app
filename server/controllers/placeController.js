
const Places = require('../MODELS/places');
// const mongoose = require('mongoose');   
// const hotels = require('../MODELS/hot')
const jwt = require('jsonwebtoken');




 exports.AddPlaces =  (req, res) => {
    const{token} = req.cookies;
    const{ 
            title , address,  description,
            photos, perks, extraInfo, checkIn,
            checkOut, maxGuests 
        } = req.body;
    jwt.verify(token ,  process.env.JWT_SECRET, {}, async (err, userData) => {
    if(err) throw err;
    const placeDoc=await Places.create({
            owner:userData.id,
            title,address,description,photos,perks,extraInfo,checkIn,checkOut,maxGuests
        });
        res.json(placeDoc);
    });
    }