import express from "express";
import { getUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Get user email
userRouter.get("/user", getUser);

export default userRouter;
