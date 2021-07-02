const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const { urlencoded } = require('express')
const port = process.env.PORT || 5000
const DB_URL = process.env.DB_URL
const app = express()
 
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(express.json())

async function start() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true})
        app.listen(3000, () => console.log("Сервер запущен"))
        
    } catch(e) {
        console.log(e.message);
    }
}

start()
