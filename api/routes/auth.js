import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();


// calling different functions based on the request given to us :

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;