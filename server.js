require('dotenv').config();

const express = require('express');

const authRoutes = require('./routes/user');

const MongoClient = require('mongodb').MongoClient

const mongoose = require('mongoose');


// express app
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors({
    origin: 'https://data-site-frontend.vercel.app'
    // origin: 'http://localhost:5173'
  }));
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/data', authRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db and listening on port', process.env.PORT);
        });
    })
    .catch((error) =>{
        console.log(error)
    })
    