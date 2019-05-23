//Initiallising node modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const camelcaseKeys = require('camelcase-keys');

// Body Parser Middleware
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
    res.json({ "message": "Welcome to the People API using Express. Take notes quickly. Organize and keep track of all your notes." });
});

//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("API running on port", port);
});


//All code after this point has been moved to seperate files and functionality is exported here instead. Also see other commented areas.
const sql = require("mssql");

//Initiallising connection string
var dbConfig = {
    user: "sa",
    password: "123456",
    server: "localhost",
    database: "ThobaDb"
};

const pool = new sql.ConnectionPool(dbConfig);
pool.connect().then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("There was an error connecting to the database: ", err);
    process.exit();
});

//GET API
app.get("/api/people", function (req, res) {
    let request = new sql.Request(pool);
    let query = "SELECT * FROM [People]";

    request.query(query, function (err, recordset) {
        if (err) {
            console.log(err);
        }
        res.status(200).end(JSON.stringify(camelcaseKeys(recordset.recordset)));
    });
    sql.close();
});

//GET/id API
app.get("/api/people/:id", function (req, res) {
    let id = req.params.id;
    let request = new sql.Request(pool);
    request.input("Id", sql.UniqueIdentifier, id);
    let query = "SELECT * FROM [People] WHERE Id=@Id";

    request.query(query, function (err, recordset) {
        if (err) {
            res.status(500).end();
            console.log(err);
        }
        if (parseInt(recordset.rowsAffected) == 0) {
            res.status(404).end("No matching person found");
        }
        res.status(200).end(JSON.stringify(camelcaseKeys(recordset.recordset)));
    });
    sql.close();
});

//POST API
app.post("/api/people", function (req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;

    let request = new sql.Request(pool);
    request.input("Name", sql.NVarChar, name);
    request.input("Phone", sql.NVarChar, phone);
    request.input("Email", sql.NVarChar, email);

    var query = "INSERT INTO [People] (Name, Phone, Email) VALUES (@Name, @Phone, @Email)";
    request.query(query, function (err, recordset) {
        if (err) {
            res.status(500).end(JSON.stringify(err));
            console.log(err);
        }
        res.status(200).end(JSON.stringify("Person added successfully"));
    });
    sql.close();
});

// //PUT API
app.put("/api/people/:id", function (req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;

    let request = new sql.Request(pool);
    request.input("Id", sql.UniqueIdentifier, id);
    request.input("Name", sql.NVarChar, name);
    request.input("Phone", sql.NVarChar, phone);
    request.input("Email", sql.NVarChar, email);

    var query = "UPDATE [People] SET Name=@Name, Phone=@Phone, Email=@Email WHERE Id=@Id";
    request.query(query, function (err, recordset) {
        if (err) {
            res.status(500).end(JSON.stringify(err));
            console.log(err);
        }
        if (parseInt(recordset.rowsAffected) == 0) {
            res.status(404).end("No matching person found");
        }
        res.status(200).end(JSON.stringify("Person updated successfully"));
    });
    sql.close();
});

// // DELETE API
app.delete("/api/people/:id", function (req, res) {
    let id = req.params.id;

    let request = new sql.Request(pool);
    request.input("Id", sql.UniqueIdentifier, id);
    var query = "DELETE FROM [People] WHERE Id=@Id";

    request.query(query, function (err, recordset) {
        if (err) {
            res.status(500).end();
            console.log(err);
        }
        if (parseInt(recordset.rowsAffected) == 0) {
            res.status(404).end("No matching person found");
        }
        res.status(200).end(JSON.stringify("Person removed successfully"));
    });
    sql.close();
});