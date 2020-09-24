const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');

const articleRoutes = require("./routes/articles");

//config 
const { PORT, DB_URL } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

//setup mongodb connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conneted to database!");
})

//routes
app.use(articleRoutes);

//serve the website
app.use(express.static(path.join(__dirname, '../dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist'))
})

console.log(`Server running on Port ${PORT || 3000}`);
app.listen(PORT || 3000)