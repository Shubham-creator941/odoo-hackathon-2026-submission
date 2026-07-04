import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db.js";

const SALT_ROUNDS = 10;

export const registerUserService = async ({ employee_code, email, password, role }) => {
    const [existing] = await pool.query(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    if (existing.length > 0) {
        const err = new Error("Email already registered");
        err.code = "EMAIL_EXISTS";
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = uuidv4().replace(/-/g, "").slice(0, 30); // fits VARCHAR(30)

    await pool.query(
        `INSERT INTO users
            (id, employee_code, email, password_hash, role, is_verified, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [id, employee_code, email, passwordHash, role, false, "active"]
    );

    return { id, employee_code, email, role };
};

export const loginUserService = async ({ email, password }) => {
    const [rows] = await pool.query(
        `SELECT id, employee_code, email, password_hash, role, is_verified, status
         FROM users
         WHERE email = ?
         LIMIT 1`,
        [email]
    );

    if (rows.length === 0) {
        const err = new Error("Invalid email or password");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        const err = new Error("Invalid email or password");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    // if (!user.is_verified) {
    //     const err = new Error("Account not verified");
    //     err.code = "NOT_VERIFIED";
    //     throw err;
    // }

    if (user.status !== "active") {
        const err = new Error("Account is not active");
        err.code = "ACCOUNT_INACTIVE";
        throw err;
    }

    return {
        id: user.id,
        employee_code: user.employee_code,
        email: user.email,
        role: user.role,
    };
};