// Set up MySQL connection.
var mysql = require("mysql");

var connection;

if (process.env.JAWDB_URL) {
  console.log("jaws: ", process.env);
  connection = mysql.createConnection(process.env.JAWDB_URL);
} else {
  console.log("LOCAL: ");
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123Stella!",
    database: "burgers_db",
  });
}

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.log("ERROR: ", err);
    //console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
