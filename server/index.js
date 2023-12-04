const  express= require('express');
const cors= require('cors');
require('dotenv').config();

const app = express();
const userRoutes= require('./Routes/userRoutes')

require('./connection');
require('./MODELS/user')

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/', userRoutes)

// app.get('/profile' ,(req,res)=> {
//     res.json('user info')
// })





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
