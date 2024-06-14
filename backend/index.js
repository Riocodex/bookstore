import express from "express"
import { PORT, mongoDBURL } from './config.js'
import mongoose from "mongoose";


const app = express();

//creating a http route
app.get('/',(request, response)=>{
    console.log('request')
    return response.status(234).send('welcome to mern stack tutorial')
});

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("app connected to database")
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`)
        })
        
    })
    .catch((error)=>{
        console.log(error)
    })