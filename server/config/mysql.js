const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log("Connection failed:", err.message);
    return;
  }

  console.log("Connected!");

connection.end();
});

export default connection;