import express from "express";
import {getUser, login, refreshToken, register} from "../Controllers/UserController.js";
import {verifyToken} from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get('/user', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);

export default router;