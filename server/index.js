const  express= require('express');
const bcrypt= require('bcrypt')
const cors= require('cors');
const User = require('./MODELS/user');
require('dotenv').config();

const app = express();
require('./connection');

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());



const sec=bcrypt.genSaltSync(10);


app.post('/register',async (req,res) => {
    const {name,password,email} =req.body;
   const userDoc= await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,sec),

    })
    res.json(userDoc)
    res.json("working")
});

app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
