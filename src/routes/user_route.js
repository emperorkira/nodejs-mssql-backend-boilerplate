import express from 'express';
import { current_user, user_controller_test, get_all, get, create, update, change_pass } from '../controllers/index.js'
import { verifyToken, refresh } from '../middleware/index.js'

const router = express.Router();

router.get("/user-test", verifyToken, user_controller_test);
router.get("/profile", verifyToken, current_user);
router.get("/list", verifyToken, get_all);
router.get("/details/:Id", verifyToken, get);
router.post("/create", verifyToken, create);
router.put("/update", verifyToken, update);
router.put("/change-password/:Id", verifyToken, change_pass);

export default router;
