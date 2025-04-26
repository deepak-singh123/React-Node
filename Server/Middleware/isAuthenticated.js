import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { user } from "../Models/User.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://bondifyy.netlify.app"],
    credentials: true,
}));

export const isauthenticated = async (req, res, next) => {
    try {
        if(req.cookies!==undefined){
            console.log("Authentication passed");
        }
        else{
            console.log("Authentication failed.");
        }
        const { authToken } = req.cookies;
        if (!authToken) {
            return res.status(401).json({ message: "Authentication failed. No token provided." });
        }

        const decoded =  jwt.verify(authToken, process.env.SECRET_KEY);

         req.user = await user.findOne(decoded.email);

        next();
    } catch (error) {
        console.error("Error in isauthenticated middleware:", error.message);
        return res.status(401).json({ message: "Authentication failed. Invalid or expired token." });
    }
};
