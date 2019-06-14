const express = require('express');
const mongoose = require('mongoose')
const prices = require('./routes/api/prices.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = 5000;

// app.use(bodyParser.json())
// app.use(cors())

app.get('/', (req,res) => res.send('Welcome'))

//database
const mongoURI = 'mongodb+srv://robert:birdpoo1@cluster0-8qxoo.mongodb.net/test?retryWrites=true&w=majority'

mongoose
    .connect(mongoURI, {useNewUrlParser : true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

//routes
app.use('/api/prices', prices)

app.listen(port, () => console.log(`Listening on port ${port}`))