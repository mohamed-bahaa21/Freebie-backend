const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(
    cors(),
    express.json(),
    express.static(path.join(__dirname, 'public')),
)


mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection Started");
})

const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

app.listen(port, () => console.log(`Port: ${port}`));
