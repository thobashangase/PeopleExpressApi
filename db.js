const sql = require("mssql");

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

module.exports = {
    sql,
    pool
};