import express from 'express';
import { current_user, get_all_user, get_user, create_user, update_user, change_pass, remove_user, trash_user } from '../../controllers/index.js'
import { verifyToken } from '../../middleware/index.js'

const router = express.Router();

router.get("/", verifyToken, get_all_user);
router.get("/details/:Id", verifyToken, get_user);
router.get("/profile", verifyToken, current_user);
router.post("/create", verifyToken, create_user);
router.patch("/update/:Id", verifyToken, update_user);
router.patch("/change-password/:Id", verifyToken, change_pass);
router.delete("/remove/:Id", verifyToken, remove_user);
router.patch("/trash/:Id", verifyToken, trash_user);

export default router;
