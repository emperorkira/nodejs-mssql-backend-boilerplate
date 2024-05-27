import express from 'express';
import auth from './auth_route.js';
import user from './setup/user_route.js';import accessright from './setup/accessright_route.js';import client from './setup/client_route.js';import department from './setup/department_route.js';import notification from './setup/notification_route.js';
import permission from './setup/permission_route.js';
import product from './setup/product_route.js';

const router = express.Router();

router.use('/', auth);
router.use('/user', user);
router.use('/access-right', accessright);
router.use('/client', client);
router.use('/department', department);
router.use('/notification', notification);
router.use('/permission', permission);
router.use('/product', product);

// Export the router
export default router;
