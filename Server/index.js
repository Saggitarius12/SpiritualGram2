import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
//import {COOPMiddleware} from 'express-coop';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js'; 
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Cross-Origin-Opener-Policy','same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
})
app.use('/posts',postRoutes);
app.use('/user', userRoutes);

// const CONNECTION_URL = 'mongodb+srv://social_media_12:socialmedia12@cluster-1.rm1s2dp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`))).catch((error)=>console.log(error.message));






