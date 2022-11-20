import express from "express";
import {getUser, login, logout, refreshToken, register} from "../Controllers/UserController.js";
import {verifyToken} from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.delete('/logout', logout);

export default router;