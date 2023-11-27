const  express= require('express');

const app = express();
const cors= require('cors');
const dotenv= require('dotenv')


dotenv.config({path:"./.env"});
require('./connection')






app.use(cors({ 
    credentials: true,
    // origin: 'http://127.0.0.1:5173'
}));
app.use(express.json());




// app.get('/test', (req, res) => {
//     res.json("hello we are here");
// });
app.post('/register', (req,res) => {
    const {name,password,email} =req.body;
    res.json({name,password,email})
    res.json("working")
});

app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
