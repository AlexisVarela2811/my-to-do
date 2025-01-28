import express from "express";
import { UserController } from "../controller/userController.js";

const router = express.Router();
const userController = new UserController();
// Route for user registration
router.post("/register", userController.register);

// Route for user login
router.post("/login", userController.login);

export default router;
