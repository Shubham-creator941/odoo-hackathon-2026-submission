import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db.js";

const SALT_ROUNDS = 10;

export const registerUserService = async ({ verify_code, employee_code, email, password, role }) => {
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

    // Aligned 10 query placeholders with 10 values in the array below
    await pool.query(
        `INSERT INTO users
            (id, employee_code, email, password_hash, role, is_verified, verify_code, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [id, employee_code, email, passwordHash, role, false, verify_code, "inactive"]
    );

    return { 
        id, 
        employee_code, 
        email, 
        role, 
        is_verified: false, 
        status: "inactive",
        created_at: new Date(),
        updated_at: new Date()
    };
};

export const loginUserService = async ({ email, password }) => {
    const [rows] = await pool.query(
        `SELECT id, employee_code, email, password_hash, role, is_verified, status, created_at, updated_at
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

    // Block non-verified or deactivated profiles
    if (!user.is_verified) {
        const err = new Error("Please verify your account before logging in");
        err.code = "NOT_VERIFIED";
        throw err;
    }

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
        is_verified: user.is_verified,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
};

export const verifyUserService = async ({ email, verify_code }) => {
    // 1. Fetch the user's current verification details
    const [users] = await pool.execute(
        "SELECT id, is_verified, verify_code FROM users WHERE email = ?", 
        [email]
    );

    if (users.length === 0) {
        const error = new Error("User not found");
        error.code = "USER_NOT_FOUND";
        throw error;
    }

    const user = users[0];

    // 2. Check if already verified
    if (user.is_verified) {
        const error = new Error("Already verified");
        error.code = "ALREADY_VERIFIED";
        throw error;
    }

    // 3. Compare codes safely string-to-string
    if (user.verify_code !== verify_code?.toString()) {
        const error = new Error("Invalid code");
        error.code = "INVALID_CODE";
        throw error;
    }

    // 4. Corrected variable reference from "db.execute" to "pool.execute"
    await pool.execute(
        "UPDATE users SET is_verified = true, status = 'active', verify_code = NULL, updated_at = NOW() WHERE id = ?",
        [user.id]
    );

    return true;
};