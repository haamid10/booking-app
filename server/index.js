const  express= require('express');
const cors= require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const imageDownloader= require('image-downloader')

const app = express();
const jwt = require('jsonwebtoken');
const userRoutes= require('./Routes/userRoutes');
// const placeRoutes= require('./Routes/PlacesRoutes')
require('./connection');
require('./MODELS/user')
require('./MODELS/places')

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRoutes)
// app.use('/', placeRoutes)

app.get('/profile' , (req,res)=> {
    // const {token} = req.cookies;
    // res.json({token})

    const {token} = req.cookies;
   
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData)=> {
            if (err) throw err;
            res.json(userData);
        })
    }
    else {
        res.json( null)
}
})

// console.log({__dirname})
app.post('/upload-by-link' , async (req,res) => {
    const {link} = req.body;
    const newName= 'photo'+ Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '\\uploads\\',
    });
    res.json(newName);
})






app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
