import jwt from "jsonwebtoken";
// Imported loginUserService which was missing from your imports
import { registerUserService, loginUserService, verifyUserService } from "../services/userService.js";

// Helper function to generate a secure, random 6-digit code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUserController = async (req, res) => {
    const { employee_code, email, password, role } = req.body;

    if (!employee_code || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Prevent manual registration of the system admin email from .env
    if (email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()) {
        return res.status(409).json({ error: "This email is reserved for system administration." });
    }

    // Generate the 6-digit verification code
    const verificationCode = generateVerificationCode();

    try {
        // Pass the verificationCode to your service layer so it can be saved to MySQL
        const user = await registerUserService({ 
            employee_code, 
            email, 
            password, 
            role, 
            verify_code: verificationCode 
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "User registered successfully. Please verify your account.",
            user: {
                id: user.id,
                employee_code: user.employee_code,
                email: user.email,
                role: user.role,
                is_verified: user.is_verified, 
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at,
                verify_code: verificationCode // Keeping it inside response object as requested
            },
            token
        });
    } catch (error) {
        if (error.code === "EMAIL_EXISTS") {
            return res.status(409).json({ error: "Email already registered" });
        }
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        let user;

        // 1. Intercept for the fallback .env hardcoded System Admin
        if (email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()) {
            if (password !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            
            // Mock object mirroring the MySQL Schema properties for the system admin
            user = {
                id: "ADMIN_SYSTEM",
                employee_code: "ADMIN-001",
                email: process.env.ADMIN_EMAIL,
                role: "admin",
                is_verified: true,
                status: "active",
                created_at: new Date(),
                updated_at: new Date()
            };
        } else {
            // 2. Fall back to normal database authentication if it's not the .env admin
            user = await loginUserService({ email, password });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                employee_code: user.employee_code,
                email: user.email,
                role: user.role,
                is_verified: user.is_verified,
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at
            },
            token
        });

    } catch (error) {
        switch (error.code) {
            case "INVALID_CREDENTIALS":
                return res.status(401).json({ error: "Invalid email or password" });
            case "NOT_VERIFIED":
                return res.status(403).json({ error: "Please verify your account before logging in" });
            case "ACCOUNT_INACTIVE":
                return res.status(403).json({ error: "Your account is inactive. Contact support." });
            default:
                console.error("Error logging in user:", error);
                return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export const verifyCodeController = async (req, res) => {
    const { email, verify_code } = req.body;

    if (!email || !verify_code) {
        return res.status(400).json({ error: "Email and verification code are required" });
    }

    try {
        await verifyUserService({ email, verify_code });

        return res.status(200).json({
            message: "Account verified successfully! You can now log in."
        });

    } catch (error) {
        switch (error.code) {
            case "USER_NOT_FOUND":
                return res.status(404).json({ error: "No user found with this email" });
            case "ALREADY_VERIFIED":
                return res.status(400).json({ error: "This account is already verified" });
            case "INVALID_CODE":
                return res.status(400).json({ error: "Invalid verification code" });
            default:
                console.error("Error verifying user code:", error);
                return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};