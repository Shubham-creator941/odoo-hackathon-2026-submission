import jwt  from "jsonwebtoken";
import { registerUserService, loginUserService } from "../services/userService.js";

export const registerUserController = async (req, res) => {
    const { employee_code, email, password, role } = req.body;

    if (!employee_code || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    

    try {
        const user = await registerUserService({ employee_code, email, password, role });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "User registered successfully",
            user,
            token,
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
        return res.status(400).json({ error: "email and password are required" });
    }

    try {
        const user = await loginUserService({ email, password });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            user,
            token,
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