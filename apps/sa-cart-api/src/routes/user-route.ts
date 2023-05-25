import express from "express";

import { auth } from "../middlewares/auth";
import { UserController } from "../controllers/user-controller";

export const userRouter = express.Router();
userRouter.post("/signup",UserController.signUp);
userRouter.post("/login", UserController.login);
userRouter.delete("/logout",auth, UserController.logout);
userRouter.get("/profile",auth, UserController.profile);
