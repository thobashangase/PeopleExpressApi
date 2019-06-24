//Initiallising node modules
var express = require("express");
var app = express();

// Body Parser Middleware
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,HEAD,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to the People CRUD API using NodeJS and Express."
    });
});

//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("API running on port", port);
});

const peopleController = require("./peopleController");

app.use("/api/people", peopleController);