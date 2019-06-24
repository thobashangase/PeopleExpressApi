var express = require("express");
const camelcaseKeys = require('camelcase-keys');
const router = express.Router();

const {
    sql,
    pool
} = require("./db");

//GET API
router.get("", function (req, res) {
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
router.get("/:id", function (req, res) {
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
        res.status(200).end(JSON.stringify(camelcaseKeys(recordset.recordset[0])));
    });
    sql.close();
});

//POST API
router.post("", function (req, res) {
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
router.put("/:id", function (req, res) {
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
router.delete("/:id", function (req, res) {
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

module.exports = router;