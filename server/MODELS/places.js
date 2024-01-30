const mongoose= require('mongoose');

const placesSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkout:Number,
    maxGuests: Number,
})

const PlaceModel = mongoose.model('place', placesSchema);

if (mongoose.connection.models['Places']) {
    delete mongoose.connection.models['Places'];
  }
  

module.exports = PlaceModel;