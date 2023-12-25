const  express= require('express');
const cors= require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const app = express();
// const image = require('./')
const jwt = require('jsonwebtoken');
const userRoutes= require('./Routes/userRoutes');
// const placeRoutes= require('./Routes/PlacesRoutes')
const imageDownloader= require('image-downloader')
const user = require('./MODELS/user')
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


app.post('/upload-by-link' , async (req,res) => {
    const {link} = req.body;
    const newName= Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname +'./uploads/',
    });
    res.json(__dirname + './uploads/'+newName);
})





// app.post('/register',async (req,res) => {
//     const {name,password,email} =req.body;
//    const userDoc= await User.create({
//         name,
//         email,
//         password:bcrypt.hashSync(password,sec),

//     })
//     res.json(userDoc)
//     res.json("working")
// });

app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
