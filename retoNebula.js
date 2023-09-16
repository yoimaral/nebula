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

console.log("La conexion funciona");

let consultation = conection.query(
  "SELECT Country, COUNT(*) AS provider_count FROM provider GROUP BY Country ORDER BY provider_count DESC",
  (err, rows) => {
    if (err) throw err;
    console.table("Los datos de la tabla son estos");
    console.table(rows);

    let filtro = rows.filter((e) => e.provider_count > 8400);
    console.table(filtro);
  }
);

conection.end();
