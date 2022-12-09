import express from "express";
import { register, login, logout, ForgotPassword, admin } from "../controllers/auth.js";

const router = express.Router();


// calling different functions based on the request given to us :

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/Forgotpass", ForgotPassword);
router.post("/admin", admin);

export default router;