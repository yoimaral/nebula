const mysql = require("mysql");

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nebula",
});

conection.connect((err) => {
  if (err) throw err;
});

console.log("La conecxion funciona");

let consultation = conection.query(
  "SELECT Index1,Name,Country FROM provider ORDER BY Index1 DESC",
  (err, rows) => {
    if (err) throw err;
    console.log("Los datos de la tabla son estos");
    console.log(rows);
  }
);

conection.end();
