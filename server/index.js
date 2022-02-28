import express from 'express';
import cors from 'cors';
const app=express();
import mongoose from 'mongoose';
import router from './routes.js';

//Database connection
mongoose.connect(
    "mongodb://localhost:27017/Task-Overflow?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {useNewUrlParser:true}
);
app.use(express.json());

app.use('/api',router);
 
app.listen(3001,()=>{
    console.log("You are connected")
});