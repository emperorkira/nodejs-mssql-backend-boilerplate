    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */

    import express from 'express';
    import { login, logout, refresh_token } from '../controllers/index.js'
    import { verifyToken } from '../middleware/index.js'

    const router = express.Router();

    router.post('/login', login);
    router.get('/logout', verifyToken, logout);
    router.get("/refresh", verifyToken, refresh_token);

    export default router;
