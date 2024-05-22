import express from 'express';
import { login, logout, refresh_token, test_token } from '../controllers/index.js'
import { verifyToken, refresh } from '../middleware/index.js'

const router = express.Router();

router.post('/login', login);
router.get('/logout', verifyToken, logout);
router.get("/refresh", verifyToken, refresh_token);

//
router.get("/test-token", test_token);

export default router;
