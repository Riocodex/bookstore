import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json());


//Middleware for handling CORS policy
//option1: allow all origins with default of cors(*)
app.use(cors())//cors:cross origin resource sharing stops us from accessing resources from othher domain, this here stops that.

//option2: all custom origins
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)

// Creating an HTTP route
app.get('/', (request, response) => {
    console.log('request');
    return response.status(234).send('welcome to mern stack tutorial');
});

app.use('/books',booksRoute)//any request with prefix of books should be handled by booksroute

mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection error:', error);
    });
