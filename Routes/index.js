import express from "express";
import {getUser, login, logout, refreshToken, register} from "../Controllers/UserController.js";
import {verifyToken} from "../Middleware/VerifyToken.js";
import {createCapsule, getAllCapsules, getUserCapsules} from "../Controllers/CapsuleController.js";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const router = express.Router();

// User Routes
router.get('/user', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.delete('/logout', logout);

// Capsule Routes
router.get('/capsules/my-capsules', verifyToken, getUserCapsules);
router.get('/capsules/get-all-capsules', verifyToken, getAllCapsules);
router.post('/capsules/create', upload.single('file'), verifyToken, createCapsule);

export default router;