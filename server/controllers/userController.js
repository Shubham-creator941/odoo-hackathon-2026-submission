import { registerUserService } from "../services/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUserController = (req, res) => {
    const { email, password, status, role,  } = req.body;
    
    registerUserService(name, email, password, (error, result) => {
        if (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    });
}