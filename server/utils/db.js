const mongoose = require('mongoose')
require("dotenv").config()
mongoose.connect(process.env.DB)

const database = mongoose.connection
database.on('error', (error)=>{
    console.log(error)
})
database.once('connected', ()=>{
    console.log('DB Connected!')
})