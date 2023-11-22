import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));

const Port = 5000;

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.json("hello we are here");
});

app.listen(Port, () => console.log(`server running on port: http://localhost:${Port}`));
