import express from 'express';
import bodyParser from 'body-parser'

const app =  express();

const Port= 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {res.send("hello we are here ");}
)

app.listen(Port, () => console.log(`server running on port: http://localhost:${Port}`));