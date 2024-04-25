const mongoose = require('mongoose');
const { checkout } = require('../Routes/userRoutes');

const bookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId, ref:'Place'},
    uaername:{type:mongoose.Schema.Types.ObjectId},
    checkIn:{type:Date, required:true},
    checkOut:{type:Date, required:true},
    name:{type:String, required:true},  
    phone:{type:String, required:true},
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;