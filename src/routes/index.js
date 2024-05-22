import express from 'express';
import auth from './auth_route.js';

const router = express.Router();
router.use('/', auth);

// Export the router
export default router;
