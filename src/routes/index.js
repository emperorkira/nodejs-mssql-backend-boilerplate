import express from 'express';
import auth from './auth_route.js';
import user from './setup/user_route.js';
import accessright from './setup/accessright_route.js';
import client from './setup/client_route.js';

const router = express.Router();

router.use('/', auth);
router.use('/user', user);
router.use('/access-right', accessright);
router.use('/client', client);


// Export the router
export default router;
