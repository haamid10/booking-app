import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));



app.get('/test', (req, res) => {
    res.json("hello we are here");
});
app.post('/register', (req,res) => {
    const {name,email,password} =req.body;
    res.json({name,email,password},"added")
});

app.listen(5000, () => console.log(`server running on port: http://localhost:5000`));
