const express = require("express");
const Routes = require('./src/routes.js');
const cors=require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
require('dotenv').config({path: './config.txt'}) ;

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cors({
    origin:"http://localhost:3000",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials:true
}))

app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

app.use(cookieParser());
// app.use(cors());
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("asc app!");
});

app.use('/', Routes);

app.listen(port, () => console.log(`app listening on port ${port}`));