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

/**SEGUNDO EJERCICIO con SQL. Para ejecutarlo se elimina des de conecton hasta la impresión de result*/

conection.query(
  "SELECT Founded, MIN(Number_of_employees) AS MinEmployees, MAX(Number_of_employees) AS MaxEmployees, AVG(Number_of_employees) AS AvgEmployees FROM provider WHERE Founded BETWEEN 1985 AND 1995 GROUP BY Founded; ",
  (err, rows) => {
    if (err) throw err;
    console.table("Los datos de la tabla son estos");
    console.table(rows);

    /**Lo intente realizar con programación funcional pero no me quiso dar dejo el desarrollo */

    /* Query a la base de datos*/
    /**
conection.query(
  "SELECT  Number_of_employees, founded FROM provider ",
  (err, rows) => {
    if (err) throw err;
    console.table("Los datos de la tabla son estos");
    let filterCompanies = rows.filter(
      (e) => e.founded >= 1985 && e.founded <= 1995
    );

    let groupByYears = filterCompanies.reduce((acumulador, company) => {
      const foundedYear = company.founded;
      if (!acumulador[foundedYear]) {
        acumulador[foundedYear] = [];
      }

      acumulador[foundedYear].push(company.Number_of_employees);
      return acumulador;
    });

    const result = Object.keys(groupByYears).map((year) => {
      const employeeNumbers = groupByYears[year];
      const minEmployees = Math.min(...employeeNumbers);
      const maxEmployees = Math.max(...employeeNumbers);
      const avgEmployees =
        employeeNumbers.reduce((sum, value) => sum + value, 0) /
        employeeNumbers.length;

      return {
        founded_year: parseInt(year, 10),
        min_employees: minEmployees,
        max_employees: maxEmployees,
        avg_employees: avgEmployees,
      };
    });
    console.table(result);*/
  }
);

conection.end();
