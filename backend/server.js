import express from 'express';
import parser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from './routes/api/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(parser.urlencoded({
    extended: false
}));
app.use(cors({
    origin: 'https://csis3380-final-project.vercel.app/'
}));
app.use(express.json());
app.use('/api', apiRoutes);

const port = process.env.PORT || 4000;

//use your own mongodb atlas username and password to replace user and pw below 
const uri = "mongodb://127.0.0.1:27017/usersDB7";
//const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection;

connection.once("open", () => {
    console.log('Mongodb connection established successfully')
})

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.listen(port, () => {
    console.log("starting server")
}); 