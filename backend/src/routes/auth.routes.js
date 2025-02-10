import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Register a new user endpoint /auth/register
authRouter.post("/register", register);

// Login a user endpoint /auth/login
authRouter.post("/login", login);

export default authRouter;
