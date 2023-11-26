const cors= require('cors');
const  express= require('express');

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    // origin: 'http://127.0.0.1:5173'
}));



// app.get('/test', (req, res) => {
//     res.json("hello we are here");
// });
app.post('/register', (req,res) => {
    const {name,password,email} =req.body;
    res.json({name,password,email})
    res.json("working")
});

app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
