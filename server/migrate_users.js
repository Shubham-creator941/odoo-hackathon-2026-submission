import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("Connected to MySQL database.");

    // Drop old table if exists
    await connection.query("DROP TABLE IF EXISTS users");
    console.log("Dropped existing 'users' table.");

    // Create table with requested schema
    const createTableQuery = `
      CREATE TABLE users (
        id VARCHAR(30) PRIMARY KEY,
        employee_code VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'employee', 'user', 'manager') NOT NULL,
        is_verified BOOLEAN NOT NULL DEFAULT FALSE,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);
    console.log("Created 'users' table matching requested schema successfully.");

    await connection.end();
  } catch (err) {
    console.error("Migration failed:", err.message);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

migrate();
