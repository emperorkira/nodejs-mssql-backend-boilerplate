import express from 'express';
import auth from './auth_route.js';
import user from './setup/user_route.js';
import accessright from './setup/accessright_route.js';
import client from './setup/client_route.js';
import department from './setup/department_route.js';

const router = express.Router();

router.use('/', auth);
router.use('/user', user);
router.use('/access-right', accessright);
router.use('/client', client);
router.use('/department', department);


// Export the router
export default router;
