require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE)
const db = mongoose.connection
db.on('error', (error) => { console.error(error)})
db.once('open', () => { console.log('Connected to database')})

app.use(express.json())

const apartmentsRouter = require('./routes/apartments')
app.use('/apartments', apartmentsRouter)

app.listen(process.env.PORT, () => { console.log(`Listening to port ${process.env.PORT}`)})

