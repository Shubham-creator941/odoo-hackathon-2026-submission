import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db.js";

const SALT_ROUNDS = 10;

export const registerUserService = async ({ verify_code, employee_code, email, password, role }) => {
    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) {
        const err = new Error("Email already registered");
        err.code = "EMAIL_EXISTS";
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            employeeCode: employee_code,
            email,
            passwordHash,
            role,
            isVerified: false,
            verifyCode: verify_code,
            status: "inactive",
        }
    });

    return { 
        id: user.id, 
        employee_code: user.employeeCode, 
        email: user.email, 
        role: user.role, 
        is_verified: user.isVerified, 
        status: user.status,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    };
};

export const loginUserService = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        const err = new Error("Invalid email or password");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        const err = new Error("Invalid email or password");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    if (!user.isVerified) {
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
        employee_code: user.employeeCode,
        email: user.email,
        role: user.role,
        is_verified: user.isVerified,
        status: user.status,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    };
};

export const verifyUserService = async ({ email, verify_code }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        const error = new Error("User not found");
        error.code = "USER_NOT_FOUND";
        throw error;
    }

    if (user.isVerified) {
        const error = new Error("Already verified");
        error.code = "ALREADY_VERIFIED";
        throw error;
    }

    if (user.verifyCode !== verify_code?.toString()) {
        const error = new Error("Invalid code");
        error.code = "INVALID_CODE";
        throw error;
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            isVerified: true,
            status: "active",
            verifyCode: null,
        }
    });

    return true;
};