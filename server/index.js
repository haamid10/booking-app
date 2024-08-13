const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userRoutes= require('./Routes/userRoutes');
const app = express();

// Models
const Places = require('./MODELS/places');
const Booking = require('./MODELS/Booking');
require('./connection');
require('./MODELS/user');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Utility function to get user data from JWT
function getUserData(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies.token; 
        if (!token) {
            return reject(new Error('No token provided'));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
            if (err) {
                return reject(err); 
            }
            resolve(userData); 
        });
    });
}

app.use('/', userRoutes)


// Routes
app.post('/upload-by-link', async (req, res) => {
    try {
        const { link } = req.body;
        const newName = 'photo' + Date.now() + '.jpg';
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, 'uploads', newName),
        });
        res.json(newName);
    } catch (err) {
        res.status(500).json({ error: 'Failed to download image' });
    }
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const ext = path.extname(originalname);
            const newPath = path + ext;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads', ''));
        }
        res.json(uploadedFiles);
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

app.post('/places', async (req, res) => {
    try {
        const { token } = req.cookies;
        const {
            title, address, description, addedPhotos, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const userData = await getUserData(req);
        const placeDoc = await Places.create({
            Owner: userData._id,
            title, address, description, photos: addedPhotos, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create place' });
    }
});

app.get('/user-places', async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const userData = await getUserData(req);
        const places = await Places.find({ Owner: userData._id });
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve places' });
    }
});

app.get('/places/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Places.findById(id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(place);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve place' });
    }
});

app.put('/places', async (req, res) => {
    try {
        const { token } = req.cookies;
        const {
            id, price, title, address, description, addedPhotos,
            perks, extraInfo, checkIn, checkOut, maxGuests
        } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const userData = await getUserData(req);
        const placeDoc = await Places.findById(id);

        if (!placeDoc) {
            return res.status(404).json({ error: 'Place not found' });
        }

        if (userData._id.toString() === placeDoc.Owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description, perks,
                extraInfo, checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
            res.status(200).json('ok');
        } else {
            res.status(403).json({ error: 'Not authorized to update this place' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update place' });
    }
});

app.get('/places', async (req, res) => {
    try {
        const places = await Places.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve places' });
    }
});

app.post('/booking', async (req, res) => {
    try {
        const userData = await getUserData(req);
        const { place, checkIn, checkOut, numberofGuests, name, phone, price } = req.body;
        const booking = await Booking.create({
            place, checkIn, checkOut, numberofGuests, name, phone, price,
            user: userData._id,
        });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

app.post('/booking', async (req, res)=> {
    const userData = await getUserData(req);
    const { place, checkIn, checkOut, numberofGuests,name , phone, price}= req.body;
    Booking.create({
        place, checkIn, checkOut, numberofGuests,name , phone,price,
        user: userData.id,
    }).then((doc)=> { 
        res.json(doc);
    }).catch((err) => {
        throw(err);})
    });

app.get('/bookings', async (req, res) => {
    try {
        const userData = await getUserData(req);
        const bookings = await Booking.find({ user: userData._id }).populate('place');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});

app.listen(5000, () => console.log('Server running on port: http://localhost:5000'));
