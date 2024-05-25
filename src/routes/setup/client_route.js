import express from 'express';
import { get_all_client, get_client, create_client, update_client, remove_client, remove_multiple_client, trash_client, trash_multiple_client } from '../../controllers/index.js'
import { verifyToken } from '../../middleware/index.js'

const router = express.Router();

router.get("/", verifyToken, get_all_client);
router.get("/details/:Id", verifyToken, get_client);
router.post("/create", verifyToken, create_client);
router.patch("/update/:Id", verifyToken, update_client);
router.delete("/remove/:Id", verifyToken, remove_client);
router.delete("/remove-multiple/", verifyToken, remove_multiple_client);
router.patch("/trash/:Id", verifyToken, trash_client);
router.patch("/trash-multiple", verifyToken, trash_multiple_client);

export default router;
