const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb://localhost:27017/Academind')
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


app.use('/api/posts', postsRoutes);


module.exports = app;