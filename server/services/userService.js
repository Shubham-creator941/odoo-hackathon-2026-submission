import connection from "../config/mysql.js";

export const registerUserService = (name, email, password, callback) => {
    pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (error, result) => {
            if (error) {
                console.error("SQL Error Details:", error);
                return callback(error);
            } else return callback(null, result);
        },
    );
}