const  express= require('express');
const cors= require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const imageDownloader= require('image-downloader')
const app = express();
const jwt = require('jsonwebtoken');
const userRoutes= require('./Routes/userRoutes');
const multer = require('multer')
const fs = require('fs')
const mongoose = require('mongoose');
// const placeRoutes= require('./Routes/PlacesRoutes')
const Places = require('./MODELS/places')
const Booking = require('./MODELS/Booking')

// const path= require('path')
require('./connection');
require('./MODELS/user')

// const uploadsDirectory = path.join(__dirname +'/uploads');
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'\\uploads'));
// console.log({__dirname,'\\uploads'})

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use('/', userRoutes)
// app.use('/', placeRoutes)

function getUserData(req){
    return new Promise((resolve, reject) => {
        // const {token} = req.cookies;
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if(err) reject(err);
            resolve(userData);
        })
    })  
}
// console.log({__dirname})
app.post('/upload-by-link' , async (req,res) => {
    const {link} = req.body;
    const newName= 'photo'+ Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '\\uploads/'+ newName,
    });
    res.json(newName);
})
const photosMIddleware = multer({dest: 'uploads'})
app.post('/upload',photosMIddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
   for (let i =0;i < req.files.length; i++){
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length-1];
    const newPath = path + '.' + ext ;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace("uploads",""));
    
   }
    console.log(uploadedFiles)
    res.json(uploadedFiles)
    
})

app.post('/places', (req, res) => {
    const{token} = req.cookies;
    const{ 
            title , address,  description,
            addedPhotos, perks, extraInfo, checkIn,
            checkOut, maxGuests,price
        } = req.body;
    jwt.verify(token ,  process.env.JWT_SECRET, {}, async (err, userData) => {
    if(err) throw err;
    const placeDoc=await Places.create({
            Owner:userData._id,
            title,address,description,photos:addedPhotos,perks,extraInfo,checkIn,checkOut,maxGuests,price
        });
        res.json(placeDoc);
        // console.log(placeDoc.Owner);
    });
    }
    )
app.get('/user-places', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if(err) throw err;
        const {id} = userData;
        const places = await Places.find({owner: id});
        res.json(places);
        
    })
   
})

app.get('/places/:id', async(req, res) => {
    const {id} =req.params;
    const getPlaces = await Places.findById(id);
    res.json(getPlaces)
})
app.put('/places',async (req, res) => {
    const{token} = req.cookies;
    const{ 
            id,price ,title , address,  description,
            addedPhotos, perks, extraInfo, checkIn,
            checkOut, maxGuests 
        } = req.body;
    jwt.verify(token ,  process.env.JWT_SECRET, {}, async (err, userData) => {
    if(err) throw err;
    const placeDoc = await Places.findById(id);
    
    if (userData._id === placeDoc.Owner?.toString()) {
     
                placeDoc.set({
                  title,address,photos:addedPhotos,description,
                  perks,extraInfo,checkIn,checkOut,maxGuests,price,
                });
                await placeDoc.save();
                res.status(200).json('ok');
            }
            });
   
})

app.get('/places', async (req, res) => {
    res.json(await Places.find())
})

app.post('/booking', async (req, res)=> {
    const userData = await getUserData(req);
    const { place, checkIn, checkOut, numberofGuests,name , phone, price}= req.body;
    Booking.create({
        place, checkIn, checkOut, numberofGuests,name , phone,price,
        user: userData.id
    }).then((doc)=> { 
        res.json(doc);
    }).catch((err) => {
        throw(err);})
    });

 

app.get('/bookings', async (req, res) => {
   const userData = await  getUserData(req);
   res.json(await Booking.find({user: userData.id}))

})

   

    


app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
