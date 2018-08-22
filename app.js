const express = require("express");
const oracledb = require("oracledb");
const serviceConfig = require("./config/db_config");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("welcome to the API!");
});

app.listen(port, function() {
  console.log("Gulp is running my app on  PORT: " + port);
});

//Connect to DB and run query
oracledb.getConnection(
  {
    user: serviceConfig.user,
    password: serviceConfig.password,
    connectString: serviceConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      //simple test query to check connection
      `SELECT *
         FROM tinwsys`,
      function(err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(result.rows);
      }
    );
  }
);
