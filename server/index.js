const  express= require('express');
const cors= require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const app = express();
const jwt = require('jsonwebtoken');
const userRoutes= require('./Routes/userRoutes')

require('./connection');
require('./MODELS/user')

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRoutes)

app.get('/profile' ,(req,res)=> {
    // const {token} = req.cookies;
    // res.json({token})

    const {token} = req.cookies;
   
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user)=> {
            if (err) throw err;
            res.json(user)
        })
    }
 else {
    res.json( null)
}
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
