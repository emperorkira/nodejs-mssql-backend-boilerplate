import express from 'express';
import auth from './auth_route.js';
import user from './user_route.js';
import accessright from './accessright_route.js';

const router = express.Router();

router.use('/', auth);
router.use('/user', user);
router.use('/access-right', accessright);

// Export the router
export default router;
